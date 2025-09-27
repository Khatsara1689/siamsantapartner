// app/api/checkout/route.ts
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { courseId } = await req.json()

  const me = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } })
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const course = await prisma.course.findUnique({ where: { id: Number(courseId) } })
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 })

  const order = await prisma.order.create({
    data: {
      code: `SSP-${Date.now()}`,
      userId: me.id,
      amount: course.price ?? 0,
      status: "PAID", // ← mock ชำระสำเร็จ
    } as any,
  })

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: me.id, courseId: course.id } },
    update: { status: "ACTIVE" as any },
    create: { userId: me.id, courseId: course.id, status: "ACTIVE" as any },
  })

  return NextResponse.json({ ok: true, orderId: order.id })
}
