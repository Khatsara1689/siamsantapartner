"use client"
import useSWR from "swr"

type Franchise = {
  id: number
  code: string
  name: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED"
  members?: { id: number }[]
}

const fetcher = async (url: string): Promise<Franchise[]> => {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed")
  return res.json()
}

const Badge = ({ status }: { status: Franchise["status"] }) => {
  const map = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    REJECTED: "bg-rose-100 text-rose-800 border-rose-200",
    SUSPENDED: "bg-slate-200 text-slate-700 border-slate-300",
  } as const
  return <span className={`px-2 py-0.5 text-xs rounded-full border ${map[status]}`}>{status}</span>
}

export default function FranchiseAdmin() {
  const { data, isLoading, error } = useSWR<Franchise[]>("/api/franchise", fetcher)
  if (isLoading) return <div className="animate-pulse h-32 rounded-xl bg-slate-100" />
  if (error) return <div className="text-red-600">โหลดข้อมูลไม่สำเร็จ</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Franchise ทั้งหมด</h1>
        <a href="#" className="px-3 py-2 rounded-xl bg-[--brand-navy] text-white hover:opacity-90">+ เพิ่มแฟรนไชส์</a>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="p-3 text-left">รหัส</th>
              <th className="p-3 text-left">ชื่อ</th>
              <th className="p-3 text-left">สถานะ</th>
              <th className="p-3 text-left">สมาชิก</th>
            </tr>
          </thead>
          <tbody className="[&>tr:hover]:bg-slate-50">
            {(data ?? []).map(fr => (
              <tr key={fr.id} className="border-t">
                <td className="p-3 font-mono">{fr.code}</td>
                <td className="p-3">{fr.name}</td>
                <td className="p-3"><Badge status={fr.status}/></td>
                <td className="p-3">{fr.members?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
