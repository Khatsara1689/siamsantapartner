import Link from "next/link"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function CoursesListPage() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, thumbnail: true, price: true, sections: { select: { id: true } } },
  })

  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 bg-[--brand-navy]/5 border border-[--brand-navy]/10">
        <h1 className="text-2xl font-bold">คอร์สเรียนทั้งหมด</h1>
        <p className="text-slate-600 text-sm">เลือกคอร์สแล้วเริ่มเรียนได้เลย</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Link key={c.id} href={`/courses/${c.slug}`} className="rounded-2xl overflow-hidden border bg-white hover:-translate-y-[2px] transition">
            {c.thumbnail ? (
              <img src={c.thumbnail} alt="" className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-slate-100" />
            )}
            <div className="p-4 space-y-1">
              <h3 className="font-semibold line-clamp-2">{c.title}</h3>
              <div className="text-sm text-slate-600">
                {c.price ? `${c.price.toLocaleString()} บาท` : "ฟรี"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
