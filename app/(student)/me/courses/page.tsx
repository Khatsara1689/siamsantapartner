// app/(student)/me/courses/page.tsx
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { EnrollmentStatus } from "@prisma/client"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MyCoursesPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const me = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true },
  })
  if (!me) redirect("/login")

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: me.id, status: EnrollmentStatus.ACTIVE },
    include: {
      course: {
        select: {
          id: true, slug: true, title: true, subtitle: true, thumbnail: true,
          sections: { select: { lessons: { select: { id: true } } } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const items = await Promise.all(
    enrollments.map(async (e) => {
      const lessonIds = e.course.sections.flatMap(s => s.lessons.map(l => l.id))
      const total = lessonIds.length
      const done = total ? await prisma.progress.count({
        where: { userId: me.id, lessonId: { in: lessonIds }, isDone: true },
      }) : 0
      const percent = total ? Math.round((done / total) * 100) : 0
      return { course: e.course, total, done, percent }
    })
  )

  // ทำเป็น “ชั้น” ละ 5 เล่ม (มือถือจะ auto wrap เอง)
  const rows = chunk(items, 5)

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-[--brand-navy]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[--brand-orange]/10 blur-3xl" />
        <div className="relative p-6 md:p-8">
          <h1 className="text-[26px] md:text-[30px] font-bold text-[--brand-ink]">คอร์สของฉัน</h1>
          <p className="mt-1 text-slate-600">ติดตามความคืบหน้าและกลับมาเรียนต่อได้ทุกเวลา</p>
        </div>
      </section>

      {/* EMPTY */}
      {items.length === 0 ? (
        <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(900px_160px_at_50%_-40px,rgba(25,39,135,.05),transparent)]" />
          <div className="relative px-8 py-16 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-[--brand-navy]/10">🎓</div>
            <h2 className="text-lg font-semibold text-[--brand-ink]">ยังไม่มีคอร์สในหมวดนี้</h2>
            <p className="mt-1 text-slate-600">เริ่มต้นเรียนรู้กับคอร์สคุณภาพที่คัดสรรสำหรับคุณ</p>
            <Link href="/courses" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[--brand-navy] px-4 py-2.5 text-white hover:bg-[--brand-navy-2] transition">
              ไปหน้าคอร์สทั้งหมด
              <svg viewBox="0 0 20 20" className="size-4 fill-current"><path d="M7.5 4.5 13 10l-5.5 5.5-1.06-1.06L10.88 10 6.44 5.56 7.5 4.5Z"/></svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-14">
          {rows.map((row, i) => (
            <div key={i} className="relative">
              {/* แถวหนังสือ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {row.map(({ course, percent, done, total }) => (
                  <BookCard key={course.id} course={course} percent={percent} done={done} total={total} />
                ))}
              </div>
              {/* ชั้นไม้โค้ง (สวยกว่าแถบตรง) */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-3">
                <div className="mx-3 h-5 rounded-b-[18px]"
                     style={{
                       background: "linear-gradient(180deg,#caa56f 0%, #b18c57 60%, #8c6f45 100%)",
                       boxShadow: "0 10px 18px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.35)",
                     }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ===== Components ===== */

function BookCard({
  course, percent, done, total,
}: { course: any; percent: number; done: number; total: number }) {
  const state = percent === 100 ? "จบแล้ว" : percent === 0 ? "ยังไม่เริ่ม" : "กำลังเรียน"
  return (
    <Link href={`/courses/${course.slug}`} className="group relative block transform-gpu [perspective:1200px]">
      <div className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition
                      duration-500 ease-out hover:shadow-xl [transform:rotateX(5deg)_rotateY(-5deg)]">
        {/* ปก 3:4 + สันหนังสือไล่เฉด */}
        <div className="relative aspect-[3/4]">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
          ) : <div className="h-full w-full bg-slate-100" />}
          {/* สันหนังสือ */}
          <div className="absolute inset-y-0 left-0 w-2 rounded-l-[18px] opacity-70"
               style={{ background: "linear-gradient(180deg,#0f1a4a,#132067)" }} />
          {/* เงาเคลือบ */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.38)_50%,transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-700" />
          {/* ริบบิ้น */}
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-[--brand-orange] px-2.5 py-1 text-[11px] font-semibold text-white shadow">
              {state}
              <svg viewBox="0 0 20 20" className="size-3.5 fill-current"><path d="M7.5 4.5 13 10l-5.5 5.5-1.06-1.06L10.88 10 6.44 5.56 7.5 4.5Z"/></svg>
            </span>
          </div>
          {/* Progress capsule */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="rounded-full bg-white/85 p-1 shadow backdrop-blur">
              <div className="h-1.5 rounded-full bg-[--brand-navy]" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>

        {/* เนื้อหา */}
        <div className="space-y-2 p-3.5">
          <h3 className="line-clamp-2 text-[15px] font-semibold text-[--brand-ink]">{course.title}</h3>
          {course.subtitle ? <p className="line-clamp-2 text-xs text-slate-600">{course.subtitle}</p> : null}

          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
            <span>เรียนแล้ว <strong>{done}</strong>/<strong>{total}</strong> บท</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/85 px-2 py-1">
              <span className="size-1.5 rounded-full bg-[--brand-navy]" />
              {percent}%
            </span>
          </div>
        </div>

        {/* เงาหนังสือบนชั้น */}
        <div className="absolute inset-x-6 -bottom-3 h-6 rounded-full bg-black/10 blur-md transition group-hover:bg-black/15" />
      </div>
    </Link>
  )
}

/* ===== Utils ===== */
function chunk<T>(arr: T[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}
