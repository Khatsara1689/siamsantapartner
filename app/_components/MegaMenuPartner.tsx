"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate?: () => void; // เรียกก่อนนำทางเพื่อปิดเมกะเมนู
  anchor?: "left" | "center";
};

export default function MegaMenuPartner({
  open,
  onClose,
  onNavigate,
  anchor = "center",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // ปิดเมื่อกด ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ปิดเมื่อคลิคนอก
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  // จัดตำแหน่งยึดซ้ายหรือกลาง
  const positionClass = anchor === "left" ? "left-0" : "left-1/2 -translate-x-1/2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="menu"
          aria-label="ร่วมทำธุรกิจท่องเที่ยวกับเรา"
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.995 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${positionClass} top-full mt-3 w-[880px] max-w-[min(92vw,880px)] z-50 hidden md:block`}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-3xl bg-[var(--brand-white)] text-[var(--brand-ink)] shadow-2xl p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ซ้าย 2 คอลัมน์ */}
              <div className="md:col-span-2 grid gap-4">
                <MenuItem
                  href="/franchise"
                  title="ธุรกิจแฟรนไชส์ท่องเที่ยว"
                  desc="เริ่มต้นธุรกิจของคุณกับเราได้ทันที"
                  onNavigate={onNavigate}
                  icon={<IconFranchise />}
                />
                <MenuItem
                  href="/partner"
                  title="ร่วมลงทุนพาร์ทเนอร์"
                  desc="เติบโตไปพร้อมกับเราในฐานะคู่ค้า"
                  onNavigate={onNavigate}
                  icon={<IconHandshake />}
                />
                <MenuItem
                  href="/freelance"
                  title="สมัครพนักงานขายอิสระ"
                  desc="สร้างรายได้ในแบบของคุณเอง"
                  onNavigate={onNavigate}
                  icon={<IconMegaphone />}
                />
              </div>

              {/* การ์ดขวา */}
              <div className="md:col-span-1">
                <div className="rounded-2xl bg-[#f6f7fb] p-5 h-full flex flex-col">
                  <h3 className="text-lg font-extrabold text-[var(--brand-ink)]">
                    คอร์สเรียนแนะนำ
                  </h3>
                  <p className="text-sm text-black/60 mt-1">
                    เรียนรู้กลยุทธ์การตลาดดิจิทัล
                  </p>
                  <div
                    className="mt-4 rounded-xl bg-white/70 h-28 w-full"
                    aria-hidden
                  />
                  <Link
                    role="menuitem"
                    href="/courses/marketing-starter"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-2)] transition-colors"
                    onClick={onNavigate} // คลิกแล้วปิด
                  >
                    <IconPlayFill />
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ระยะรองรับเงา */}
          <div className="h-2" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuItem({
  href,
  title,
  desc,
  onNavigate,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  onNavigate?: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Link
      role="menuitem"
      href={href}
      onClick={onNavigate} // ปิดเมกะเมนูก่อน navigate
      className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 hover:bg-[#f8f9ff] transition-colors"
    >
      <div className="grid place-items-center size-12 rounded-xl bg-[#eef1ff] text-[var(--brand-navy)] group-hover:text-[var(--brand-orange)] transition-colors">
        {/* ไอคอน */}
        <div className="size-6" aria-hidden>
          {icon}
        </div>
      </div>
      <div>
        <div className="font-bold text-[var(--brand-ink)]">{title}</div>
        <div className="text-sm text-black/60">{desc}</div>
      </div>
    </Link>
  );
}

/* -----------------------------------
 * Inline SVG Icons (ไม่ต้องลงแพ็กเกจเพิ่ม)
 * ขนาด/สี: ใช้ currentColor ให้ปรับตาม parent ได้
 * ----------------------------------*/
function IconFranchise() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="w-full h-full">
      <path d="M3 7h18l-2 4H5L3 7Z" />
      <path d="M6 11v7h12v-7" />
      <path d="M9 18v-3h6v3" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="w-full h-full">
      <path d="M8.5 12.5l2.5 2.5a2 2 0 003 0l3.5-3.5" />
      <path d="M2 12l4.5-4.5a3 3 0 014.2 0l1.3 1.3a3 3 0 004.2 0L22 6" />
      <path d="M2 12l3 3m17-9l-3 3" />
    </svg>
  );
}

function IconMegaphone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="w-full h-full">
      <path d="M3 11l14-5v12L3 13V11Z" />
      <path d="M10 14v5" />
      <path d="M10 19H7a2 2 0 01-2-2v-2" />
    </svg>
  );
}

function IconPlayFill() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  );
}
