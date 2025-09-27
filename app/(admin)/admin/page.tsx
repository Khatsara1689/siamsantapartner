import { prisma } from "@/lib/db"
import StatCard from "@/components/StatCard"
import { FileText, GraduationCap, Users, Store } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminHome() {
  const [blogCount, courseCount, studentCount, franchiseCount] = await Promise.all([
    prisma.article.count(),
    prisma.course.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.franchise.count(),
  ])

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">แดชบอร์ดผู้ดูแล</h1>
        <div className="text-sm text-slate-500">ยินดีต้อนรับกลับ 👋</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="บทความทั้งหมด" value={blogCount} icon={<FileText />} />
        <StatCard title="คอร์สทั้งหมด" value={courseCount} icon={<GraduationCap />} accent="orange" />
        <StatCard title="นักเรียนทั้งหมด" value={studentCount} icon={<Users />} />
        <StatCard title="Franchise" value={franchiseCount} icon={<Store />} accent="orange" />
      </div>

      <div className="card rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">กิจกรรมล่าสุด</h2>
        <p className="text-sm text-slate-600">ยังไม่มีข้อมูล ลองสร้างบทความหรือคอร์สแรกของคุณเลย</p>
      </div>
    </>
  )
}
