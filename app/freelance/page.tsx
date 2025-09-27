// file: app/freelance/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";

type TabKey = "regulations" | "agreement";

const FeatureIcon: React.FC = () => (
  <svg
    className="w-8 h-8 flex-shrink-0"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M16 0L30.1147 8V24L16 32L1.8853 24V8L16 0Z"
      fill="url(#paint0_linear_1_2)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF8A00" />
        <stop offset="1" stopColor="#FF6A00" />
      </linearGradient>
    </defs>
  </svg>
);

const FreelancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("regulations");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div>
      {/* Ensure CSS variables exist (safe no-op if already defined globally) */}
      <style jsx global>{`
        :root {
          --brand-navy: #1a237e;
          --brand-navy-2: #17206b;
          --brand-white: #ffffff;
          --brand-orange: #ea8c2e;
          --brand-orange-2: #d6791e;
          --brand-ink: #0f172a;
          --brand-muted: #cfd3dc;
        }
      `}</style>

      {/* === Hero Section === */}
      <section className="bg-[var(--brand-white)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
                ร่วมทีมกับ{" "}
                <span className="text-[var(--brand-navy)]">
                  SIAMSANTA TRAVEL
                </span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                ก้าวสู่โลกธุรกิจท่องเที่ยวในบทบาท Sales Freelance และนายหน้า
                Affiliate
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <NextImage
                src="/employee/hero-team.png"
                alt="ทีมงาน Sales Freelance และ Affiliate ของ Siam Santa Travel"
                width={550}
                height={367}
                className="rounded-xl shadow-2xl object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Intro Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12 items-center">
            {/* Left: Laptop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <NextImage
                src="/partner/laptop.png"
                alt="Laptop showing travel agency website"
                width={600}
                height={450}
                className="object-contain"
              />
            </motion.div>

            {/* Right: Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[var(--brand-ink)]">
                  SIAMSANTA
                </h2>
                <p className="mt-1 text-xl font-semibold text-[var(--brand-orange)]">
                  Freelance Sales Representative
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg italic border-l-4 pl-4 py-2 border-[var(--brand-orange)]"
              >
                &quot;หากคุณพร้อมที่จะเติบโตไปกับเรา นี่คือโอกาสที่ดีที่สุด
                สำหรับการร่วมรังสรรค์ธุรกิจท่องเที่ยว&quot;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <NextImage
                  src="/partner/team.png"
                  alt="Siam Santa office team"
                  width={500}
                  height={250}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-start"
              >
                <NextImage
                  src="/logodiamsantapartner.png"
                  alt="Siamsanta Partner Logo"
                  width={250}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section className="bg-[var(--brand-white)] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--brand-ink)]">
              โอกาสในการร่วมทีม
            </h2>
            <p className="text-6xl md:text-7xl font-black tracking-tighter mt-1 text-[var(--brand-ink)]">
              SIAMSANTA
            </p>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">
              ก้าวสู่โลกธุรกิจท่องเที่ยวในบทบาท Sales Freelance
              พนักงานขายอิสระสินค้าและบริการผลิตภัณฑ์ที่เกี่ยวกับการท่องเที่ยว
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid lg:grid-cols-5 gap-x-12 gap-y-16">
            {/* Left: Intro */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <span className="inline-block bg-orange-100 text-[var(--brand-orange)] text-sm font-semibold px-4 py-1 rounded-full">
                พิเศษ
              </span>
              <h3 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--brand-ink)]">
                สิ่งที่คุณจะได้รับ
                <br />
                จากการเป็นส่วนหนึ่ง
                <br />
                ของเรา
              </h3>
              <div className="mt-4 h-1.5 w-24 bg-[var(--brand-orange)] rounded-full" />
              <p className="mt-6 text-gray-600 leading-relaxed">
                นี่คือโอกาสทองสำหรับคุณที่จะก้าวเข้าสู่ธุรกิจท่องเที่ยวในฐานะพนักงานขายอิสระของบริษัท
                เราไม่ได้ให้แค่โอกาส
                แต่มีเครื่องมือและสิทธิประโยชน์พร้อมช่วยให้คุณเริ่มต้นและเติบโตในธุรกิจได้จริง
              </p>
            </motion.div>

            {/* Right: Features + Callout */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Features list */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="md:col-span-2 space-y-8"
                >
                  <div className="flex">
                    <div className="pt-1">
                      <FeatureIcon />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[var(--brand-ink)]">
                        คอร์สเรียนอบรมพนักงานอิสระด้านการขาย
                      </h4>
                      <p className="mt-1 text-gray-600">
                        จะพาคุณเข้าสู่หลักสูตรเข้มข้นเพื่อพัฒนาทักษะการขาย
                        การสร้างความสัมพันธ์กับลูกค้า และเทคนิคการปิดการขายระดับมืออาชีพ
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="pt-1">
                      <FeatureIcon />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[var(--brand-ink)]">
                        บัตรอนุญาตพนักงานขายอิสระของบริษัท
                      </h4>
                      <p className="mt-1 text-gray-600">
                        มีบัตรพนักงานและเครื่องมือยืนยันสถานะการเป็นผู้ประกอบการอิสระที่ได้รับการรับรองจากบริษัทฯ
                        สร้างความเชื่อมั่นให้ลูกค้า
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="pt-1">
                      <FeatureIcon />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[var(--brand-ink)]">
                        แพ็กเกจท่องเที่ยวต่างประเทศทั่วโลก
                      </h4>
                      <p className="mt-1 text-gray-600">
                        โอกาสต่อยอด สัมผัสประสบการณ์ในรูปแบบทริปและเส้นทางที่หลากหลาย
                        เพื่อเสนอทางเลือกที่ดีที่สุดให้ลูกค้าของคุณ
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Callout card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="md:col-span-1 bg-gray-100 rounded-xl p-6 h-fit"
                >
                  <svg
                    className="w-10 h-10 opacity-50 text-[var(--brand-navy)]"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden
                  >
                    <path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zM22.667 22.667h4L29.333 16V9.333h-6.666v13.334z" />
                  </svg>
                  <p className="mt-4 text-lg font-semibold text-[var(--brand-ink)]">
                    เรียนจบงานทำทันที สมัครเป็นพนักงานขายอิสระกับบริษัทฯ
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Benefits Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12 items-start">
            {/* Left: Image + text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative inline-block p-3" style={{ lineHeight: 0 }}>
                <div className="absolute top-0 left-0 h-[calc(100%-12px)] w-3 bg-[var(--brand-orange)] rounded-l-md" />
                <div className="absolute bottom-0 left-0 w-[calc(100%-12px)] h-3 bg-[var(--brand-orange)] rounded-b-md" />
                <NextImage
                  src="/employee/staff-pair2.png"
                  alt="ทีมงาน Siam Santa ในยูนิฟอร์ม"
                  width={450}
                  height={300}
                  className="relative rounded-lg shadow-lg object-cover w-full"
                />
              </div>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed border-t-2 border-gray-200 pt-6">
                เรามอบ กลยุทธ์การตลาดและการปิดการขายที่เข้าถึงง่ายและมีประสิทธิภาพสูง
                เพื่อให้คุณสามารถสร้างฐานลูกค้าและปิดการขายได้อย่างมั่นใจ
              </p>
            </motion.div>

            {/* Right: bullets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--brand-ink)]">
                คุณสมบัติและโอกาสที่คุณจะได้รับ
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600 list-disc list-inside marker:text-[var(--brand-orange)] text-base lg:text-lg">
                <li>
                  <strong>ทำงานออนไลน์ได้ 100%:</strong>{" "}
                  ปรับยุคใหม่ ไม่ต้องเข้าออฟฟิศ ทำงานจากที่ไหนก็ได้
                </li>
                <li>
                  <strong>ไม่มีข้อยกเว้น:</strong>{" "}
                  ไม่ปิดกั้นยอด คุณทำเท่าไหร่รับคอมมิชชั่นและวิธีทำงานได้เอง
                </li>
                <li>
                  <strong>เหมาะสำหรับครีเอเตอร์การท่องเที่ยว:</strong>{" "}
                  สร้างรายได้ไปพร้อมกับสิ่งที่ชอบ
                </li>
                <li>
                  <strong>มีทีมฝึกอบรม/ที่ปรึกษา:</strong> คู่มือ + เคล็ดลับการขาย ครบถ้วน
                </li>
                <li>
                  <strong>สื่อและเครื่องมือพร้อมใช้:</strong>{" "}
                  โบร์ชัวร์ แม่แบบโพสต์ ใบเสนอราคา
                </li>
                <li>
                  <strong>ทักษะการสื่อสารดี:</strong>{" "}
                  แนะนำแพ็กเกจได้คล่อง ทั้งออนไลน์และออฟไลน์
                </li>
                <li>
                  <strong>บริหารเวลาได้:</strong>{" "}
                  วางแผนงานล่วงหน้า เหมาะทั้งทำเสริมและทำจริงจัง
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Tools Section === */}
      <section className="bg-[var(--brand-white)] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: TIKTOK */}
            <ToolCard
              delay={0.1}
              title="TIKTOK"
              iconPath="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            >
              เรียนรู้การสร้างวิดีโอโปรโมทแพ็กเกจทัวร์ที่น่าสนใจ
              ดึงดูดลูกค้าด้วยคอนเทนต์ไวรัลและครีเอทีฟ ใช้เครื่องมือ AI
              ช่วยคิดสคริปต์/ตัดต่อ เพิ่มประสิทธิภาพ
              คุณไม่จำเป็นต้องเป็นมืออาชีพก็ทำได้
            </ToolCard>

            {/* Card 2: LINE OA */}
            <ToolCard
              delay={0.2}
              title="LINE OA"
              iconPath="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            >
              สร้างระบบดูแลลูกค้า ตอบคำถาม และให้ข้อมูลแบบมืออาชีพผ่าน LINE
              Official Account ใช้ง่าย ช่วยจัดการเนื้อหา เก็บข้อมูล
              ทำให้การสื่อสารเป็นเรื่องง่ายและรวดเร็ว
            </ToolCard>

            {/* Card 3: TELE SALE */}
            <ToolCard
              delay={0.3}
              title="TELE SALE"
              iconPath="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z"
            >
              คุณจะได้รับโปรเจกต์ภายใต้การพัฒนาด้วย AI
              และเทคนิคการสื่อสารทางโทรศัพท์เพื่อปิดการขายอย่างมีประสิทธิภาพ
              ไม่ต้องกังวลว่าจะพูดไม่เก่ง เพราะมีตัวช่วยที่ผ่านการทดลองมาแล้ว
            </ToolCard>

            {/* Card 4: BLOG */}
            <ToolCard
              delay={0.4}
              title="BLOG"
              iconPath="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            >
              การเป็น Blogger ท่องเที่ยวคือการแบ่งปันเรื่องราวประสบการณ์
              และแรงบันดาลใจในการเดินทางผ่านบทความ รูปภาพ และวิดีโอ
              เพื่อสร้างความน่าเชื่อถือและชุมชนของคุณเอง
            </ToolCard>
          </div>
        </div>
      </section>

      {/* === Exclusive Benefits Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--brand-orange)]">
              สิทธิประโยชน์เฉพาะท่านที่ผ่านการอบรมของบริษัทเท่านั้น
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              สิ่งที่คุณจะได้รับจากการเป็นส่วนหนึ่งของเรา SIAMSANTA PARTNER
              หากคุณสนใจที่จะก้าวสู่อาชีพอิสระในอุตสาหกรรมการท่องเที่ยว
              และผ่านการคัดเลือกทั่วประเทศ และมีสิทธิ์อิสระในการทำงาน
              นี่คือโอกาสสำคัญ มาร่วมเป็นส่วนหนึ่งของเราและสร้างสรรค์ประสบการณ์การเดินทางที่น่าประทับใจไปด้วยกัน
            </p>
            <p className="mt-4 font-bold text-lg text-red-600">
              **รับเฉพาะผู้ที่ผ่านการอบรมจากบริษัทฯ เท่านั้น**
            </p>
          </motion.div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                img: "/employee/benefit1.png",
                title: "Service 1",
                desc: "มีทีมงานผู้รู้เกี่ยวกับสินค้าและบริการพร้อมขายทันที",
                btn: "คอร์สเรียนอบรมพนักงาน",
              },
              {
                img: "/employee/benefit2.png",
                title: "Service 2",
                desc: "เฉพาะพนักงานขายมือโปร อนุญาตในนามขายสินค้าและบริการเท่านั้น",
                btn: "บัตรพนักงานขายอัจฉริยะ",
              },
              {
                img: "/employee/benefit3.png",
                title: "Service 3",
                desc: "เรียนรู้เพิ่มเติมความรู้เติบโต โอกาสในการขายสร้างรายได้ตลอด",
                btn: "การตลาดส่งเสริมการขาย",
              },
              {
                img: "/employee/benefit4.png",
                title: "Service 4",
                desc: "มีระบบหลังบ้านที่เพียบพร้อมค้าขายตลอด 24 ชั่วโมง",
                btn: "ระบบซอฟต์แวร์บริหาร/สินค้า",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="text-center flex flex-col items-center"
              >
                <div className="bg-white rounded-3xl shadow-lg w-full overflow-hidden">
                  <NextImage
                    src={c.img}
                    alt={c.title}
                    width={300}
                    height={200}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 text-white bg-[var(--brand-orange)]">
                    <h3 className="font-bold text-lg">{c.title}</h3>
                    <p className="text-sm mt-1 h-12">{c.desc}</p>
                  </div>
                </div>
                <div className="mt-[-20px] relative z-10 rounded-full shadow-md cursor-pointer px-6 py-3 font-semibold transition-colors bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-2)]">
                  {c.btn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === Regulations Section (Tabs) === */}
      <section className="bg-[var(--brand-white)] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50"
          >
            {/* Tabs */}
            <div className="flex">
              <button
                onClick={() => setActiveTab("regulations")}
                className={`flex-1 py-4 px-6 text-center font-semibold text-sm md:text-base transition-colors duration-300 focus:outline-none ${
                  activeTab === "regulations"
                    ? "bg-[var(--brand-orange)] text-white border-b-4"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2"
                }`}
                style={{
                  borderBottomColor:
                    activeTab === "regulations"
                      ? "rgba(0,0,0,0.25)"
                      : "rgba(229,231,235,1)",
                }}
              >
                ข้อบังคับสำหรับตำแหน่งขาย
              </button>
              <button
                onClick={() => setActiveTab("agreement")}
                className={`flex-1 py-4 px-6 text-center font-semibold text-sm md:text-base transition-colors duration-300 focus:outline-none ${
                  activeTab === "agreement"
                    ? "bg-[var(--brand-orange)] text-white border-b-4"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2"
                }`}
                style={{
                  borderBottomColor:
                    activeTab === "agreement"
                      ? "rgba(0,0,0,0.25)"
                      : "rgba(229,231,235,1)",
                }}
              >
                ข้อตกลงเหมาจ่ายค่าบริการทัวร์
              </button>
            </div>

            {/* Tab content */}
            <div className="p-6 md:p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeTab === "regulations" && (
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      เพื่อให้การทำงานร่วมกันเป็นไปอย่างราบรื่น โปร่งใส และมีประสิทธิภาพ
                      SIAMSANTA TRAVEL
                      ได้กำหนดข้อบังคับและแนวปฏิบัติสำหรับตัวแทนขายอิสระทุกท่าน ดังนี้ครับ:
                    </p>

                    <ul className="mt-6 space-y-3 list-disc list-outside pl-5 text-gray-600">
                      <li>การปฏิบัติตามกฎหมายและจรรยาบรรณธุรกิจนำเที่ยว</li>
                      <li>ห้ามนำข้อมูลลูกค้าไปใช้ในทางที่ผิดกฎหมาย</li>
                      <li>ต้องเข้าร่วมอบรมตามที่บริษัทกำหนดก่อนเริ่มงาน</li>
                    </ul>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ol className="mt-6 space-y-4 list-decimal list-outside pl-5 text-gray-600">
                            <li>
                              <span className="font-semibold text-[var(--brand-ink)]">
                                การปฏิบัติตามกฎหมายและจรรยาบรรณ (รายละเอียด)
                              </span>
                              <ul className="mt-2 space-y-2 list-disc list-outside pl-5 text-sm">
                                <li>
                                  คุณสมบัติเบื้องต้นของนายหน้า: ต้องผ่านเกณฑ์ตามที่กฎหมายกำหนด
                                  เช่น พระราชบัญญัติธุรกิจนำเที่ยวและมัคคุเทศก์ พ.ศ. 2551
                                  (และที่แก้ไขเพิ่มเติม) อย่างเคร่งครัด
                                </li>
                                <li>โดยเฉพาะเรื่องการโฆษณาและการจัดเก็บข้อมูลลูกค้า</li>
                              </ul>
                            </li>
                            <li>
                              <span className="font-semibold text-[var(--brand-ink)]">
                                ห้ามนำข้อมูลลูกค้าไปใช้ในทางที่ผิดกฎหมายหรือขัดต่อจรรยาบรรณ
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold text-[var(--brand-ink)]">
                                ต้องเข้าร่วมอบรมตามที่บริษัทกำหนดก่อนเริ่มงาน
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold text-[var(--brand-ink)]">
                                ปฏิบัติตามนโยบายการขายและการบริการลูกค้าอย่างเคร่งครัด
                              </span>
                            </li>
                          </ol>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {activeTab === "agreement" && (
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ข้อตกลงเหมาจ่ายค่าบริการทัวร์นี้มีวัตถุประสงค์เพื่อกำหนดรูปแบบการชำระเงิน
                      ความรับผิดชอบ และหลักเกณฑ์การให้บริการระหว่างบริษัทและลูกค้า
                      รวมถึงแนวทางปฏิบัติของพนักงานขายอิสระในการเสนอขายแพ็กเกจ
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        การเสนอราคาแบบเหมาจ่ายต้องรวมค่าใช้จ่ายหลักทั้งหมด
                        (ตั๋วเครื่องบิน/ที่พัก/รถ/ไกด์/อาหาร) ยกเว้นที่ระบุไว้เป็นข้อยกเว้น
                      </li>
                      <li>
                        การชำระเงินของลูกค้าต้องเป็นไปตามกำหนดงวด และมีเอกสารยืนยันทุกครั้ง
                      </li>
                      <li>
                        การยกเลิก/เลื่อนทริปเป็นไปตามนโยบายบริษัทและผู้ให้บริการปลายทาง
                      </li>
                      <li>
                        พนักงานขายอิสระต้องชี้แจงเงื่อนไขที่มีผลกับราคาอย่างชัดเจน โปร่งใส
                      </li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      *รายละเอียดฉบับสมบูรณ์จะถูกจัดเตรียมในรูปแบบเอกสารให้ผู้ที่ผ่านการอบรม*
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Expand/Collapse */}
              <div className="mt-8 text-right">
                <button
                  onClick={() => setIsExpanded((v) => !v)}
                  className="font-semibold hover:underline focus:outline-none text-[var(--brand-navy)]"
                >
                  {isExpanded ? "ย่อเงื่อนไขทั้งหมด -" : "ดูเงื่อนไขทั้งหมด +"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Income Opportunity Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight text-[var(--brand-ink)]">
              โอกาสสร้างรายได้ของคุณ (รายได้จริง) ยกตัวอย่าง
            </h2>
          </motion.div>

          <div className="mt-16 grid lg:grid-cols-2 gap-x-20 gap-y-12 items-center">
            {/* Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex justify-center"
            >
              <NextImage
                src="/employee/flow-circle.png"
                alt="แผนภาพโอกาสสร้างรายได้"
                width={500}
                height={500}
                className="object-contain"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-5 text-gray-600 text-base md:text-lg"
            >
              <p>
                ลองจินตนาการว่าคุณกำลังขายแพ็กเกจท่องเที่ยวต่างประเทศที่แพลตฟอร์มออนไลน์ที่บริษัทจัดให้
                ไม่ว่าจะเป็น TIKTOK, LINE OA, Blogger
              </p>
              <p>
                ด้วยการนำเสนอแพ็กเกจท่องเที่ยวต่างประเทศสุดพิเศษ
                คุณใช้ทักษะการนำเสนอที่น่าดึงดูดและความรู้ด้านการท่องเที่ยว
              </p>
              <p>
                ที่ได้รับการจากฝึกอบรมจาก SIAMSANTA TRAVEL
                บรรยายถึงความงดงามและประสบการณ์สุดเอ็กซ์คลูซีฟ
              </p>
              <p>
                ของการท่องเที่ยวต่างประเทศ ทำให้ลูกค้าสนใจแพ็กเกจท่องเที่ยวต่างประเทศจากคุณมากมาย
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Commission Table Section === */}
      <section className="bg-[var(--brand-white)] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--brand-ink)]">
              โอกาสสร้างรายได้ที่คุณจะได้รับ
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              ในธุรกิจขายแพ็กเกจทัวร์ต่างประเทศแบบ Join Group ทั่วโลก SIAMSANTA TRAVEL
              มอบส่วนแบ่งค่าคอมมิชชั่นให้คุณสูงถึง 300-500 บาท/แพ็กเกจ
              มาดูกันว่าคุณจะสร้างรายได้มากเท่าไรจากโอกาสนี้
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80 bg-blue-50/40"
          >
            <div className="grid grid-cols-10 gap-x-4 sm:gap-x-6 py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">
              <div className="col-span-4">รายละเอียดแพ็กเกจท่องเที่ยว</div>
              <div className="col-span-2 text-center">จำนวน</div>
              <div className="col-span-2 text-center">ค่าคอมมิชชั่น</div>
              <div className="col-span-2 text-right">รวมค่าคอม (บาท)</div>
            </div>

            <div className="text-sm text-gray-600">
              <div className="grid grid-cols-10 gap-x-4 sm:gap-x-6 items-center bg-white rounded-lg p-4 my-2 border border-gray-100">
                <div className="col-span-4">
                  ธุรกิจขายแพ็กเกจทัวร์ต่างประเทศแบบ Join Group (เอเชีย)
                </div>
                <div className="col-span-2 text-center">300 คน</div>
                <div className="col-span-2 text-center">300 บาท/คน</div>
                <div className="col-span-2 text-right font-bold text-base text-[var(--brand-navy)]">
                  90,000 บาท
                </div>
              </div>

              <div className="grid grid-cols-10 gap-x-4 sm:gap-x-6 items-center bg-white rounded-lg p-4 my-2 border border-gray-100">
                <div className="col-span-4">สินค้าและบริการที่เกี่ยวกับท่องเที่ยว</div>
                <div className="col-span-2 text-center">1000 ออเดอร์</div>
                <div className="col-span-2 text-center">100 บาท/ออเดอร์</div>
                <div className="col-span-2 text-right font-bold text-base text-[var(--brand-navy)]">
                  100,000 บาท
                </div>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-x-4 sm:gap-x-6 items-center mt-4 pt-4 border-t-2 border-dashed border-gray-300">
              <div className="col-span-8 text-right font-bold text-base text-[var(--brand-ink)]">
                รวมทั้งสิ้น
              </div>
              <div className="col-span-2 text-right font-bold text-xl text-red-600">
                190,000 บาท
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-bold text-[var(--brand-orange)]">
              หมายเหตุสำคัญ: การประเมินค่าคอมมิชชั่น
            </h3>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-sm leading-relaxed">
              โปรดทราบว่า ตารางประเมินค่าคอมมิชชั่นที่เรานำเสนอเป็นเพียงการประมาณการและตัวอย่างเพื่อแสดงศักยภาพในการสร้างรายได้เท่านั้น
              รายได้ที่แท้จริงของคุณจะขึ้นอยู่กับผลการทำงานและความขยันของแต่ละบุคคล
              คุณอาจมีรายได้มากกว่าหรือน้อยกว่านี้
              ขึ้นอยู่กับความสามารถในการสร้างความสัมพันธ์กับลูกค้าและความมุ่งมั่นในการทำงานของคุณ
            </p>
            <div className="mt-8">
              <button className="px-10 py-4 rounded-full shadow-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 text-white bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-2)]">
                โปรดอ่านทำความเข้าใจในเงื่อนไขสำคัญ
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Final CTA Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--brand-ink)]">
                ร่วมเป็นส่วนหนึ่งกับเรา
                <br />
                <span className="text-5xl md:text-6xl">SIAM SANTA</span>
              </h2>
              <div className="mt-4 h-1.5 w-24 rounded-full bg-amber-400" />
              <h3 className="mt-6 text-2xl font-bold text-[var(--brand-navy)]">
                สมัครเป็นพนักงานขายอิสระ–พนักงานฟรีแลนด์ WFH
              </h3>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  รับสมัครเฉพาะท่านที่ผ่านการฝึกอบรมพนักงานจากทางบริษัทฯ เท่านั้น
                  เพื่อรักษามาตรฐานและคุณภาพการทำงานที่เป็นเลิศ
                  ทางบริษัทขอสงวนสิทธิ์ในการรับสมัครเฉพาะผู้ที่ผ่านการฝึกอบรมจากหลักสูตรของบริษัทเท่านั้น
                </p>
                <p>
                  ผู้ที่ผ่านการฝึกอบรมจะได้รับความรู้และทักษะครบของบริษัท
                  พร้อมปล่อยของานได้จริง
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex justify-center"
            >
              <NextImage
                src="/employee/join.png"
                alt="พนักงาน Siam Santa Partner"
                width={500}
                height={400}
                className="rounded-xl shadow-2xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Key Features Section === */}
      <section className="bg-[var(--brand-white)] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Item 1 */}
            <KeyLine
              badge="เบอร์โทรศัพท์ สำหรับพนักงานขาย"
              badgeBg="bg-amber-400 text-gray-900"
            >
              คุณจะได้รับเบอร์โทรศัพท์สำหรับติดตอลูกค้าโดยเฉพาะ เพื่อใช้ในการดำเนินงาน
              Tele-sales และการสื่อสารอย่างมืออาชีพ
            </KeyLine>

            {/* Item 2 */}
            <KeyLine
              badge="แพ็กเกจท่องเที่ยว กว่า 10,000 แพ็กเกจ"
              badgeBg="bg-[var(--brand-navy)] text-white"
              delay={0.2}
            >
              คุณจะสามารถเข้าถึงแพ็กเกจท่องเที่ยวคุณภาพกว่า 10,000 แพ็กเกจทั่วโลก
              เพื่อเสนอแก่ลูกค้าได้อย่างหลากหลายและตอบทุกความต้องการ
            </KeyLine>

            {/* Item 3 */}
            <KeyLine
              badge="ระบบ ADMIN ตอบแชทช่วยปิดการขาย"
              badgeBg="bg-amber-400 text-gray-900"
              delay={0.3}
            >
              คุณจะทำงานร่วมกับระบบ Admin Support ที่พร้อมช่วยตอบแชท
              และสนับสนุนการปิดการขายเมื่อมีคำถามเชิงลึกหรือสถานการณ์ที่ต้องการการดูแลเป็นพิเศษ
            </KeyLine>

            {/* Item 4 */}
            <KeyLine
              badge="บัตรพนักงานพร้อมเน็ตเวิร์คปิดการขาย"
              badgeBg="bg-[var(--brand-navy)] text-white"
              delay={0.4}
            >
              คุณจะได้รับบัตรพนักงานเพื่อยืนยันตัวตน และรหัสการขายเฉพาะของคุณ
              เพื่อใช้ในการบันทึกยอดขายและติดตามผลงาน
            </KeyLine>
          </div>
        </div>
      </section>

      {/* === Thank You & Contact Section === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="flex flex-col gap-8 h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white border border-gray-200/80 rounded-xl p-8 flex-grow"
              >
                <h3 className="text-2xl font-bold text-[var(--brand-ink)]">
                  ร่วมเป็นทีมขายสินค้าและบริการกับเรา
                </h3>
                <div className="mt-4 space-y-4 text-gray-600">
                  <p>
                    Sales Freelance พนักงานขายอิสระสินค้าและบริการผลิตภัณฑ์ที่เกี่ยวการท่องเที่ยว
                  </p>
                  <p>
                    เรากำลังมองหา พนักงานอิสระ Sales Freelance (พนักงานขายอิสระ) ทั่วประเทศ
                    เพื่อมาร่วมเป็นส่วนหนึ่งในทีมขยายโอกาสทางธุรกิจท่องเที่ยวของเรา
                  </p>
                  <p>
                    สร้างรายได้แบบไร้ขีดจำกัด
                    คุณจะได้ใช้ทักษะแบบเต็มที่มาพร้อมกับทีมซัพพอร์ตขั้นเทพ
                    ช่วยคุณสมบัติส่วนตัวที่โดดเด่น และสนับสนุนการทำงานต่างๆ
                    ร่วมไปกับเราได้โดยไม่มีขีดจำกัด
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <NextImage
                  src="/employee/office-team.png"
                  alt="Siam Santa Partner Office"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-xl font-bold text-center bg-[var(--brand-orange)]/90 backdrop-blur-sm">
                  SIAMSANTA PARTNER อิสระสร้างรายได้จากการท่องเที่ยว
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full h-full min-h-[250px] bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center"
              >
                <NextImage
                  src="/partner/passport_plane.png"
                  alt="Passport and Airplane"
                  width={300}
                  height={300}
                  className="h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-16 bg-[var(--brand-orange)] rounded-full" />
                  <h2 className="text-5xl font-black tracking-tighter text-[var(--brand-navy)]">
                    THANK YOU
                  </h2>
                </div>

                <div className="mt-4 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-2 rounded-md flex-shrink-0">
                      <NextImage
                        src="/logodiamsantapartner.png"
                        alt="logo icon"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--brand-ink)]">
                        SIAMSANTA PARTNER
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        ขอขอบคุณทุกท่านเป็นอย่างยิ่งที่ให้ความสนใจเข้าร่วมเป็นส่วนหนึ่งของครอบครัว
                        SIAMSANTA PARTNER เรายินดีที่จะเติบโตและสนับสนุนให้คุณประสบความสำเร็จ
                        สร้างรายได้ที่ยั่งยืนและเติบโตไปพร้อมกับเรา
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-gray-700">
                    {/* สามารถใส่รายละเอียดการติดต่อจริงได้ที่นี่ */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold min-w-24">โทร:</span>
                      <a
                        href="tel:+6621204665"
                        className="hover:underline text-[var(--brand-navy)]"
                      >
                        +66 2 120 4665
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold min-w-24">LINE OA:</span>
                      <Link
                        href="https://lin.ee/"
                        className="hover:underline text-[var(--brand-navy)]"
                      >
                        @siamsantatravel
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold min-w-24">Facebook:</span>
                      <Link
                        href="https://facebook.com/"
                        className="hover:underline text-[var(--brand-navy)]"
                      >
                        SiamSanta Travel
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold min-w-24">อีเมล:</span>
                      <a
                        href="mailto:hello@siamsantapartner.com"
                        className="hover:underline text-[var(--brand-navy)]"
                      >
                        hello@siamsantapartner.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="#contact"
                      className="flex-1 py-2.5 px-4 rounded-lg font-bold text-center transition-colors bg-amber-400 text-gray-900 hover:bg-amber-500"
                    >
                      ติดต่อเซลล์
                    </Link>
                    <Link
                      href="#apply"
                      className="flex-1 py-2.5 px-4 rounded-lg font-bold text-center transition-colors text-white bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-2)]"
                    >
                      สมัครพนักงานขายอิสระ
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ---------- Small, typed subcomponents ---------- */

const ToolCard: React.FC<{
  delay?: number;
  title: string;
  iconPath: string;
  children: React.ReactNode;
}> = ({ delay = 0, title, iconPath, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="h-full flex flex-col border rounded-2xl p-8 border-[var(--brand-orange)]"
  >
    <div className="w-12 h-12 text-[var(--brand-orange)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <h3 className="mt-6 text-xl font-bold text-[var(--brand-ink)]">{title}</h3>
    <p className="mt-2 text-gray-600 flex-grow">{children}</p>
  </motion.div>
);

const KeyLine: React.FC<{
  badge: string;
  badgeBg: string; // e.g. 'bg-amber-400 text-gray-900' or 'bg-[var(--brand-navy)] text-white'
  delay?: number;
  children: React.ReactNode;
}> = ({ badge, badgeBg, delay = 0.1, children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col md:flex-row items-center gap-6"
  >
    <div className="w-full md:w-auto flex-shrink-0">
      <div
        className={`font-bold text-center px-6 py-4 rounded-full shadow-md w-full md:w-80 ${badgeBg}`}
      >
        {badge}
      </div>
    </div>
    <div className="hidden md:block h-1 w-12 bg-gray-200 rounded-full" />
    <div className="w-full">
      <p className="p-4 text-gray-600 rounded-xl bg-gray-100">{children}</p>
    </div>
  </motion.div>
);

export default FreelancePage;
