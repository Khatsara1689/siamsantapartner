"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/* helper: media query */
function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatch(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return match;
}

/* helper: lock body scroll when drawer open */
function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lock]);
}

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // จอเล็ก/แท็บเล็ตแนวตั้ง
  const isSmallPortrait = useMediaQuery("(max-width: 768px)");

  // ค้างเปิดเมนู ‘ร่วมทำธุรกิจ…’ บนจอเล็ก/แนวตั้ง
  const [openPartner, setOpenPartner] = useState(true);
  useEffect(() => { if (open && isSmallPortrait) setOpenPartner(true); }, [open, isSmallPortrait]);

  // ปิด Drawer เมื่อเปลี่ยนเส้นทาง (คงสถานะ openPartner)
  useEffect(() => { setOpen(false); }, [pathname]);

  useLockBody(open);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="เปิดเมนู"
        className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="size-6 text-white" fill="currentColor">
          <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 h-dvh w-[86vw] max-w-[380px] bg-[var(--brand-white)] z-50 md:hidden shadow-2xl flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="font-bold text-[var(--brand-navy)]">เมนู</div>
                <button aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-black/5">
                  <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
                    <path d="M6.4 4.9 4.9 6.4 10.5 12l-5.6 5.6 1.5 1.5L12 13.5l5.6 5.6 1.5-1.5L13.5 12l5.6-5.6-1.5-1.5L12 10.5 6.4 4.9Z"/>
                  </svg>
                </button>
              </div>

              <nav className="p-2 overflow-y-auto">
                <MobileLink href="/" label="หน้าแรก" />

                {/* หัวข้อหลัก: ร่วมทำธุรกิจ… */}
                <div className="mt-1">
                  {isSmallPortrait ? (
                    /* ค้างเปิดจริง ๆ: แสดงหัวเรื่องนิ่ง ไม่ให้ยุบ */
                    <div className="px-3 pt-2 pb-1 font-semibold text-[var(--brand-navy)]">
                      ร่วมทำธุรกิจท่องเที่ยวกับเรา
                    </div>
                  ) : (
                    /* สำหรับจอใหญ่ในแนวตั้ง (กรณีใช้ Drawer): ให้เป็น accordion */
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-black/5"
                      onClick={() => setOpenPartner(v => !v)}
                      aria-expanded={openPartner}
                    >
                      <span className="font-semibold text-[var(--brand-navy)]">ร่วมทำธุรกิจท่องเที่ยวกับเรา</span>
                      <svg viewBox="0 0 24 24" className={`size-5 transition-transform ${openPartner ? "rotate-180" : ""}`} fill="currentColor">
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </button>
                  )}

                  <AnimatePresence initial={false}>
                    {(openPartner || isSmallPortrait) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="px-2 pb-2 space-y-2"
                      >
                        <MobileItem href="/franchise" title="ธุรกิจแฟรนไชส์ท่องเที่ยว" desc="เริ่มต้นธุรกิจของคุณกับเราได้ทันที" />
                        <MobileItem href="/partner/invest" title="ร่วมลงทุนพาร์ทเนอร์" desc="เติบโตไปพร้อมกับเราในฐานะคู่ค้า" />
                        <MobileItem href="/partner/freelance" title="สมัครพนักงานขายอิสระ" desc="สร้างรายได้ในแบบของคุณเอง" />
                        <div className="rounded-2xl bg-[#f6f7fb] p-4">
                          <div className="font-bold text-[var(--brand-ink)]">คอร์สเรียนแนะนำ</div>
                          <div className="text-sm text-black/60">เรียนรู้กลยุทธ์การตลาดดิจิทัล</div>
                          <div className="mt-3 rounded-lg bg-white/70 h-20" aria-hidden />
                          <Link href="/courses/marketing-starter" className="mt-3 inline-flex items-center justify-center w-full rounded-xl px-4 py-3 font-semibold bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-2)] transition-colors">
                            ดูรายละเอียด
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileLink href="/services" label="สินค้าและบริการ" />
                <MobileLink href="/about" label="เกี่ยวกับเรา" />
                <MobileLink href="/blog" label="บทความ" />

                <div className="h-3" />
                <Link href="/courses" className="block w-full text-center rounded-full bg-[var(--brand-navy)] text-white px-5 py-3 font-semibold">
                  คอร์สเรียนออนไลน์
                </Link>
                <div className="h-2" />
                <Link href="/signin" className="block w-full text-center rounded-full bg-[var(--brand-orange)] text-white px-5 py-3 font-semibold">
                  ระบบสมาชิก
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-3 py-3 rounded-xl hover:bg-black/5 font-semibold text-[var(--brand-navy)]">
      {label}
    </Link>
  );
}

function MobileItem({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block rounded-xl border border-black/5 bg-white p-3">
      <div className="font-semibold text-[var(--brand-ink)]">{title}</div>
      <div className="text-sm text-black/60">{desc}</div>
    </Link>
  );
}
