// app/(student)/me/enrollments/page.tsx
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { EnrollmentStatus } from "@prisma/client"
import Link from "next/link"

export const dynamic = "force-dynamic"

const PER_PAGE = 10

export default async function EnrollmentsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const me = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true },
  })
  if (!me) redirect("/login")

  // filters
  const q = (searchParams?.q as string)?.trim() ?? ""
  const statusParam = ((searchParams?.status as string) ?? "all").toUpperCase()
  const statusFilter =
    statusParam === "ALL" ? undefined : (statusParam as keyof typeof EnrollmentStatus)

  const page = Math.max(1, parseInt((searchParams?.page as string) ?? "1", 10))
  const skip = (page - 1) * PER_PAGE

  // where clause
  const where: any = {
    userId: me.id,
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(q
      ? {
          OR: [
            { course: { title: { contains: q, mode: "insensitive" } } },
            { course: { slug: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  }

  const [total, rows] = await Promise.all([
    prisma.enrollment.count({ where }),
    prisma.enrollment.findMany({
      where,
      include: {
        course: {
          select: { id: true, title: true, slug: true, thumbnail: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: PER_PAGE,
      skip,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-[--brand-navy]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[--brand-orange]/10 blur-3xl" />
        <div className="relative p-6 md:p-8">
          <h1 className="text-[26px] md:text-[30px] font-bold text-[--brand-ink]">
            การลงทะเบียนและคำสั่งซื้อ
          </h1>
          <p className="mt-1 text-slate-600">
            รายการคอร์สที่คุณลงทะเบียน พร้อมสถานะและรายละเอียดการสั่งซื้อ
          </p>

          {/* Filters */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <StatusTab label="ทั้งหมด" value="all" active={statusParam === "ALL"} />
              <StatusTab label="กำลังใช้งาน" value="ACTIVE" active={statusParam === "ACTIVE"} />
              <StatusTab label="เสร็จสมบูรณ์" value="COMPLETED" active={statusParam === "COMPLETED"} />
              <StatusTab label="ยกเลิก" value="CANCELED" active={statusParam === "CANCELED"} />
            </div>

            <form className="w-full md:w-auto" action="/me/enrollments">
              {/* คงค่า status เดิม */}
              {statusParam ? <input type="hidden" name="status" value={statusParam} /> : null}
              <input
                className="w-full md:w-[280px] rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[--brand-navy]"
                name="q"
                placeholder="ค้นหา: ชื่อคอร์ส / slug"
                defaultValue={q}
              />
            </form>
          </div>
        </div>
      </section>

      {/* List */}
      {rows.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
          <ul className="divide-y divide-slate-200">
            {rows.map((e) => (
              <li key={e.id} className="p-4 md:p-5">
                <div className="flex items-start gap-4">
                  <Link
                    href={`/courses/${e.course.slug}`}
                    className="block shrink-0 overflow-hidden rounded-lg border border-slate-200"
                  >
                    {e.course.thumbnail ? (
                      <img
                        src={e.course.thumbnail}
                        alt=""
                        className="h-16 w-16 object-cover md:h-20 md:w-20"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-slate-100 md:h-20 md:w-20" />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/courses/${e.course.slug}`}
                        className="font-semibold text-[--brand-ink] hover:underline"
                      >
                        {e.course.title}
                      </Link>
                      <StatusBadge status={e.status} />
                    </div>

                    <div className="mt-1 text-sm text-slate-600">
                      <span className="mr-3">รหัส: <span className="font-mono">ENR-{e.id}</span></span>
                      <span className="mr-3">วันที่: {formatDate(e.createdAt)}</span>
                      <span>ราคา: {formatTHB(e.course.price ?? 0)}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/courses/${e.course.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[--brand-navy] px-3 py-1.5 text-xs font-medium text-white hover:bg-[--brand-navy-2] transition"
                      >
                        เข้าเรียน
                        <svg viewBox="0 0 20 20" className="size-4 fill-current">
                          <path d="M7.5 4.5 13 10l-5.5 5.5-1.06-1.06L10.88 10 6.44 5.56 7.5 4.5Z" />
                        </svg>
                      </Link>

                      {/* ปุ่มสำหรับเอกสาร/ใบเสร็จ – ยังไม่มี Order model จึงทำเป็นลิงก์ placeholder */}
                      <Link
                        href={`/me/enrollments/${e.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        รายละเอียด/ใบเสร็จ
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
            <div>
              หน้าที่ {page} จาก {totalPages} — ทั้งหมด {total} รายการ
            </div>
            <div className="flex items-center gap-2">
              <PageBtn page={page - 1} disabled={page <= 1} q={q} status={statusParam} />
              <PageBtn page={page + 1} disabled={page >= totalPages} q={q} status={statusParam} next />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------------- Components ---------------- */

function StatusTab({
  label,
  value,
  active,
}: {
  label: string
  value: string
  active?: boolean
}) {
  const href = `/me/enrollments?status=${value}`
  return (
    <Link
      href={href}
      className={[
        "rounded-full border px-3.5 py-1.5 text-xs font-medium",
        active
          ? "border-[--brand-navy]/30 bg-[--brand-navy]/10 text-[--brand-ink]"
          : "border-slate-300 text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </Link>
  )
}

function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const map: Record<EnrollmentStatus, { text: string; cls: string }> = {
    ACTIVE: { text: "กำลังใช้งาน", cls: "bg-blue-50 text-blue-700 border-blue-200" },
    COMPLETED: { text: "เสร็จสมบูรณ์", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    CANCELED: { text: "ยกเลิก", cls: "bg-rose-50 text-rose-700 border-rose-200" },
  }
  const m = map[status]
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        m.cls,
      ].join(" ")}
      title={status}
    >
      <i className="inline-block size-1.5 rounded-full bg-current opacity-70" />
      {m.text}
    </span>
  )
}

function PageBtn({
  page,
  disabled,
  q,
  status,
  next = false,
}: {
  page: number
  disabled?: boolean
  q: string
  status: string
  next?: boolean
}) {
  const href = `/me/enrollments?page=${page}&status=${status}${q ? `&q=${encodeURIComponent(q)}` : ""}`
  return disabled ? (
    <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-slate-400">
      {next ? "ถัดไป" : "ย้อนกลับ"}
    </span>
  ) : (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
    >
      {next ? "ถัดไป" : "ย้อนกลับ"}
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
      <div className="absolute inset-0 opacity-[.04] bg-[radial-gradient(900px_160px_at_50%_-40px,#192787,transparent)]" />
      <div className="relative px-8 py-16 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-[--brand-navy]/10">🧾</div>
        <h2 className="text-lg font-semibold text-[--brand-ink]">ยังไม่มีรายการลงทะเบียน</h2>
        <p className="mt-1 text-slate-600">เมื่อคุณสั่งซื้อคอร์ส รายการจะปรากฏที่นี่</p>
        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[--brand-navy] px-4 py-2.5 text-white hover:bg-[--brand-navy-2] transition"
        >
          ไปหน้าคอร์สทั้งหมด
          <svg viewBox="0 0 20 20" className="size-4 fill-current"><path d="M7.5 4.5 13 10l-5.5 5.5-1.06-1.06L10.88 10 6.44 5.56 7.5 4.5Z"/></svg>
        </Link>
      </div>
    </div>
  )
}

/* ---------------- Utils ---------------- */
function formatDate(d: Date) {
  const dt = new Date(d)
  return dt.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatTHB(n: number) {
  return n.toLocaleString("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 })
}
