// app/(student)/me/enrollments/[id]/page.tsx
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

function formatTHB(n: number) {
  return n.toLocaleString("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 })
}
function formatDT(d: Date | string) {
  const dt = new Date(d)
  return dt.toLocaleString("th-TH", {
    year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
  })
}

export default async function EnrollmentDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const me = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true },
  })
  if (!me) redirect("/login")

  const idNum = Number(params.id)
  if (!idNum) return notFound()

  const enr = await prisma.enrollment.findFirst({
    where: { id: idNum, userId: me.id },
    include: {
      course: { select: { title: true, slug: true, price: true } },
      order: {
        include: {
          payments: { orderBy: { createdAt: "desc" } },
          enrollments: { include: { course: true } },
        },
      },
    },
  })
  if (!enr) return notFound()

  return (
    <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">รายละเอียดการลงทะเบียน</h1>
        <Link href="/me/enrollments" className="text-sm text-[--brand-navy] hover:underline">ย้อนกลับ</Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-slate-500">คอร์ส</div>
            <Link href={`/courses/${enr.course.slug}`} className="font-semibold hover:underline">
              {enr.course.title}
            </Link>
          </div>
          <div className="text-sm">
            <div className="text-slate-500">สถานะลงทะเบียน</div>
            <div className="font-medium">{enr.status}</div>
          </div>
          <div className="text-sm">
            <div className="text-slate-500">วันที่ลงทะเบียน</div>
            <div className="font-medium">{formatDT(enr.createdAt)}</div>
          </div>
          <div className="text-sm">
            <div className="text-slate-500">ราคา</div>
            <div className="font-medium">{formatTHB(enr.course.price ?? 0)}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3 font-semibold">คำสั่งซื้อ</div>
        {enr.order ? (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><div className="text-slate-500">รหัส</div><div className="font-medium">#{enr.order.code}</div></div>
              <div><div className="text-slate-500">ยอดชำระ</div><div className="font-medium">{formatTHB(enr.order.amount)} <span className="text-slate-500">({enr.order.currency})</span></div></div>
              <div><div className="text-slate-500">สถานะ</div><div className="font-medium">{enr.order.status}</div></div>
              <div><div className="text-slate-500">อัปเดต</div><div className="font-medium">{formatDT(enr.order.updatedAt)}</div></div>
            </div>

            <div className="rounded-xl border border-slate-200">
              <div className="px-4 py-2 text-sm font-medium bg-slate-50 rounded-t-xl">คอร์สในคำสั่งซื้อนี้</div>
              <ul className="divide-y">
                {enr.order.enrollments.map(en => (
                  <li key={en.id} className="px-4 py-3 text-sm">
                    <div className="font-medium">{en.course?.title}</div>
                    <div className="text-slate-500">สถานะ: {en.status}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200">
              <div className="px-4 py-2 text-sm font-medium bg-slate-50 rounded-t-xl">การชำระเงิน</div>
              <ul className="divide-y">
                {enr.order.payments.length ? enr.order.payments.map(p => (
                  <li key={p.id} className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>จำนวน: <span className="font-medium">{formatTHB(p.amount)}</span></div>
                      <div>วิธี: <span className="font-medium">{p.method}</span></div>
                      <div>สถานะ: <span className="font-medium">{p.status}</span></div>
                      <div className="text-slate-500">{formatDT(p.createdAt)}</div>
                    </div>
                  </li>
                )) : (
                  <li className="px-4 py-3 text-sm text-slate-500">— ยังไม่มีรายการชำระเงิน —</li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-5 text-sm text-slate-600">ไม่มีคำสั่งซื้อที่เชื่อมกับการลงทะเบียนนี้</div>
        )}
      </section>
    </div>
  )
}
