"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";

type UpdateProfileInput = {
  name: string;
  phone?: string | null;
  /** ส่งเฉพาะ URL ของรูป (มาจาก /api/upload หรือ URL ภายนอก) */
  avatarUrl?: string | null;
  /** ต่อไปนี้อัปเดตได้เฉพาะ ADMIN */
  memberId?: string | null;
  cardIssuedAt?: string | null;   // "YYYY-MM-DD"
  cardExpiredAt?: string | null;  // "YYYY-MM-DD"
};

export async function updateProfileAction(input: UpdateProfileInput) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    const id = Number(user?.id);
    const role = String(user?.role || "");
    if (!id) return { ok: false, message: "กรุณาเข้าสู่ระบบอีกครั้ง" };

    // 🧹 sanitize / validate
    const name = String(input.name ?? "").trim();
    if (!name) return { ok: false, message: "กรุณากรอกชื่อที่แสดง" };
    if (name.length > 100) return { ok: false, message: "ชื่อยาวเกินไป" };

    const phone =
      typeof input.phone === "undefined"
        ? undefined
        : (input.phone ? String(input.phone).trim() : null);

    const avatarUrl =
      typeof input.avatarUrl === "undefined"
        ? undefined
        : (input.avatarUrl ? String(input.avatarUrl).trim() : null);

    // ❌ กันการส่ง data URL (base64) เข้ามาโดยตรง
    if (avatarUrl && avatarUrl.startsWith("data:")) {
      return {
        ok: false,
        message:
          "ห้ามอัปโหลดรูปผ่านแบบฟอร์มโดยตรง กรุณาใช้ปุ่มอัปโหลดเพื่อรับลิงก์รูปภาพ",
      };
    }

    const isAdmin = role === "ADMIN";

    const data: any = {
      name,
      phone,         // undefined = ไม่แตะ, string|null = อัปเดต
      avatarUrl,     // undefined = ไม่แตะ, string|null = อัปเดต
    };

    if (isAdmin) {
      if (typeof input.memberId !== "undefined") {
        data.memberId = input.memberId ? String(input.memberId).trim() : null;
      }
      if (typeof input.cardIssuedAt !== "undefined") {
        data.cardIssuedAt = input.cardIssuedAt
          ? new Date(input.cardIssuedAt)
          : null;
      }
      if (typeof input.cardExpiredAt !== "undefined") {
        data.cardExpiredAt = input.cardExpiredAt
          ? new Date(input.cardExpiredAt)
          : null;
      }
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
    const id = Number((session?.user as any)?.id);
    if (!id) return { ok: false, message: "กรุณาเข้าสู่ระบบอีกครั้ง" };

    const pwd = String(input.newPassword || "");
    if (pwd.length < 8) return { ok: false, message: "รหัสผ่านอย่างน้อย 8 ตัวอักษร" };

    const hashed = await hash(pwd, 10);
    await prisma.password.upsert({
      where: { userId: id },
      update: { hash: hashed },
      create: { userId: id, hash: hashed },
    });
    return { ok: true };
  } catch (e: any) {
    console.error("updatePasswordAction", e);
    return { ok: false, message: e?.message || "เกิดข้อผิดพลาด" };
  }
}
