// app/franchise/page.tsx
'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ====== UI helpers ======
const SectionHeader: FC<{ title: string; subtitle?: string; highlight?: string }> = ({
  title,
  subtitle,
  highlight,
}) => (
  <div className="text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
      {title}{' '}
      {highlight ? <span className="text-[var(--brand-navy)]">{highlight}</span> : null}
    </h2>
    {subtitle ? (
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">{subtitle}</p>
    ) : null}
  </div>
);

const FeatureCard: FC<{ img: string; title: string; body: string; delay?: number }> = ({
  img,
  title,
  body,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
  >
    <Image src={img} alt={title} width={800} height={500} className="w-full object-cover" />
    <div className="p-6 flex-grow">
      <h3 className="font-bold text-lg text-[var(--brand-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  </motion.div>
);

const Bullet: FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="font-medium text-slate-700 leading-7">{children}</li>
);

const CTAButtons: FC<{
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}> = ({
  primaryHref = '/franchise/apply',
  secondaryHref = '/contact',
  primaryLabel = 'สมัครแฟรนไชส์',
  secondaryLabel = 'ขอรายละเอียดเพิ่มเติม',
}) => (
  <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
    <Link
      href={primaryHref}
      className="w-full sm:w-auto bg-[var(--brand-orange)] text-white font-bold px-8 py-3 rounded-lg hover:bg-[var(--brand-orange-2)] transition-all shadow-md text-center"
    >
      {primaryLabel}
    </Link>
    <Link
      href={secondaryHref}
      className="w-full sm:w-auto bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-2)] text-white font-bold px-8 py-3 rounded-lg transition-all shadow-md text-center"
    >
      {secondaryLabel}
    </Link>
  </div>
);

