import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import CoursePlayer, { type LessonLite } from "@/app/_components/CoursePlayer"
import { auth } from "@/lib/auth"
import EnrollButton from "@/components/EnrollButton"
import ProgressBar from "@/components/ProgressBar"

export const dynamic = "force-dynamic"

export default async function CourseLearnPage({ params }: { params: { slug: string } }) {
  const session = await auth()

  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  })
  if (!course || !course.isPublished) return notFound()

  // รวมบทเรียนทั้งหมดของคอร์ส
  const lessons: LessonLite[] = course.sections
    .flatMap((s) => s.lessons)
    .map((l) => ({
      id: l.id,
      title: l.title,
      order: l.order,
      content: l.content,
      videoUrl: l.videoUrl,
      freePreview: l.freePreview,
    }))
    .sort((a, b) => a.order - b.order)

  const userId = session?.user ? Number((session.user as any).id) : null

  // เช็ค enroll + คำนวณความคืบหน้า
  let enrolled = false
  let canViewAll = false
  let percent = 0

  if (userId) {
    const enr = await prisma.enrollment.findFirst({
      where: { userId, courseId: course.id, status: "ACTIVE" },
      select: { id: true },
    })
    enrolled = !!enr
    canViewAll = enrolled || (session!.user as any).role === "ADMIN"

    if (lessons.length > 0) {
      const done = await prisma.progress.count({
        where: { userId, lessonId: { in: lessons.map((l) => l.id) }, isDone: true },
      })
      percent = Math.round((done / lessons.length) * 100)
    }
  } else {
    // ไม่ได้ล็อกอิน → ดูบทฟรีเท่านั้น
    canViewAll = false
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 bg-[--brand-navy]/5 border border-[--brand-navy]/10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            {course.subtitle && <p className="text-slate-600 text-sm">{course.subtitle}</p>}
          </div>

          {/* ปุ่ม Enroll / ล็อกอินก่อน */}
          <div className="flex items-center gap-3">
            {userId ? (
              <EnrollButton courseId={course.id} enrolled={enrolled} />
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-xl bg-[--brand-orange] text-white hover:opacity-90"
              >
                ล็อกอินเพื่อสมัครเรียน
              </a>
            )}
          </div>
        </div>

        {/* Progress bar (เฉพาะผู้ใช้ที่ล็อกอิน) */}
        {userId && lessons.length > 0 && (
          <div className="mt-4">
            <ProgressBar percent={percent} />
          </div>
        )}
      </header>

      <CoursePlayer
        lessons={lessons}
        canViewAll={canViewAll}
        onMarkDone={async (lessonId: number) => {
          "use server"
          if (!userId) return
          await prisma.progress.upsert({
            where: { userId_lessonId: { userId, lessonId } },
            update: { isDone: true },
            create: { userId, lessonId, isDone: true },
          })
        }}
      />
    </div>
  )
}
