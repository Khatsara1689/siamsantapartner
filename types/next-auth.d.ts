import NextAuth, { DefaultSession } from "next-auth"

// เพิ่ม role ใน Session & JWT
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: "ADMIN" | "STUDENT"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "STUDENT"
  }
}
