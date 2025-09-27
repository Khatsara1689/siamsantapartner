"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-12">
      {/* โค้งมุมบน + เงานุ่ม */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-[var(--brand-white)] text-[var(--brand-ink)] shadow-[0_30px_80px_rgba(0,0,0,.15)]">
            {/* แถบหัวฟุตเตอร์สีกรมท่า */}
            <div className="h-3 rounded-t-3xl bg-[var(--brand-navy)]" />

            {/* เนื้อหา */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:p-10">
              {/* โลโก้ + สโลแกน */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/logodiamsantapartner.png" alt="SIAMSANTA PARTNER" width={250} height={70} />
                  
                </div>
                <p className="text-black/60 leading-relaxed">
                  สร้างเครือข่ายธุรกิจท่องเที่ยวพรีเมียม—เติบโตไปด้วยกันอย่างมั่นคง
                </p>

                {/* ปุ่มโซเชียล */}
                <div className="flex gap-2">
                  <Social href="https://line.me/R/ti/p/@siamsanta" label="LINE OA">
                    <LineIcon />
                  </Social>
                  <Social href="https://m.me/siamsantajapantour" label="Facebook Messenger">
                    <FbIcon />
                  </Social>
                  <Social href="https://www.tiktok.com/" label="TikTok">
                    <TiktokIcon />
                  </Social>
                  <Social href="https://www.youtube.com/" label="YouTube">
                    <YoutubeIcon />
                  </Social>
                </div>
              </div>

              {/* ลิงก์ด่วน 1 */}
              <div>
                <h3 className="mb-3 font-bold text-[var(--brand-navy)]">ร่วมทำธุรกิจกับเรา</h3>
                <ul className="space-y-2 text-black/75">
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/franchise">ธุรกิจแฟรนไชส์ท่องเที่ยว</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/partner/invest">ร่วมลงทุนพาร์ทเนอร์</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/partner/freelance">สมัครพนักงานขายอิสระ</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/courses">คอร์สเรียนออนไลน์</Link></li>
                </ul>
              </div>

              {/* ลิงก์ด่วน 2 */}
              <div>
                <h3 className="mb-3 font-bold text-[var(--brand-navy)]">ข้อมูลบริษัท</h3>
                <ul className="space-y-2 text-black/75">
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/services">สินค้าและบริการ</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/about">เกี่ยวกับเรา</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/blog">บทความ</Link></li>
                  <li><Link className="hover:text-[var(--brand-navy)]" href="/policy/privacy">นโยบายความเป็นส่วนตัว</Link></li>
                </ul>
              </div>

              {/* ติดต่อเรา */}
              <div className="space-y-3">
                <h3 className="font-bold text-[var(--brand-navy)]">ติดต่อเรา</h3>
                <address className="not-italic text-black/75 leading-relaxed">
                  บริษัท สยามซานต้า จำกัด<br />
                  123/45 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110
                </address>

                <div className="space-y-1 text-black/75">
                  <a className="block hover:text-[var(--brand-navy)]" href="tel:+6621204665">โทร: 02-120-4665</a>
                  <a className="block hover:text-[var(--brand-navy)]" href="mailto:hello@siamsanta.com">อีเมล: hello@siamsanta.com</a>
                  <a className="block hover:text-[var(--brand-navy)]" href="https://line.me/R/ti/p/@siamsanta" target="_blank" rel="noopener">LINE OA: @siamsanta</a>
                </div>

                {/* ปุ่มเด่น */}
                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-orange)] px-4 py-3 font-semibold text-white hover:bg-[var(--brand-orange-2)] transition-colors"
                  >
                    ติดต่อทีมงาน
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* เส้นคั่น */}
            <div className="mx-6 lg:mx-10 border-t border-black/10" />

            {/* แถบล่าง */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 lg:px-10 py-4">
              <div className="text-sm text-black/55">
                © {year} SiamSanta Partner. สงวนลิขสิทธิ์.
              </div>

              {/* ปุ่มด่วน */}
              <div className="flex gap-2">
                <a
                  href="tel:+6621204665"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-navy)] text-white px-4 py-2 text-sm font-semibold hover:bg-[var(--brand-navy-2)] transition-colors"
                >
                  <PhoneIcon /> โทรทันที
                </a>
                <a
                  href="https://line.me/R/ti/p/@siamsanta"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-white)] text-[var(--brand-navy)] ring-1 ring-black/10 px-4 py-2 text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  <LineIcon /> แชท LINE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* แถบเต็มจอด้านล่างสีแบรนด์ */}
        <div className="mt-6 w-full h-10 bg-[var(--brand-navy)]" />
      </div>
    </footer>
  );
}

/* ---------- UI helpers ---------- */

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener"
      className="grid place-items-center size-10 rounded-xl bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-2)] transition-colors"
    >
      {children}
    </a>
  );
}

/* ---------- Icons (เบา ไม่ต้องลงไลบรารีเพิ่ม) ---------- */
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.7 11.7 0 003.7 1.2 1 1 0 01.8 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 .8 11.7 11.7 0 001.2 3.7 1 1 0 01-.2 1.1L6.6 10.8z"/>
    </svg>
  );
}
function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M19.7 4.3A10 10 0 005 4.3 8.5 8.5 0 003 10c0 4.6 4.6 8.3 10.3 8.3.7 0 1.4-.04 2-.12l2.7 1.7a.8.8 0 001.2-.7v-3.2A7.9 7.9 0 0021 10a8.5 8.5 0 00-1.3-5.7zM7 9h1.5v4H7V9zm2.5 0H11v4H9.5V9zM12 9h1.5v2.5L15 9h1.5v4H15v-2.5L13.5 13H12V9z"/>
    </svg>
  );
}
function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M13 22v-9h3l1-3h-4V8c0-.9.3-1.5 1.7-1.5H17V3.3C16.7 3.2 15.8 3 14.8 3 12.5 3 11 4.3 11 6.7V10H8v3h3v9h2z"/>
    </svg>
  );
}
function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M21 8.1a6.8 6.8 0 01-4.4-2V16a5.9 5.9 0 11-4.9-5.8v2.3a3.5 3.5 0 103.5 3.5V2h2a4.8 4.8 0 004 4.7v1.4z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M23 12s0-3.2-.4-4.6a3 3 0 00-2.1-2.1C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.5.5A3 3 0 001.4 7.4C1 8.8 1 12 1 12s0 3.2.4 4.6a3 3 0 002.1 2.1c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a3 3 0 002.1-2.1c.4-1.4.4-4.6.4-4.6zM10 15.5V8.5l6 3.5-6 3.5z"/>
    </svg>
  );
}
