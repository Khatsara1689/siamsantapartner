export default function ProgressBar({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-slate-600">ความคืบหน้า</span>
        <span className="text-sm font-medium">{p}%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-3 bg-[--brand-navy]"
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  )
}
