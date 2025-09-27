"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

/* ---------- Types ---------- */
type Benefit = { icon: string; text: string };
type FranchiseTier = { imageSrc: string; label: string; href: string };
type Service = {
  number: string;
  title: string;
  description: string | string[];
  buttonText: string;
  href: string;
};
type InvestmentPoint = { title: string; description: string };
type Article = {
  image: string;
  title: string;
  author?: string;
  excerpt: string;
  href: string;
};

/* ---------- Data ---------- */
const benefits: Benefit[] = [
  { icon: "/icons/cloud-1.png", text: "แพลตฟอร์มจองโปรแกรมครบวงจร" },
  { icon: "/icons/teacher.png", text: "คอร์สฝึกอบรมเฉพาะทาง" },
  { icon: "/icons/sale-up.png", text: "การสนับสนุนการขายอย่างต่อเนื่อง" },
  { icon: "/icons/backend.png", text: "ระบบจัดการหลังบ้านที่ใช้งานง่าย" },
  { icon: "/icons/benefit.png", text: "สิทธิประโยชน์และส่วนลดพิเศษ" },
  { icon: "/icons/support.png", text: "ทีมสนับสนุนพร้อมให้คำปรึกษา" },
  { icon: "/icons/network.png", text: "เครือข่ายพันธมิตรที่แข็งแกร่ง" },
  { icon: "/icons/global.png", text: "โอกาสในการขยายธุรกิจไปในอนาคต" },
  { icon: "/icons/trademark.png", text: "สิทธิ์ในการใช้งานชื่อและเครื่องหมายการค้า" },
];

const ctaBenefits: string[] = [
  "ลงทุนน้อย คืนทุนไว สร้างรายได้มั่นคง",
  "ปลดล็อกศักยภาพการขยายต่อไปในสากล",
  "สิทธิ์พิเศษแห่งเครือข่ายรับส่วนลดท่องเที่ยว 5-25%",
  "เป็นเจ้าของธุรกิจได้โดยไม่ต้องมีหน้าร้าน",
  "แนะนำลูกค้าได้รับค่าคอมมิชชั่น 5%",
  "แบ่งปันผลกำไรรายปีตามสัดส่วนหุ้น",
];

const franchiseTiers: FranchiseTier[] = [
  { imageSrc: "/franchise_s.jpg", label: "Franchise (S)", href: "/franchise/s" },
  { imageSrc: "/franchise_m.jpg", label: "Franchise (M)", href: "/franchise/m" },
  { imageSrc: "/franchise_l.jpg", label: "Franchise (L)", href: "/franchise/l" },
];

const servicesData: Service[] = [
  {
    number: "01",
    title: "สร้างรายได้จากการท่องเที่ยว",
    description:
      "Travel Affiliate Marketing หลักสูตรนี้เหมาะสำหรับผู้ที่ต้องการรายได้เสริม มือใหม่เริ่มได้ทันที ที่ไม่มีพื้นฐานมาก่อน ไม่ต้องออกกล้อง ไม่ต้อง LIVE สด ขายออนไลน์ได้ Ai ช่วยหาเงินเข้าร้านได้",
    buttonText: "รายละเอียดการสมัคร",
    href: "/register-affiliate",
  },
  {
    number: "02",
    title: "สร้าง Ai ช่วยทำธุรกิจท่องเที่ยว",
    description: ["Ai ออกแบบ", "Ai สร้างคอนเทนต์", "Ai สร้างวิดีโอ", "Ai พากย์เสียง", "Ai ทำแผนท่องเที่ยว"],
    buttonText: "รายละเอียดการสมัคร",
    href: "/register-ai",
  },
  {
    number: "03",
    title: "สอนเปิดกิจการธุรกิจท่องเที่ยว",
    description:
      "สร้างรายได้ 100 ล้าน ด้วยโมเดลธุรกิจครบวงจร ค้นหาเส้นทางสู่เจ้าของธุรกิจท่องเที่ยวทั่วโลก เปิดโปรแกรม",
    buttonText: "รายละเอียดการสมัคร",
    href: "/register-business",
  },
];

