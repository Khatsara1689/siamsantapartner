"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MegaMenuPartner from "./MegaMenuPartner";

type NavItem = { href: string; label: string; exact?: boolean; mega?: boolean };

const items: NavItem[] = [
  { href: "/", label: "หน้าแรก", exact: true },
  { href: "/partner", label: "ร่วมทำธุรกิจท่องเที่ยวกับเรา", mega: true },
  { href: "/services", label: "สินค้าและบริการ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blog", label: "บทความ" },
];

export default function Navbar() {
  const pathname = usePathname();

  // --- Mega menu state + hover intent (เดิม) ---
  const [openMegaFor, setOpenMegaFor] = useState<string | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const scheduleOpen = (href: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMegaFor(href), 90);
  };
  const scheduleClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMegaFor(null), 180);
  };
  useEffect(() => { setOpenMegaFor(null); }, [pathname]);

  // --- ✅ Sticky + สวยขึ้นตอนสกรอลล์ ---
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href) && href !== "/";

  const underline = (
    <motion.div
      layoutId="nav-underline"
      className="h-1 rounded-full mt-1"
      style={{ background: "var(--brand-orange)", width: 120, willChange: "transform" }}
      transition={{ type: "spring", stiffness: 280, damping: 36, bounce: 0.12 }}
    />
  );

  return (
    // ✅ ทำให้แถบ Navbar ติดบนสุดเสมอ
    <header className="sticky top-0 z-50">
      {/* ท็อปบาร์เล็ก (ถ้ามี) จะสกรอลล์ไปพร้อมกัน */}
      <div className="navbar-topbar" />

      {/* ✅ พื้นหลัง/เงา เปลี่ยนตาม scrolled เพื่อลดการกลืนกับคอนเทนต์ */}
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
            {/* โลโก้ */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/logodiamsantapartner02 (1).png" alt="SIAMSANTA PARTNER" width={150} height={70} priority />
              
            </Link>

            {/* เมนูเดสก์ท็อป */}
            <nav className="relative hidden md:flex items-center gap-6 lg:gap-8">
              <LayoutGroup id="main-nav">
                {items.map((it) => {
                  const baseActive = isActive(it.href, it.exact);
                  const isPartner = it.mega === true;
                  const highlighted = baseActive || (isPartner && openMegaFor === it.href);

                  return (
                    <div
                      key={it.href}
                      className="relative flex flex-col items-center nav-item group"
                      onMouseEnter={() => (isPartner ? scheduleOpen(it.href) : undefined)}
                      onMouseLeave={() => (isPartner ? scheduleClose() : undefined)}
                      onFocus={() => isPartner && scheduleOpen(it.href)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node))
                          isPartner && scheduleClose();
                      }}
                    >
                      <Link
                        href={it.href}
                        className={[
                          "text-[15px] font-semibold transition-colors duration-200",
                          highlighted
                            ? "text-[var(--brand-orange)]"
                            : "text-white/90 hover:text-[var(--brand-orange)]", // ชี้แล้วส้ม
                        ].join(" ")}
                      >
                        {it.label}
                      </Link>

                      {highlighted && underline}

                      {/* MegaMenu เฉพาะ “ร่วมทำธุรกิจ…” */}
                      {isPartner && (
                        <MegaMenuPartner
                          open={openMegaFor === it.href}
                          onClose={() => setOpenMegaFor(null)}
                          onNavigate={() => setOpenMegaFor(null)} // คลิก submenu → ปิดก่อนเปลี่ยนหน้า
                          anchor="left"
                        />
                      )}
                    </div>
                  );
                })}
              </LayoutGroup>
            </nav>

            {/* ปุ่มขวา (เดสก์ท็อป) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/courses"
                className="rounded-full bg-[var(--brand-white)] text-[var(--brand-navy)] px-4 py-2 font-semibold transition-colors duration-200 hover:bg-white/90"
              >
                คอร์สเรียนออนไลน์
              </Link>
              <Link
                href="/signin"
                className="rounded-full bg-[var(--brand-orange)] px-4 py-2 font-semibold transition-colors duration-200 hover:bg-[var(--brand-orange-2)]"
              >
                ระบบสมาชิก
              </Link>
            </div>

            {/* หมายเหตุ: MobileNav ของคุณยังใช้ได้ตามเดิม (sticky ด้วย) */}
          </div>
        </div>
      </div>
    </header>
  );
}
