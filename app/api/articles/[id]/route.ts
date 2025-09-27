import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type Ctx = { params: { id: string } }

export async function GET(_req: Request, { params }: Ctx) {
  const row = await prisma.article.findUnique({ where: { id: Number(params.id) } })
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(row)
}

export async function PUT(req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const data = await req.json()
  const row = await prisma.article.update({ where: { id: Number(params.id) }, data })
  return NextResponse.json(row)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  await prisma.article.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ ok: true })
}
