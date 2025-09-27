"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";

type UpdateProfileInput = {
  name: string;
  phone?: string | null;
  avatar: string | null;             // data URL หรือ URL
  memberId?: string | null;
  cardIssuedAt?: string | null;      // "YYYY-MM-DD"
  cardExpiredAt?: string | null;     // "YYYY-MM-DD"
};

export async function updateProfileAction(input: UpdateProfileInput) {
  try {
    const session = await getServerSession(authOptions);
    const idStr = (session?.user as any)?.id;
    const role = (session?.user as any)?.role;
    if (!idStr) return { ok: false, message: "กรุณาเข้าสู่ระบบอีกครั้ง" };
    const id = Number(idStr);
    const isAdmin = role === "ADMIN";

    let avatarUrl: string | null = null;
    if (input.avatar && input.avatar.startsWith("data:image/")) {
      const [, meta, base64] = input.avatar.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/) || [];
      if (!base64) throw new Error("รูปภาพไม่ถูกต้อง");
      const ext = (meta?.split("/")[1] || "png").toLowerCase().replace("+xml", "");
      const fileName = `avatar-${id}-${Date.now()}.${ext}`;
      const dir = path.join(process.cwd(), "public", "uploads", "avatars");
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, fileName), Buffer.from(base64, "base64"));
      avatarUrl = `/uploads/avatars/${fileName}`;
    } else if (input.avatar) {
      avatarUrl = input.avatar;
    }

    // สร้าง payload อัปเดตตามสิทธิ์
    const data: any = {
      name: input.name,
      ...(typeof input.phone !== "undefined" ? { phone: input.phone } : {}),
      ...(avatarUrl ? { avatarUrl } : {}),
    };

    if (isAdmin) {
      if (typeof input.memberId !== "undefined") data.memberId = input.memberId;
      if (typeof input.cardIssuedAt !== "undefined") data.cardIssuedAt = input.cardIssuedAt ? new Date(input.cardIssuedAt) : null;
      if (typeof input.cardExpiredAt !== "undefined") data.cardExpiredAt = input.cardExpiredAt ? new Date(input.cardExpiredAt) : null;
    }

    await prisma.user.update({ where: { id }, data });
    return { ok: true };
  } catch (e: any) {
    console.error("updateProfileAction", e);
    return { ok: false, message: e?.message || "เกิดข้อผิดพลาด" };
  }
}

export async function updatePasswordAction(input: { newPassword: string }) {
  try {
    const session = await getServerSession(authOptions);
    const idStr = (session?.user as any)?.id;
    if (!idStr) return { ok: false, message: "กรุณาเข้าสู่ระบบอีกครั้ง" };
    const id = Number(idStr);

    await prisma.password.upsert({
      where: { userId: id },
      update: { hash: await hash(input.newPassword, 10) },
      create: { userId: id, hash: await hash(input.newPassword, 10) },
    });
    return { ok: true };
  } catch (e: any) {
    console.error("updatePasswordAction", e);
    return { ok: false, message: e?.message || "เกิดข้อผิดพลาด" };
  }
}