const investmentPoints: InvestmentPoint[] = [
  { title: "ธุรกิจดิจิทัล 100%:", description: "ไม่ต้องมีหน้าร้าน ไม่ต้องสต็อกสินค้า ไม่ต้องยุ่งยากกับการขนส่ง" },
  { title: "รายได้ไร้เพดาน:", description: "รับค่าคอมมิชชั่นรายเดือนจากการขายแพ็กเกจท่องเที่ยวทั่วโลก" },
  { title: "เรียนรู้ง่าย:", description: "เรามีคอร์สเรียนออนไลน์ สอนการขายและคู่มือ E-book ให้คุณเริ่มต้นได้ทันที แม้ไม่มีพื้นฐานด้านเทคโนโลยี" },
  {
    title: "ครบวงจร:",
    description:
      "หลังจากชำระค่าแฟรนไชส์และใช้เวลา 30-45 วัน นับเป็นช่วงเวลาที่คุณจะได้เรียนรู้และเตรียมความพร้อมสู่การเป็นเจ้าของธุรกิจท่องเที่ยว และสร้างรายได้อย่างมืออาชีพ",
  },
];

const articlesData: Article[] = [
  {
    image: "/blog1.jpg",
    title: "การเติบโตของธุรกิจท่องเที่ยวในยุคดิจิทัล",
    author: "",
    excerpt: "ในยุคที่เทคโนโลยีเป็นส่วนหนึ่งของชีวิต ธุรกิจท่องเที่ยวได้เปลี่ยนไปอย่างสิ้นเชิง...",
    href: "/articles/digital-era-growth",
  },
  {
    image: "/blog2.jpg",
    title: "ทำไมธุรกิจท่องเที่ยวจึงน่าลงทุน",
    author: "",
    excerpt: "แม้จะเผชิญกับสถานการณ์ต่างๆ ธุรกิจท่องเที่ยวก็ยังคงเป็นหนึ่งในอุตสาหกรรมที่น่าลงทุนที่สุด...",
    href: "/articles/why-invest-in-tourism",
  },
  {
    image: "/blog3.jpg",
    title: "โอกาสทองของธุรกิจทัวร์ในสไตล์ท่องเที่ยว",
    author: "",
    excerpt: "สำหรับผู้ประกอบการที่มองหาโอกาสใหม่ๆ ธุรกิจนำเที่ยวอย่างมีเอกลักษณ์กำลังมาแรง...",
    href: "/articles/niche-tour-opportunities",
  },
];

/* ---------- Sections ---------- */

