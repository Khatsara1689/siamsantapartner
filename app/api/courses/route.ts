import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const rows = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, thumbnail: true, price: true },
  })
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const data = await req.json()
  // data: { slug, title, subtitle?, description?, thumbnail?, isPublished?, sections?: [{ title, order?, lessons?: [{title, order?, videoUrl?, content?, freePreview?}] }] }
  const row = await prisma.course.create({
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      thumbnail: data.thumbnail,
      isPublished: !!data.isPublished,
      price: data.price ?? 0,
      sections: {
        create: (data.sections || []).map((s: any) => ({
          title: s.title,
          order: s.order ?? 0,
          lessons: {
            create: (s.lessons || []).map((l: any) => ({
              title: l.title,
              order: l.order ?? 0,
              videoUrl: l.videoUrl || null,
              content: l.content || null,
              freePreview: !!l.freePreview,
            })),
          },
        })),
      },
    },
    include: { sections: { include: { lessons: true } } },
  })
  return NextResponse.json(row)
}
