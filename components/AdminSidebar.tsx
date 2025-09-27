"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"
import { LayoutDashboard, PenSquare, GraduationCap, Building2 } from "lucide-react"

const items = [
  { href:"/admin", label:"ภาพรวม", icon: LayoutDashboard },
  { href:"/admin/blog/new", label:"เขียนบทความ", icon: PenSquare },
  { href:"/admin/courses/new", label:"ลงคอร์สเรียน", icon: GraduationCap },
  { href:"/admin/franchise", label:"จัดการ Franchise", icon: Building2 },
]

export default function AdminSidebar(){
  const pathname = usePathname()
  return (
    <aside className="space-y-2">
      {items.map(({href,label,icon:Icon})=>(
        <Link key={href} href={href}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all",
            "hover:shadow-sm hover:-translate-y-[1px]",
            pathname===href
              ? "bg-[--brand-navy]/10 border-[--brand-navy]/30 text-[--brand-navy] font-medium"
              : "bg-white border-slate-200"
          )}>
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </aside>
  )
}
