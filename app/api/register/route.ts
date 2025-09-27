// app/api/register/route.ts
import { prisma } from "@/lib/db"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ message: "อีเมลนี้ถูกใช้แล้ว" }, { status: 409 })
    }

    // ให้ DB สร้าง id (Int autoincrement)
    const user = await prisma.user.create({
      data: { name, email, role: "STUDENT" },
      select: { id: true },
    })

    // บันทึกรหัสผ่าน (hash) ไปที่ตาราง Password (one-to-one)
    await prisma.password.create({
      data: {
        userId: user.id,                 // <-- Int ตรงกับ User.id
        hash: await hash(password, 10),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    // จัดการ error จาก Prisma (เช่น unique constraint)
    if (err?.code === "P2002") {
      return NextResponse.json({ message: "อีเมลนี้ถูกใช้แล้ว" }, { status: 409 })
    }
    console.error("REGISTER_ERROR:", err)
    return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 })
  }
}
