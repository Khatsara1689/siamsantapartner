import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { lessonId, isDone } = await req.json()
  const row = await prisma.progress.upsert({
    where: { userId_lessonId: { userId: Number((session.user as any).id), lessonId } },
    update: { isDone: !!isDone },
    create: { userId: Number((session.user as any).id), lessonId, isDone: !!isDone },
  })
  return NextResponse.json(row)
}
