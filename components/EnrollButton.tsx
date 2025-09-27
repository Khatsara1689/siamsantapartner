"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EnrollButton({
  courseId,
  enrolled,
}: {
  courseId: number
  enrolled: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (enrolled) {
    return (
      <button
        className="px-4 py-2 rounded-xl bg-green-600 text-white cursor-default"
        disabled
      >
        ลงทะเบียนแล้ว
      </button>
    )
  }

  const enroll = async () => {
    setLoading(true)
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    })
    setLoading(false)
    if (res.ok) router.refresh()
  }

  return (
    <button
      onClick={enroll}
      disabled={loading}
      className="px-4 py-2 rounded-xl bg-[--brand-orange] text-white hover:opacity-90 disabled:opacity-60"
    >
      {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียนเรียน"}
    </button>
  )
}
