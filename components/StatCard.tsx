"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type Props = {
  title: string
  value: number | string
  icon?: ReactNode
  note?: string
  accent?: "navy" | "orange"
}
export default function StatCard({ title, value, icon, note, accent="navy" }: Props){
  const ring = accent === "navy" ? "ring-[--brand-navy]" : "ring-[--brand-orange]"
  return (
    <motion.div
      whileHover={{ y:-4 }}
      transition={{ type:"spring", stiffness:260, damping:20 }}
      className={`card rounded-2xl p-4 ring-1 ${ring}/20`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl grid place-items-center 
          ${accent==="navy" ? "bg-[--brand-navy]/10 text-[--brand-navy]" : "bg-[--brand-orange]/10 text-[--brand-orange]"}`}>
          {icon}
        </div>
        <div className="text-sm text-slate-600">{title}</div>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {note && <div className="mt-1 text-xs text-slate-500">{note}</div>}
    </motion.div>
  )
}