// ====== Page ======
const FranchisePage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (i: number) => setOpenFaq((p) => (p === i ? null : i));

  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <section className="relative h-[450px] md:h-[520px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/franchise/hero_top.png"
            alt="ทีมงาน SiamSanta Partner พร้อมให้บริการ"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/55 z-10" />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 px-4"
        >
          <p className="uppercase tracking-[0.25em] text-white/80">
            SiamSanta Franchise
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">
            ร่วมแฟรนไชส์ธุรกิจท่องเที่ยว
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            โอกาสเป็นเจ้าของธุรกิจที่คืนทุนไว เติบโตยั่งยืน พร้อมทีมมืออาชีพคอยสนับสนุนทุกย่างก้าว
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/franchise/apply"
              className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-2)] text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-center"
            >
              สมัครแฟรนไชส์
            </Link>
            <Link
              href="#packages"
              className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/25 text-center"
            >
              ดูแพ็กเกจ S / M / L
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===== Why Section ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-x-12 gap-y-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
              SIAMSANTA
              <br />
              FRANCHISE
            </h2>
            <p className="mt-4 text-xl font-semibold text-[var(--brand-orange)]">
              ร่วมเดินทางสู่ความสำเร็จกับเรา
            </p>
            <div className="mt-6 space-y-5 text-slate-600 leading-relaxed">
              <p>
                คุณกำลังมองหาโอกาสในการเป็นเจ้าของธุรกิจที่มีศักยภาพและเติบโตมั่นคงใช่หรือไม่?
                เรายินดีต้อนรับสู่ <strong>SIAMSANTA FRANCHISE</strong> โมเดลแฟรนไชส์ท่องเที่ยวที่
                เริ่มได้ไวและต่อยอดได้จริง
              </p>
              <p>
                ด้วยประสบการณ์กว่า 15 ปี เรามีระบบหลังบ้าน เครื่องมือการตลาด และทีมที่ปรึกษา
                เพื่อให้คุณโฟกัสกับการขายและการเติบโต ส่วนเอกสาร การเดินทาง การชำระเงิน{' '}
                <strong>เราดูแลให้ครบ</strong>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/franchise/office.png"
              alt="ทีมงาน SIAMSANTA FRANCHISE"
              width={640}
              height={430}
              className="rounded-xl shadow-2xl w-full object-cover"
            />
            <div className="mt-4 bg-slate-50 p-5 rounded-lg shadow-sm border border-slate-100">
              <p className="font-bold text-[var(--brand-ink)]">
                เราเชื่อในการเติบโตไปด้วยกัน
              </p>
              <p className="mt-1 text-sm text-slate-600">
                โมเดล + ระบบ + ทีมงาน = โครงสร้างรายได้ยั่งยืนสำหรับแฟรนไชส์ของคุณ
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="SIAMSANTA FRANCHISE"
            highlight="แฟรนไชส์ธุรกิจท่องเที่ยว"
            subtitle="ทำไมต้องเลือกลงทุนกับ SIAMSANTA TRAVEL"
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              img="/franchise/why_1.jpg"
              title="ระบบพร้อมเริ่ม"
              body="ฮาร์ดแวร์/ซอฟต์แวร์/คู่มือครบ ลดการลองผิดลองถูก เริ่มขายได้ไว"
              delay={0.05}
            />
            <FeatureCard
              img="/franchise/why_2.jpg"
              title="การตลาดวัดผลได้"
              body="TikTok • LINE OA • Meta Ads พร้อมแดชบอร์ดติดตามผลแบบเรียลไทม์"
              delay={0.1}
            />
            <FeatureCard
              img="/franchise/why_3.jpg"
              title="เส้นทางรายได้ชัดเจน"
              body="เครื่องมือคำนวณ-เสนอราคา-ปิดการขาย ช่วยทีมขายทำงานง่ายและเป็นมืออาชีพ"
              delay={0.15}
            />
            <FeatureCard
              img="/franchise/why_4.jpg"
              title="อบรม + โค้ช"
              body="ออนบอร์ดดิ้งครบและที่ปรึกษาประจำสาขา ดูแลจนทำงานได้จริง"
              delay={0.2}
            />
            <FeatureCard
              img="/franchise/why_5.jpg"
              title="พลังแบรนด์"
              body="ภาพลักษณ์พรีเมียม สร้างความเชื่อมั่นต่อลูกค้าองค์กรและกรุ๊ปใหญ่"
              delay={0.25}
            />
            <FeatureCard
              img="/franchise/why_6.jpg"
              title="ยืดหยุ่นและโตได้"
              body="ทำควบคู่งานประจำได้ และขยายทีมเมื่อพร้อม โครงสร้างค่าคอมมิชชันสนับสนุนการเติบโต"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ===== Packages S / M / L ===== */}
      <section id="packages" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* S */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <Image
                src="/franchise/size_people_s.png"
                alt="Franchise Size S"
                width={520}
                height={520}
                className="rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
                FRANCHISE <span className="text-[var(--brand-orange)]">SIZE (S)</span>
              </h3>
              <p className="mt-2 text-lg font-semibold text-slate-700">
                JOIN TOUR (เอเชีย) • เหมาะสำหรับเริ่มต้น
              </p>
              <ul className="mt-8 space-y-4 list-disc list-inside">
                <Bullet>สิทธิ์ขายแพ็กเกจยอดนิยมในเอเชีย + เส้นทาง Free Visa</Bullet>
                <Bullet>รายได้หมุนเวียนเป้าหมาย ~7 หลัก/ปี</Bullet>
                <Bullet>อุปกรณ์/ระบบพร้อมใช้ ไม่ต้องแลนด์/จองตั๋วเอง</Bullet>
                <Bullet>ทีมสนับสนุนดูแลเคสลูกค้า ≤ 3 คน/กลุ่ม</Bullet>
              </ul>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-orange-50 text-[var(--brand-orange)] px-4 py-1 text-sm font-semibold">
                  เหมาะกับทีมเล็ก & มือใหม่
                </span>
              </div>
              <CTAButtons />
            </motion.div>
          </div>

          {/* M */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:order-first"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
                FRANCHISE <span className="text-[var(--brand-orange)]">SIZE (M)</span>
              </h3>
              <p className="mt-2 text-lg font-semibold text-slate-700">
                JOIN TOUR ทั่วโลก • โตขึ้นด้วยยุโรป/อเมริกา
              </p>
              <ul className="mt-8 space-y-4 list-disc list-inside">
                <Bullet>สิทธิ์ขายเส้นทางทั่วโลก ครอบคลุมยุโรป/อเมริกา</Bullet>
                <Bullet>รายได้หมุนเวียนเป้าหมาย ~7–8 หลัก/ปี</Bullet>
                <Bullet>ชุดเอกสารและสื่อขายระดับพรีเมียม</Bullet>
                <Bullet>ทีมสนับสนุนลูกค้า ≤ 5 คน/กลุ่ม</Bullet>
              </ul>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-orange-50 text-[var(--brand-orange)] px-4 py-1 text-sm font-semibold">
                  ขยายทีม + งานกรุ๊ปคุณภาพ
                </span>
              </div>
              <CTAButtons />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <Image
                src="/franchise/office_m.png"
                alt="Franchise Size M"
                width={520}
                height={520}
                className="rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>
          </div>

          {/* L */}
          <div className="rounded-[28px] bg-[var(--brand-orange)] py-14 px-6 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <Image
                src="/franchise/wide_meeting.png"
                alt="Franchise Size L"
                width={1400}
                height={700}
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="mt-10 max-w-4xl text-white">
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  FRANCHISE <span className="text-[var(--brand-ink)]/80">SIZE (L)</span>
                </h3>
                <p className="mt-2 text-lg font-semibold">
                  Private Premium / MICE / องค์กร • โฟกัสคุณภาพสูง
                </p>
                <ul className="mt-8 space-y-3 list-disc list-inside text-white/95 text-left mx-auto max-w-3xl">
                  <li>สิทธิ์ขายส่วนตัวพรีเมียม & MICE หลายภูมิภาคทั่วโลก</li>
                  <li>รายได้หมุนเวียนเป้าหมาย ~8–9 หลัก/ปี</li>
                  <li>เวิร์กโฟลว์องค์กร/เอกสารครบ ภาพลักษณ์น่าเชื่อถือ</li>
                  <li>ทีมสนับสนุนลูกค้า ≤ 10 คน/กลุ่ม + ที่ปรึกษาอาวุโส</li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/franchise/apply"
                    className="inline-block bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-lg hover:bg-white/30 transition-all border border-white/30 shadow-lg"
                  >
                    นัดคุยแพ็กเกจ L
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Benefit Images ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-ink)] tracking-tight">
              สิ่งที่คุณจะได้รับจากเรา
            </h2>
            <p className="mt-3 text-slate-600">
              ธุรกิจที่เชื่อถือได้ • คุ้มค่า • ขายได้จริง
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { img: '/franchise/hl_1a.jpg', label: 'ธุรกิจท่องเที่ยวออนไลน์ที่เชื่อถือได้' },
                { img: '/franchise/hl_1b.jpg', label: 'ลงทุนคุ้มค่า ได้อุปกรณ์/ระบบครบ' },
                { img: '/franchise/hl_1c.jpg', label: 'มือใหม่ก็ทำได้ มีที่ปรึกษา' },
                { img: '/franchise/hl_1c.jpg', label: 'ภาพลักษณ์พร้อมรับงานใหญ่' },
                { img: '/franchise/hl_2b.jpg', label: 'ค่าคอมมิชชันสูง ขยายทีมได้' },
                { img: '/franchise/hl_2c.jpg', label: 'ประกัน/เอกสาร/มาตรฐานความปลอดภัย' },
              ].map((i, idx) => (
                <div key={idx} className="relative">
                  <Image
                    src={i.img}
                    alt={i.label}
                    width={640}
                    height={420}
                    className="rounded-xl shadow-lg w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-[var(--brand-orange)] text-white text-center rounded-lg font-semibold">
                    {i.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto text-left">
              <h3 className="text-2xl font-bold text-[var(--brand-ink)]">
                โครงสร้างพร้อมสเกล: ระบบ • ทีม • การตลาด
              </h3>
              <p className="mt-4 text-slate-600 leading-7">
                เวิร์กโฟลว์ตั้งแต่รับลูกค้า เสนอราคา เก็บเงิน ไปจนถึงบริการหลังการขายครบถ้วน
                เพื่อให้แฟรนไชส์โฟกัสที่ “ยอดขาย” และ “การเติบโต” ได้เต็มที่
              </p>
            </div>
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* ===== Steps & System ===== */}
      <section className="bg-white py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-ink)]">
              เริ่มต้นธุรกิจกับเรา:{' '}
              <span className="text-[var(--brand-orange)]">ขั้นตอนง่ายๆ</span>
            </h2>
            <p className="mt-2 max-w-3xl mx-auto text-slate-600">
              เชื่อมคุณกับดีมานด์ตลาดกลาง/องค์กร ดูแลเอกสารและการเดินทางให้ครบ
            </p>
          </div>
          <div className="mt-12 text-left">
            <ol className="mt-4 space-y-5 max-w-3xl mx-auto">
              {[
                'เปิดแพลตฟอร์มและออนบอร์ดทีม',
                'วางแผนการตลาด + แคมเปญกลาง',
                'ลูกค้าชำระเงินผ่านบริษัท โปร่งใส ตรวจสอบได้',
                'อบรม/โค้ชเวิร์กโฟลว์มาตรฐาน',
                'บริหารลูกค้าผ่านช่องทางที่เหมาะสม',
                'โอนส่วนแบ่งทุกวันที่ 15 หลังปิดงาน',
              ].map((t, i) => (
                <li key={i} className="font-semibold text-slate-700 leading-7">
                  {i + 1}. {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-12">
            <CTAButtons />
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="คำถามที่พบบ่อย" />
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            {[
              {
                q: 'ต้องใช้เงินลงทุนเริ่มต้นเท่าไหร่?',
                a: 'มีแพ็กเกจ S/M/L เริ่มที่หลักแสน พร้อมอุปกรณ์และระบบพร้อมใช้งาน',
              },
              {
                q: 'ต้องมีประสบการณ์ท่องเที่ยวมาก่อนไหม?',
                a: 'ไม่จำเป็น มีหลักสูตรออนบอร์ดดิ้ง คู่มือทำงาน และที่ปรึกษาประจำสาขา',
              },
              {
                q: 'รายได้มาจากไหน?',
                a: 'ค่าบริการ/มาร์จิน + โครงสร้างค่าคอมมิชชัน พร้อมอินเซนทีฟงานกรุ๊ป/องค์กร',
              },
              {
                q: 'คืนทุนประมาณเมื่อไหร่?',
                a: 'ขึ้นกับขนาดทีมและแผนการตลาด เมื่อทำตามกระบวนการจะเห็นผลได้ไว',
              },
              {
                q: 'ทีมสนับสนุนช่วยอะไรบ้าง?',
                a: 'ให้คำปรึกษาเคสจริง วางแผนการตลาด ตรวจเอกสาร ประสานงานเดินทาง และแก้ปัญหาเร่งด่วน',
              },
            ].map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={idx} className="p-6">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="text-lg font-semibold text-[var(--brand-ink)]">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 h-6 w-6 rounded-full grid place-items-center transition ${
                        open
                          ? 'bg-[var(--brand-orange)] text-white'
                          : 'bg-slate-100 text-[var(--brand-ink)]'
                      }`}
                    >
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${idx}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      open ? 'max-h-48 mt-3' : 'max-h-0'
                    }`}
                  >
                    <p className="text-slate-600 leading-7">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-slate-500">ยังมีข้อสงสัยอยู่ไหม?</p>
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-[var(--brand-navy)]">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-[var(--brand-white)]/90">
                Siamsanta Franchise: สมัครวันนี้รับสิทธิพิเศษมากมาย
              </h2>
              <p className="mt-1 text-base text-[var(--brand-white)]/80">
                เราดูแลส่วนระบบและเอกสารให้ครบ คุณโฟกัสที่ยอดขายและการเติบโต
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <p className="text-lg font-bold text-white">ติดต่อ</p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LINE"
              >
                <Image src="/icons/icon-line.png" alt="LINE" width={44} height={44} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook Messenger"
              >
                <Image
                  src="/icons/icon-messenger.png"
                  alt="Facebook Messenger"
                  width={44}
                  height={44}
                />
              </a>
              <Link
                href="/franchise/apply"
                className="rounded-lg px-4 py-2 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-2)] text-white font-semibold transition"
              >
                สมัครแฟรนไชส์
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FranchisePage;
