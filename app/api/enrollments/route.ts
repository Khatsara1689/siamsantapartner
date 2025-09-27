import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { courseId } = await req.json()
  const row = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: Number((session.user as any).id), courseId } },
    update: { status: "ACTIVE" },
    create: { userId: Number((session.user as any).id), courseId, status: "ACTIVE" },
  })
  return NextResponse.json(row)
}
