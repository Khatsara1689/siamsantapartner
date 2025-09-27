"use client"

import { useState } from "react"

export type LessonLite = {
  id: number
  title: string
  order: number
  content?: string | null
  videoUrl?: string | null
  freePreview: boolean
}

export default function CoursePlayer({
  lessons,
  canViewAll,
  onMarkDone
}: {
  lessons: LessonLite[]
  canViewAll: boolean
  onMarkDone: (lessonId: number) => Promise<void>
}) {
  const firstPlayable = lessons.find(l => canViewAll || l.freePreview) || lessons[0]
  const [current, setCurrent] = useState<LessonLite>(firstPlayable)

  const locked = (l: LessonLite) => !canViewAll && !l.freePreview

  return (
    <div className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-8 space-y-3">
        <div className="aspect-video rounded-2xl border bg-black/5 overflow-hidden">
          {current?.videoUrl ? (
            <iframe
              src={current.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="h-full grid place-items-center text-slate-500 text-sm">
              ไม่มีวิดีโอสำหรับบทเรียนนี้
            </div>
          )}
        </div>

        {current?.content && (
          <div className="card rounded-2xl p-4 prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: current.content }} />
          </div>
        )}

        {!locked(current) && (
          <button
            className="px-4 py-2 rounded-xl bg-[--brand-orange] text-white hover:opacity-90"
            onClick={() => onMarkDone(current.id)}
          >
            ทำเครื่องหมายเรียนแล้ว
          </button>
        )}
      </div>

      <aside className="md:col-span-4 space-y-3">
        <h3 className="font-semibold">บทเรียนทั้งหมด</h3>
        <ul className="space-y-2">
          {lessons.map((l) => {
            const isLocked = locked(l)
            const isActive = current?.id === l.id
            return (
              <li key={l.id}>
                <button
                  disabled={isLocked}
                  onClick={() => setCurrent(l)}
                  className={[
                    "w-full text-left px-3 py-2 rounded-xl border transition-all",
                    isActive ? "bg-[--brand-navy]/10 border-[--brand-navy]/30" : "bg-white",
                    isLocked ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-[1px]"
                  ].join(" ")}
                >
                  {l.title} {isLocked && "🔒"}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}
