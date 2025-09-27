"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

// ===== Brand Vars (optional helpers) =====
// We still use Tailwind arbitrary colors (e.g., bg-[var(--brand-orange)]) so you don't
// need custom Tailwind theme keys. The CSS variables below are here in case
// you want to reuse them elsewhere.
const BrandVars = () => (
  <style jsx global>{`
    :root {
      --brand-navy: #1a237e; /* น้ำเงินเข้มพื้นแถบบน */
      --brand-navy-2: #17206b; /* โทนเข้มสำหรับ hover */
      --brand-white: #ffffff;
      --brand-orange: #ea8c2e; /* สีส้มปุ่ม/ไฮไลต์ */
      --brand-orange-2: #d6791e; /* โทนส้ม hover */
      --brand-ink: #0f172a; /* ข้อความเข้ม */
      --brand-muted: #cfd3dc; /* เส้น/ขอบจาง */
    }
  `}</style>
);

// ===== Types =====
interface ServiceItem {
  imgSrc: string;
  title: string;
  description: string;
}

type SocialColor = "blue" | "orange";

interface SocialLinkItem {
  icon: string;
  text: string;
  color: SocialColor;
  href: string;
}

// ===== Data =====
const servicesData: ServiceItem[] = [
  {
    imgSrc: "/products/srv_pkg.jpg",
    title: "บริการแพ็กเกจท่องเที่ยวต่างประเทศ",
    description:
      "แพ็กเกจคุณภาพทั่วโลก ทั้งเอเชีย ยุโรป อเมริกา ฯลฯ ครอบคลุมทั้งพักผ่อน ดูงาน และสัมมนา ออกแบบพิถีพิถัน คุ้มค่า",
  },
  {
    imgSrc: "/products/srv_car_driver.jpg",
    title: "บริการรถเช่าพร้อมคนขับจากทั่วโลก",
    description:
      "รถหลายประเภทตามจำนวนคน/กระเป๋า คนขับมืออาชีพ ปลอดภัย สะดวกสบาย เหมาะทั้งท่องเที่ยวและธุรกิจ",
  },
  {
    imgSrc: "/products/srv_vvip.png",
    title: "บริการจัดทริปส่วนตัวพรีเมียม VVIP",
    description:
      "จัดเส้นทางเฉพาะบุคคล/องค์กร พร้อมดูแลตั้งแต่คนขับ รถ ไกด์ และทีมออแกไนซ์มืออาชีพ ตอบโจทย์งานผู้บริหาร",
  },
  {
    imgSrc: "/products/srv_visa.jpg",
    title: "บริการทำ Visa",
    description:
      "ที่ปรึกษาและดำเนินการเอกสารครบถ้วน ลดความผิดพลาด ประสานงานให้จนแล้วเสร็จ",
  },
  {
    imgSrc: "/products/srv_mice.jpg",
    title: "บริการจัดกรุ๊ปสัมมนา/ดูงาน",
    description:
      "ครบวงจรทั้งสถานที่ อุปกรณ์ เวลา/ตารางกิจกรรม ตั๋วเดินทาง และของที่ระลึก พร้อมทีมซัพพอร์ตหน้างาน",
  },
  {
    imgSrc: "/products/srv_pocketwifi.jpg",
    title: "บริการ Pocket Wifi ต่างประเทศ",
    description:
      "อินเทอร์เน็ตไร้สายความเร็วสูง ใช้งานได้ต่อเนื่อง แชร์ได้หลายอุปกรณ์ ไม่มีสะดุด พกพาง่ายสะดวกสบาย ใช้งานได้หลายประเทศ",
  },
  {
    imgSrc: "/products/srv_ticket.jpg",
    title: "บริการประกันการเดินทาง",
    description:
      "ความคุ้มครองครอบคลุม คัดสรรแผนที่เหมาะสมกับเส้นทางและงบประมาณ",
  },
  {
    imgSrc: "/products/srv_flight.png",
    title: "บริการจองตั๋วเข้าสถานที่/สวนสนุก",
    description:
      "คิวสั้น ไม่ต้องรอหน้างาน มีตัวเลือกหลากหลาย พร้อมดีลพิเศษเฉพาะลูกค้าเรา",
  },
  {
    imgSrc: "/products/srv_hotel.jpg",
    title: "บริการจองโรงแรมที่พัก/ร้านอาหาร",
    description:
      "จองโรงแรม/ที่พักและร้านอาหารทั้งไทยและต่างประเทศ ด้วยเครือข่ายซัพพลายเออร์คุณภาพ",
  },
  {
    imgSrc: "/products/srv_insurance.jpg",
    title: "บริการจองตั๋วเครื่องบิน",
    description:
      "ค้นหาไฟลต์เหมาะสมที่สุดตามงบและเวลา จัดการเรื่องสัมภาระ/ซีทล่วงหน้า",
  },
];

