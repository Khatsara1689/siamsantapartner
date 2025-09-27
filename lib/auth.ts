// lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, // หรือ "jwt" ก็ได้ตามต้องการ
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.image ?? undefined };
      },
    }),
    // เพิ่ม Google/GitHub ฯลฯ ได้ตามต้องการ
  ],
  pages: {
    signIn: "/signin",
  },
  // สำหรับ JWT (ถ้าใช้ strategy:"jwt") สามารถกำหนด callbacks ได้
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