// 1) Hero
const Hero: React.FC = () => (
  <section
    className="relative bg-cover bg-center text-white"
    style={{ backgroundImage: "url('/bg_banner.svg')" }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <Image src="/hero-team.png" alt="ทีมงาน siamsantapartner" width={1200} height={200} className="rounded-xl shadow-lg w-full" priority />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center py-12 md:py-20">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Image src="/logodiamsantapartner.png" alt="Siamsanta Partner Logo" width={200} height={60} className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">มาร่วมสร้างความสำเร็จไปด้วยกัน</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
            กับ <span className="text-[var(--brand-orange)]">SIAMSANTA PARTNER</span>
          </h2>
          <p className="mt-6 text-gray-600">
            หากคุณกำลังมองหา โอกาสเติบโตในธุรกิจที่มั่นคงและมีศักยภาพการเติบโตสูง ที่ตอบโจทย์การใช้ชีวิตในปัจจุบัน
            SAMSANTA PRATNER คือคำตอบ เราเปิดโอกาสให้คุณเข้ามาเป็นส่วนหนึ่งในธุรกิจท่องเที่ยวที่กำลังเติบโตอย่างก้าวกระโดด
            ด้วยรูปแบบการลงทุนที่ไม่ต้องใช้เงินก้อนใหญ่ และ คืนทุนได้ในเวลาอันรวดเร็ว ที่สำคัญคือ คุณสามารถสร้างรายได้ที่มั่นคง
            ได้ในระยะยาว โดยไม่จำเป็นต้องลาออกจากงานประจำ เราเชื่อว่าใครๆ ก็ประสบความสำเร็จได้ จึงออกแบบโมเดลธุรกิจให้เข้าใจง่าย
            ยืดหยุ่น และพร้อมเริ่มต้นได้ทันที ไม่ว่าคุณจะมีประสบการณ์ในธุรกิจท่องเที่ยวก่อนหรือไม่ก็ตาม เรามีทีมงานมืออาชีพพร้อมดูแล
            และให้คำแนะนำในทุกขั้นตอน
          </p>
          <Link href="/learn-more" className="inline-block mt-8 rounded-lg bg-[var(--brand-orange)] text-white font-bold px-8 py-3 hover:bg-[var(--brand-orange-2)] transition-all duration-300 shadow-md hover:shadow-lg">
            LEARN MORE
          </Link>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-center justify-center">
          <Image src="/SIAMSANTA-PARTNER-Hero.jpg" alt="ทีมงานกำลังประชุม" width={500} height={350} className="rounded-xl shadow-xl" />
        </motion.div>
      </div>
    </div>
  </section>
);

// 2) Features
const Features: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Image src="/couple_uniform.png" alt="มาร่วมลงทุนกับ SIAMSANTA TRAVEL" width={500} height={600} className="rounded-xl shadow-lg w-full" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="inline-block bg-[var(--brand-orange)] text-white px-4 py-2 rounded-md font-semibold">โอกาสทองที่คุณไม่ควรมองข้าม</div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">มาร่วมลงทุนกับ SIAMSANTA TRAVEL</h2>
          <div className="mt-4 text-gray-600 space-y-4">
            <p>คุณฝันอยากมีธุรกิจท่องเที่ยวระหว่างประเทศที่ทำกำไรงาม แต่กังวลเรื่องการลงทุนสูงและความซับซ้อนใช่ไหม</p>
            <p>
              SIAMSANTA TRAVEL คือทางออก เรามอบโอกาสให้คุณเป็นเจ้าของธุรกิจท่องเที่ยวแบบครบวงจรในรูปแบบที่ไม่ต้องใช้เงินลงทุนสูง ร้านไม่ต้องมี
              สต็อกไม่ต้องตุนสินค้า ไม่ต้องวิ่งหาขนส่ง
            </p>
            <p>คุณสามารถสร้างรายได้หลักแสนหลักล้านต่อเดือนได้ทุกๆ ที่ ทุกเวลา แม้มีงานประจำอยู่แล้ว</p>
            <p>
              ให้คุณก้าวไปในการร่วมลงทุนกับเราด้วยประสบการณ์กว่า 10 ปีในวงการธุรกิจท่องเที่ยวระหว่างประเทศ SIAMSANTA TRAVEL
              คือบริษัทชั้นนำที่คุณไว้วางใจได้
            </p>
            <p>เรามีทีมงานมืออาชีพพร้อมดูแลและจัดการทุกอย่างให้คุณ ตั้งแต่การตลาดออนไลน์ไปจนถึงการออกแบบโปรแกรมทัวร์ เพื่อช่วยให้คุณบรรลุเป้าหมายยอดขายที่ต้องการ</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// 3) Benefits
const Benefits: React.FC = () => (
  <section className="bg-gray-100 py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Image src="/com_sec1.svg" alt="แพลตฟอร์มจองทัวร์" width={500} height={400} className="w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-3xl font-bold text-gray-900">สิ่งที่คุณจะได้รับเมื่อร่วมงานกับเรา</h2>
            <h3 className="text-2xl font-semibold text-gray-800">เราพร้อมจะมอบ</h3>
          </motion.div>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>
          {benefits.map((item) => (
            <motion.div key={item.text} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-center">
              <div className="flex justify-center items-center h-24">
                <Image src={item.icon} alt={item.text} width={80} height={80} />
              </div>
              <div className="mt-2 bg-[var(--brand-orange)] text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-md">{item.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// 4) CTA
const CTA: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div className="bg-[var(--brand-orange)] rounded-2xl p-8 md:p-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <Image src="/office_banner.png" alt="ร่วมลงทุนเป็นพาร์ทเนอร์ธุรกิจท่องเที่ยว" width={1000} height={500} className="rounded-xl shadow-lg w-full" />
        <div className="grid md:grid-cols-2 gap-8 items-center mt-8 md:mt-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">ร่วมลงทุนเป็นพาร์ทเนอร์ธุรกิจท่องเที่ยว</h2>
            <Link href="/register-details" className="inline-block bg-white text-gray-800 font-bold px-6 py-2.5 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
              รายละเอียดการสมัคร
            </Link>
          </div>
          <div className="space-y-3">
            {ctaBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start">
                <span className="mt-2 mr-3 block w-2 h-2 rounded-full bg-white" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// 5) Franchise
const FranchiseSection: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-navy)]">SIAMSANTA FRANCHISE</h2>
          <h3 className="text-2xl md:text-3xl text-gray-800 mt-1">แฟรนไชส์ธุรกิจท่องเที่ยว</h3>
        </div>
        <ul className="space-y-2 text-gray-600">
          {["แบรนด์เป็นที่รู้จัก (Brand Recognition)", "ระบบการดำเนินงานที่พิสูจน์แล้วว่าสำเร็จ (Proven Business Model)", "การสนับสนุนและการฝึกอบรม (Training and Support)", "เครือข่ายที่แข็งแกร่ง (Strong Network)", "การตลาดส่วนกลาง (Centralized Marketing)"].map(
            (t) => (
              <li key={t} className="flex items-start">
                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-[var(--brand-orange)] rounded-full flex-shrink-0" />
                <span>{t}</span>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {franchiseTiers.map((tier) => (
          <div key={tier.label}>
            <Image src={tier.imageSrc} alt={tier.label} width={400} height={250} className="rounded-lg w-full object-cover" />
            <Link href={tier.href} className="mt-4 block w-full text-center bg-[var(--brand-orange)] text-white font-bold py-3 rounded-lg hover:bg-[var(--brand-orange-2)] transition-colors">
              {tier.label}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-gray-600 space-y-4">
        <p>
          เราพร้อมแล้วที่จะเป็นเบื้องหลังความสำเร็จทางธุรกิจท่องเที่ยวของคุณ ด้วย<strong className="text-gray-800">ประสบการณ์ในธุรกิจท่องเที่ยวต่างประเทศกว่า 15 ปี</strong>
        </p>
        <p>
          คุณจะได้รับสิทธิ์ในการใช้โปรแกรมและเครื่องมือต่างๆ เช่น มัลติมีเดีย มาร์เก็ตติ้ง การตลาด หรือคอนเทนต์โพสต์ออนไลน์ที่ถูกพัฒนามาเพื่อธุรกิจรุ่นใหม่นี้
          ซึ่งจะช่วยให้คุณเข้าถึงลูกค้าและปิดการขายได้อย่างมีประสิทธิภาพยิ่งขึ้น
        </p>
      </div>
    </div>
  </section>
);

// 6) Online Course (banner)
const CourseSection: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative w-full rounded-2xl shadow-lg overflow-hidden">
        <Image src="/affiliate_cta_banner.png" alt="Online Course Banner Background" width={1200} height={600} className="w-full h-auto" />
      </motion.div>
    </div>
  </section>
);

// 7) Services
const ServicesSection: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-12">
          {servicesData.map((service) => (
            <motion.div key={service.number} className="flex items-start" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="text-4xl font-bold text-gray-200 mr-6">{service.number}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                {Array.isArray(service.description) ? (
                  <ul className="mt-2 text-gray-600 space-y-1 list-disc list-inside">
                    {service.description.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-600">{service.description}</p>
                )}
                <Link href={service.href} className="inline-block mt-4 bg-[var(--brand-orange)] text-white font-semibold px-5 py-2 rounded-md hover:bg-[var(--brand-orange-2)] transition-colors">
                  {service.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Image src="/devices_showcase.png" alt="บริการด้านธุรกิจท่องเที่ยว" width={500} height={500} className="w-full" />
        </motion.div>
      </div>
    </div>
  </section>
);

// 8) Freelance
const FreelanceSection: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-navy)]">สมัครพนักงานขายอิสระ</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--brand-orange)] mt-1">Sales Freelance</h3>
          <p className="mt-4 text-gray-600">
            SIAMSANTA TRAVEL กำลังเปิดโอกาสให้คุณ! หากคุณมีความสนใจในการท่องเที่ยว มองหาอิสระในการทำงาน และต้องการสร้างรายได้เสริมหรืออาชีพหลักอีกทางจากการแนะนำแพ็กเกจทัวร์ต่างประเทศ
            นี่คือโอกาสที่ดีที่คุณไม่ควรพลาด
          </p>
          <Link href="/register-freelance" className="inline-block mt-6 bg-[var(--brand-orange)] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[var(--brand-orange-2)] transition-colors shadow-md">
            รายละเอียดการสมัคร
          </Link>
        </motion.div>

        <motion.div className="flex gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="w-1/2">
            <Image src="/freelance_female.png" alt="Sales Freelance" width={250} height={400} className="rounded-2xl shadow-lg w-full object-cover" />
          </div>
          <div className="w-1/2 mt-8">
            <Image src="/freelance_male.png" alt="Sales Freelance" width={250} height={400} className="rounded-2xl shadow-lg w-full object-cover" />
          </div>
        </motion.div>
      </div>
      <div className="mt-20 border-b-2 border-gray-200" />
    </div>
  </section>
);

// 9) Why Invest
const WhyInvestSection: React.FC = () => (
  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-navy)] mb-8">
            ทำไม Siamsanta Travel <br /> จึงเป็นการลงทุนที่คุ้มค่า
          </h2>
          <div className="space-y-4">
            {investmentPoints.map((point, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-3 mt-2 block w-2 h-2 rounded-full bg-[var(--brand-orange)]" />
                <p className="text-gray-600">
                  <strong className="text-[var(--brand-orange)] font-semibold">{point.title}</strong> {point.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-600">
            Siamsanta Travel คือโอกาสสำหรับคนที่กำลังมองหาช่องทางใหม่เพื่อสร้างอิสรภาพทางการเงินผ่านธุรกิจท่องเที่ยวที่ยั่งยืน พร้อมเปลี่ยนแปลงความฝันในการเป็นเจ้าของธุรกิจท่องเที่ยวให้เป็นเพียงแค่ความพยายาม
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[var(--brand-orange)] text-white p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3">การดูแลหลังการขายที่เหนือกว่า</h3>
              <p className="text-sm mb-6">
                พันธสัญญาของเราคือการไม่ทอดทิ้งลูกค้า เรามีทีมงานมืออาชีพที่พร้อมดูแลและติดตามผลความพึงพอใจของคุณอย่างต่อเนื่อง ทั้งก่อนการเดินทาง ระหว่างการเดินทาง และหลังจบทริป เพื่อเก็บข้อมูลมาปรับปรุงและพัฒนาบริการให้มีคุณภาพยิ่งขึ้นอีก
              </p>
              <Link href="/register-details" className="inline-block mt-auto bg-white text-gray-800 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-gray-200 transition-colors">
                รายละเอียดสมัคร
              </Link>
            </div>
            <div className="hidden md:block">
              <Image src="/section6-support.png" alt="การดูแลหลังการขาย" width={400} height={500} className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// 10) Articles
const ArticlesSection: React.FC = () => (
  <section className="bg-gray-50 py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">บทความ</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesData.map((article, index) => (
          <motion.article
            key={article.title}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative">
              <Image src={article.image} alt={article.title} width={400} height={250} className="w-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
              {/* author เผื่อใช้ในอนาคต */}
              {article.author !== undefined && <p className="text-sm text-gray-500 mb-2">ผู้เขียน : {article.author || "-"}</p>}
              <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
              <div className="mt-auto">
                <Link href={article.href} className="inline-block bg-[var(--brand-orange)] text-white font-semibold px-5 py-2 rounded-md hover:bg-[var(--brand-orange-2)] transition-colors text-sm">
                  อ่านบทความ ›
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Page ---------- */

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <FranchiseSection />
      <CourseSection />
      <ServicesSection />
      <FreelanceSection />
      <WhyInvestSection />
      <ArticlesSection />
    </main>
  );
};

export default HomePage;
