import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const rows = await prisma.franchise.findMany({
    include: { members: { include: { user: true } }, applications: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const data = await req.json()
  const row = await prisma.franchise.create({ data })
  return NextResponse.json(row)
}
