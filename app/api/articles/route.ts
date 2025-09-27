import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { id: true, slug: true, title: true, summary: true, coverImage: true, publishedAt: true },
  })
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { title, slug, summary, content, coverImage, status } = await req.json()
  const row = await prisma.article.create({
    data: {
      title,
      slug,
      summary,
      content,
      coverImage,
      status: status ?? "DRAFT",
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      authorId: Number((session.user as any).id),
    },
  })
  return NextResponse.json(row)
}
