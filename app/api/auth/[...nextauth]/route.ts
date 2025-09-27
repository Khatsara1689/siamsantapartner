import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },               // ใช้ JWT ให้เข้ากับ User.id = Int
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        try {
          if (!creds?.email || !creds?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: creds.email },
            select: { id: true, email: true, name: true, role: true },
          })
          if (!user) return null

          const pwd = await prisma.password.findUnique({
            where: { userId: user.id },        // Password.userId = PK
            select: { hash: true },
          })
          if (!pwd?.hash) return null

          const ok = await compare(creds.password, pwd.hash)
          if (!ok) return null

          // id ต้องเป็น string สำหรับ NextAuth token
          return { id: String(user.id), email: user.email, name: user.name, role: user.role } as any
        } catch (e) {
          console.error("AUTH_AUTHORIZE_ERR:", e)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as any).id       // string
        ;(token as any).role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.uid
        ;(session.user as any).role = (token as any).role
      }
      return session
    },
  },
  pages: { signIn: "/login" },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
