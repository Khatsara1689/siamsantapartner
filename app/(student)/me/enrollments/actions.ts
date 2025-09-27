// app/(student)/me/enrollments/actions.ts
"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function cancelOrder(orderId: number) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true },
  })
  if (!user) throw new Error("User not found")

  const order = await prisma.order.findFirst({ where: { id: orderId, userId: user.id } })
  if (!order) throw new Error("Order not found")
  if (order.status !== "PENDING") throw new Error("Cannot cancel this order")

  await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELED" } })
  revalidatePath(`/me/enrollments/${orderId}`) // หรือ /me/enrollments
  return { ok: true }
}
