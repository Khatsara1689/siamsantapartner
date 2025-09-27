"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [err, setErr] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    if (password.length < 8) return setErr("รหัสผ่านอย่างน้อย 8 ตัวอักษร")
    if (password !== confirm) return setErr("รหัสผ่านไม่ตรงกัน")

    startTransition(async () => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        setOk("สมัครสมาชิกสำเร็จ กำลังพาไปเข้าสู่ระบบ…")
        setTimeout(() => router.push("/login"), 800)
      } else {
        const data = await res.json().catch(() => ({} as any))
        setErr(data?.message || "สมัครสมาชิกไม่สำเร็จ")
      }
    })
  }

  return (
    <main className="min-h-[70vh] bg-[var(--brand-navy)]/5 py-10">
      <div className="mx-auto max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">สมัครสมาชิก</h1>
        <p className="text-sm text-gray-500 mb-6">สร้างบัญชีใหม่เพื่อใช้งานระบบสมาชิก</p>

        {err && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>
        )}
        {ok && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{ok}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อที่แสดง</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]"
              placeholder="ชื่อ-นามสกุล"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]"
                placeholder="อย่างน้อย 8 ตัวอักษร"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]"
                placeholder="พิมพ์ซ้ำอีกครั้ง"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[var(--brand-orange)] text-white py-2 font-semibold disabled:opacity-60"
          >
            {pending ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          มีบัญชีอยู่แล้ว? <Link href="/login" className="text-[var(--brand-orange)] font-medium">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </main>
  )
}