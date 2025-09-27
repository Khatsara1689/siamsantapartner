"use client"
import { useState, useTransition } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const q = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState<string | null>(q.get("error"))
  const [pending, startTransition] = useTransition()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (res?.ok) {
        router.push("/")
        router.refresh()
      } else {
        setErr("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
      }
    })
  }

  return (
    <main className="min-h-[70vh] bg-[var(--brand-navy)]/5 py-10">
      <div className="mx-auto max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">เข้าสู่ระบบ</h1>
        <p className="text-sm text-gray-500 mb-6">ยินดีต้อนรับกลับสู่ SiamSanta Partner</p>

        {err && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[var(--brand-orange)] text-white py-2 font-semibold disabled:opacity-60"
          >
            {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-lg border py-2 font-medium hover:bg-gray-50"
          >
            เข้าสู่ระบบด้วย Google
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          ยังไม่มีบัญชี? <Link href="/register" className="text-[var(--brand-orange)] font-medium">สมัครสมาชิก</Link>
        </p>
      </div>
    </main>
  )
}