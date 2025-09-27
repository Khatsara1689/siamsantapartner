import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.email || !creds?.password) return null
        const user = await prisma.user.findUnique({ where: { email: creds.email } })
        if (!user || !user.password) return null
        const ok = await bcrypt.compare(creds.password, user.password)
        if (!ok) return null
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          // @ts-ignore - Prisma enum
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (token?.role) (session.user as any).role = token.role
      // แนบ id ด้วยถ้าต้องใช้
      if ((token as any)?.sub) (session.user as any).id = (token as any).sub
      return session
    },
  },
}

// v4: ไม่มี { handlers, auth } ให้ export
// สร้าง handler ไว้ให้ route.ts ไป export GET/POST
export const nextAuthHandler = NextAuth(authOptions)

// helper ใช้ใน Server Component/Route แทน `auth()` ของ v5
export const auth = () => getServerSession(authOptions)
