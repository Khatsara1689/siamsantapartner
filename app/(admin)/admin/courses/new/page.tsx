"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Lesson = { title: string; order?: number; videoUrl?: string; content?: string; freePreview?: boolean }
type Section = { title: string; order?: number; lessons?: Lesson[] }

export default function CourseNewPage() {
  const [form, setForm] = useState<{
    slug: string; title: string; subtitle?: string; description?: string; thumbnail?: string;
    isPublished: boolean; price?: number; sections: Section[];
  }>({
    slug: "", title: "", subtitle: "", description: "", thumbnail: "",
    isPublished: false, price: 0,
    sections: [{ title: "บทที่ 1", order: 1, lessons: [{ title: "บทเรียน 1", order: 1, freePreview: true }] }],
  })
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) router.push("/admin")
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="border p-2 w-full" placeholder="slug" value={form.slug}
        onChange={e => setForm({ ...form, slug: e.target.value })} required />
      <input className="border p-2 w-full" placeholder="ชื่อคอร์ส" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} required />
      <input className="border p-2 w-full" placeholder="thumbnail URL" value={form.thumbnail}
        onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isPublished}
            onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
          เผยแพร่
        </label>
        <input type="number" className="border p-2 w-40" placeholder="ราคา (บาท)" value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
      </div>
      <button className="px-4 py-2 bg-black text-white rounded">บันทึก</button>
    </form>
  )
}
