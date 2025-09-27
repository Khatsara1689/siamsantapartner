import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = Number((session.user as any).id) // เปลี่ยนเป็น Number(...) ถ้าสคีมาเป็น Int
  const { name, avatarUrl } = await req.json()
  const row = await prisma.user.update({ where: { id: userId as any }, data: { name, avatarUrl } })
  return NextResponse.json({ ok: true, user: { id: row.id, name: row.name, avatarUrl: row.avatarUrl } })
}
