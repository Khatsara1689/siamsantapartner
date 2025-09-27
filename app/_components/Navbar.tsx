"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, LayoutGroup } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import MegaMenuPartner from "./MegaMenuPartner"
import { useSession, signOut } from "next-auth/react"

type NavItem = { href: string; label: string; exact?: boolean; mega?: boolean }
type Role = "OWNER" | "ADMIN" | "MEMBER"

const items: NavItem[] = [
  { href: "/", label: "หน้าแรก", exact: true },
  { href: "/partner", label: "ร่วมทำธุรกิจท่องเที่ยวกับเรา", mega: true },
  { href: "/services", label: "สินค้าและบริการ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blog", label: "บทความ" },
]

// ---------- utils: click outside ----------
function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])
  return ref
}

// ---------- small UI helpers ----------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-2 pb-1 text-[11px] uppercase tracking-wide text-white/70 bg-[var(--brand-navy)]/95">
      {children}
    </div>
  )
}
function Divider() {
  return <div className="my-1 h-px bg-white/15" />
}
function MenuLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm hover:bg-white/10 text-white"
      onClick={onClick}
      role="menuitem"
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const loggedIn = !!session?.user
  const role = ((session?.user as any)?.role ?? "MEMBER") as Role

  const [openMegaFor, setOpenMegaFor] = useState<string | null>(null)
  const openTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)
  const partnerBtnRef = useRef<HTMLButtonElement | null>(null)

  // --- member dropdown state ---
  const [openMember, setOpenMember] = useState(false)
  const memberRef = useClickOutside<HTMLDivElement>(openMember, () => setOpenMember(false))

  const scheduleOpen = (href: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    if (openTimer.current) window.clearTimeout(openTimer.current)
    openTimer.current = window.setTimeout(() => setOpenMegaFor(href), 90)
  }
  const scheduleClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMegaFor(null), 180)
  }

  useEffect(() => {
    setOpenMegaFor(null)
    setOpenMember(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpenMegaFor(null), setOpenMember(false))
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : href !== "/" && pathname.startsWith(href)

  const underline = (
    <motion.div
      layoutId="nav-underline"
      className="h-1 rounded-full mt-1"
      style={{ background: "var(--brand-orange)", width: 120, willChange: "transform" }}
      transition={{ type: "spring", stiffness: 280, damping: 36, bounce: 0.12 }}
    />
  )

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "relative transition-all duration-300",
          scrolled
            ? "bg-[var(--brand-navy)]/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-lg"
            : "bg-[var(--brand-navy)]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16 gap-3">
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="ไปหน้าแรก">
              <Image
                src="/logodiamsantapartner02 (1).png"
                alt="SIAMSANTA PARTNER"
                width={150}
                height={70}
                priority
              />
            </Link>

            <nav className="relative hidden md:flex items-center gap-6 lg:gap-8" aria-label="เมนูหลัก">
              <LayoutGroup id="main-nav">
                {items.map((it) => {
                  const baseActive = isActive(it.href, it.exact)
                  const isPartner = it.mega
                  const highlighted = baseActive || (isPartner && openMegaFor === it.href)

                  return (
                    <div
                      key={it.href}
                      className="relative flex flex-col items-center nav-item group"
                      onMouseEnter={() => (isPartner ? scheduleOpen(it.href) : undefined)}
                      onMouseLeave={() => (isPartner ? scheduleClose() : undefined)}
                      onFocus={() => isPartner && scheduleOpen(it.href)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) isPartner && scheduleClose()
                      }}
                    >
                      {isPartner ? (
                        <button
                          ref={partnerBtnRef}
                          type="button"
                          onClick={() => setOpenMegaFor((s) => (s ? null : it.href))}
                          className={[
                            "text-[15px] font-semibold transition-colors duration-200 focus:outline-none",
                            highlighted ? "text-[var(--brand-orange)]" : "text-white/90 hover:text-[var(--brand-orange)]",
                          ].join(" ")}
                          aria-expanded={openMegaFor === it.href}
                          aria-haspopup="true"
                          aria-controls="mega-partner"
                        >
                          {it.label}
                        </button>
                      ) : (
                        <Link
                          href={it.href}
                          className={[
                            "text-[15px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded",
                            highlighted ? "text-[var(--brand-orange)]" : "text-white/90 hover:text-[var(--brand-orange)]",
                          ].join(" ")}
                          aria-current={baseActive ? "page" : undefined}
                        >
                          {it.label}
                        </Link>
                      )}

                      {highlighted && underline}

                      {isPartner && (
                        <div id="mega-partner">
                          <MegaMenuPartner
                            open={openMegaFor === it.href}
                            onClose={() => setOpenMegaFor(null)}
                            onNavigate={() => setOpenMegaFor(null)}
                            anchor="left"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </LayoutGroup>
            </nav>

            {/* ----- Right zone: CTA + ระบบสมาชิก Dropdown ----- */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/courses"
                className="rounded-full bg-white text-[var(--brand-navy)] px-4 py-2 font-semibold transition-colors duration-200 hover:bg-white/90"
              >
                คอร์สเรียนออนไลน์
              </Link>

              {/* ระบบสมาชิก dropdown */}
              <div className="relative" ref={memberRef}>
                <button
                  className="text-sm inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white/25 text-white hover:bg-white/10"
                  onClick={() => setOpenMember((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={openMember}
                >
                  ระบบสมาชิก
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>

                {openMember && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-[var(--brand-navy)]/95 shadow-xl"
                  >
                    {!loggedIn ? (
                      <div className="py-1" onClick={() => setOpenMember(false)}>
                        <SectionTitle>เข้าสู่ระบบ/สมัคร</SectionTitle>
                        <MenuLink href="/login" label="เข้าสู่ระบบ" />
                        <MenuLink href="/register" label="สมัครสมาชิก" />
                        <Divider />
                        
                      </div>
                    ) : (
                      <div className="py-1">
                        <SectionTitle>บัญชีของฉัน</SectionTitle>
                        <MenuLink href="/me/profile" label="โปรไฟล์" onClick={() => setOpenMember(false)} />
                        <MenuLink href="/me/courses" label="คอร์สของฉัน" onClick={() => setOpenMember(false)} />
                        <MenuLink href="/me/enrollments" label="การลงทะเบียน / คำสั่งซื้อ" onClick={() => setOpenMember(false)} />
                        <MenuLink href="/me/progress" label="ความคืบหน้าการเรียน" onClick={() => setOpenMember(false)} />
                        <Divider />
                        <SectionTitle>เครือข่ายธุรกิจ</SectionTitle>
                        <MenuLink href="/partner" label="ศูนย์พาร์ทเนอร์" onClick={() => setOpenMember(false)} />
                        <MenuLink href="/franchise" label="ศูนย์แฟรนไชส์" onClick={() => setOpenMember(false)} />
                        {(role === "ADMIN" || role === "OWNER") && (
                          <>
                            <Divider />
                            <SectionTitle>แอดมิน</SectionTitle>
                            <MenuLink href="/admin" label="แดชบอร์ดแอดมิน" onClick={() => setOpenMember(false)} />
                            <MenuLink href="/admin/blog" label="จัดการบทความ" onClick={() => setOpenMember(false)} />
                            <MenuLink href="/admin/courses" label="จัดการคอร์ส" onClick={() => setOpenMember(false)} />
                            <MenuLink href="/admin/franchise" label="จัดการแฟรนไชส์" onClick={() => setOpenMember(false)} />
                          </>
                        )}
                        <Divider />
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 text-white"
                          onClick={() => {
                            setOpenMember(false)
                            signOut({ callbackUrl: "/" })
                          }}
                        >
                          ออกจากระบบ
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* ----- /Right zone ----- */}
          </div>
        </div>
      </div>
    </header>
  )
}