const socialLinksData: SocialLinkItem[] = [
  { icon: "/products/tiktok.svg", text: "TIKTOK", color: "blue", href: "#" },
  { icon: "/products/youtube.svg", text: "YOUTUBE", color: "blue", href: "#" },
  { icon: "/products/line.svg", text: "LINE OA", color: "blue", href: "#" },
  { icon: "/products/japan.svg", text: "FACEBOOK", color: "orange", href: "#" },
  { icon: "/products/china.svg", text: "FACEBOOK", color: "orange", href: "#" },
  { icon: "/products/earth.svg", text: "FACEBOOK", color: "orange", href: "#" },
  { icon: "/products/japan.svg", text: "WEBSITE", color: "blue", href: "#" },
  { icon: "/products/china.svg", text: "WEBSITE", color: "blue", href: "#" },
  { icon: "/products/earth.svg", text: "WEBSITE", color: "blue", href: "#" },
];

// ===== Motion variants =====
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const zoomIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
};

// ===== Component =====
export default function ServicesPage(): JSX.Element {
  return (
    <div className="bg-white text-[var(--brand-ink)]">
      <BrandVars />

      {/* ===== Hero Section ===== */}
      <section className="relative h-[450px] md:h-[560px] flex items-center justify-center text-center text-white">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/products/hero_consult.png" // ตรวจสอบชื่อไฟล์ใน /public/products
            alt="สินค้าและบริการของ Siam Santa Partner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            สินค้าและบริการ
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            SIAMSANTA PARTNER
          </p>
        </motion.div>
      </section>

      {/* ===== Services Overview (Section 2) ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/products/bag-plane.png"
                alt="ไอคอนการท่องเที่ยว"
                width={70}
                height={70}
                className="h-[70px] w-[70px]"
              />
              <h2 className="text-lg font-semibold text-[var(--brand-navy)]">สินค้าและบริการ</h2>
            </div>
            <p className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              SIAMSANTA PARTNER
            </p>
          </motion.div>

          {/* Collage */}
          <motion.div
            variants={zoomIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/products/teaser1.png"
              alt="ภาพรวมบริการ Siam Santa Partner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== All Services (Section 3) ===== */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service, index) => (
              <motion.article
                key={service.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    width={88}
                    height={88}
                    className="rounded-lg object-cover h-22 w-22"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                  <span className="inline-flex items-center bg-[var(--brand-orange)] text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                    รายละเอียดบริการ
                  </span>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Global Package Banner (Section 4) ===== */}
      <section className="bg-gray-50 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/products/global_explorer.png"
              alt="แพ็กเกจ Global Explorer ของ Siam Santa Travel"
              width={1600}
              height={800}
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Website Platform (Section 5) ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-semibold tracking-wider text-[var(--brand-navy)]">SIAMSANTA TRAVEL</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              แพลตฟอร์มเว็บไซต์สำหรับธุรกิจของคุณ
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              เรามีระบบเว็บไซต์สำเร็จรูปที่สวยงามและน่าเชื่อถือ พร้อมให้คุณเริ่มต้นธุรกิจได้ทันที
            </p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            variants={zoomIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <Image
              src="/products/web.svg"
              alt="Siam Santa Travel Website Platform"
              width={1200}
              height={720}
              className="w-full h-auto max-w-4xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Social Media (Section 6) ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-orange)]">
              Social Media
            </h2>
          </motion.div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialLinksData.map((link, index) => {
              const isOrange = link.color === "orange";
              const base = isOrange ? "bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-2)]" : "bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-2)]";
              return (
                <motion.a
                  key={link.text + index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${base}`}
                >
                  <div className="flex items-center gap-3">
                    <Image src={link.icon} alt="" width={28} height={28} />
                    <span className="font-bold text-white tracking-wide">{link.text}</span>
                  </div>
                  <Image src="/products/click.svg" alt="ไปยังลิงก์" width={24} height={24} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
