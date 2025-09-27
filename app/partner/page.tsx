// file: app/partner/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type FeatureCard = {
  imageSrc: string;
  title: string;
  description: string;
};

const featureCards: FeatureCard[] = [
  {
    imageSrc: "/partner/spec_1.png",
    title: "ปลอดภัยจากการลงทุนแบบกำหนด",
    description:
      "ให้คุณทำงานผ่านคอมพิวเตอร์ทุกฤดูกาล สร้าง Passive Income ต่อเนื่อง ยืดหยุ่นตัดสินใจจากยอดขาย และเป็นไปตามผลงานที่วัดผลเชิงลึก ช่วยปลดล็อคโอกาสที่ไกลและสร้างความมั่นคงภายใต้เงื่อนไขเริ่มต้น",
  },
  {
    imageSrc: "/partner/spec_2.png",
    title: "สิทธิพิเศษเหนือระดับ",
    description:
      "ส่วนลดและสิทธิประโยชน์ด้านการเดินทางในราคาพาร์ทเนอร์ 5-25% พร้อมบริการครอบคลุมสำหรับพาร์ทเนอร์ท่องเที่ยว สร้างความคุ้มค่าและความประทับใจให้กับทั้งคุณและลูกค้า",
  },
  {
    imageSrc: "/partner/spec_3.png",
    title: "เริ่มต้นง่าย...สร้างทีมทันที",
    description:
      "ลงทุนเริ่มต้นเพียง 100,000 บาท/ทีม ไม่จำกัดจำนวน ไม่ต้องสต็อกสินค้า ระบบและทีมพร้อมซัพพอร์ตให้เริ่มต้นธุรกิจได้ทันที",
  },
  {
    imageSrc: "/partner/spec_4.png",
    title: "ทีมทุนต่ำ...สำเร็จทันใจ",
    description:
      "ลงทุนอย่างชาญฉลาด ก้าวข้ามผ่าน ระบบหลังบ้านเช่าหรือเว็บไซต์ราคาสูง เรามีทีมงานคอยช่วยเหลือแบบครบวงจร ช่วยลดต้นทุนแอบแฝง และเพิ่มโอกาสทำกำไร",
  },
  {
    imageSrc: "/partner/spec_5.png",
    title: "เป็นใครอย่างเป็นทางการไปกับเรา",
    description:
      "ทีมเอเจนซี่โลคอลสู่เอเจนซี่สากล ประกอบธุรกิจอย่างครบวงจร การปฏิทิน และการตลาดออนไลน์ให้กับบริษัทคุณ ช่วยยกระดับธุรกิจอย่างโปร่งใส",
  },
  {
    imageSrc: "/partner/spec_6.png",
    title: "เปิดโลกธุรกิจ...ไร้ขีดจำกัด",
    description:
      "แพลตฟอร์มสินค้าและบริการครอบคลุมทั้งตั๋วเครื่องบิน โรงแรม กิจกรรม และแพ็กเกจทั่วโลก พร้อมซอฟต์แวร์เอเย่นทัวร์ระดับสากล",
  },
];

const PartnerPage: React.FC = () => {
  return (
    <main className="bg-white text-[var(--brand-ink)]">
      {/* ใส่ตัวแปรสีให้พร้อมใช้งานทั้งหน้า (ย้ายไป globals.css ได้) */}
      <style jsx global>{`
        :root {
          --brand-navy: #1a237e;
          --brand-navy-2: #17206b;
          --brand-white: #ffffff;
          --brand-orange: #ea8c2e;
          --brand-orange-2: #d6791e;
          --brand-ink: #0f172a;
          --brand-muted: #cfd3dc;
          --brand-blue: #2563eb; /* เสริมสำหรับปุ่มสีน้ำเงิน */
          --brand-dark-blue: #0b1437; /* เสริมสำหรับแถบปิดท้าย */
        }
      `}</style>

      {/* === Section 1: Hero (FIXED) === */}
      <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/partner/intro_team.png"
            alt="Siam Santa Partner Office"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-20 px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            ร่วมเป็นพาร์ทเนอร์กับเรา
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-white/90">
            เติบโตอย่างยั่งยืนไปพร้อมกับครอบครัวสยามซานต้าพาร์ทเนอร์
          </p>
        </motion.div>
      </section>

      {/* === Section 2: Introduction === */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                SIAMSANTA
                <br />
                PARTNER
              </h2>
              <p className="mt-4 text-base font-semibold tracking-wider text-[var(--brand-orange)]">
                SIAM SANTAA GROUP COMPANY LIMITED
              </p>
              <div className="mt-6 space-y-5 text-gray-600 leading-relaxed">
                <p>
                  คุณกำลังมองหาโอกาสในการสร้างรายได้ที่ไม่ปิดกั้น?
                  พร้อมสัมผัสประสบการณ์การเดินทางที่สุดพิเศษใหม่
                </p>
                <p>
                  โลกของการท่องเที่ยวเปิดกว้างอยู่เสมอ
                  และเราเชื่อมั่นว่าด้วยประสบการณ์และความเชี่ยวชาญของ SiamSanta
                  Group ผนวกกับความมุ่งมั่นของคุณ
                  เราจะสามารถก้าวสู่ความสำเร็จร่วมกันได้อย่างยั่งยืน
                </p>
                <p>
                  ขอเชิญคุณมาเป็นส่วนหนึ่งของครอบครัว Travel Partner
                  ภายใต้การกำกับดูแลของ SiamSanta Group Co., LTD
                  ที่พร้อมจะมอบโอกาสใหม่ๆ สร้างอิสระด้านการเงินที่ไม่ยึดโยงใคร
                  และส่งต่อความสุขจากการเดินทางให้กับผู้คนทั่วโลก
                </p>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <Image
                src="/partner/intro_team2.png"
                alt="ทีมงาน SIAMSANTA PARTNER"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <p className="mt-4 text-center text-sm text-gray-600 italic">
                ขอเชิญคุณมาเป็นส่วนหนึ่งของครอบครัว Travel Partner
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Section 3: Why Partner With Us === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"
            >
              <Image
                src="/partner/why_people.png"
                alt="ทีมงาน SIAMSANTA PARTNER ในเครื่องแบบ"
                width={900}
                height={1080}
                sizes="(min-width:1024px) 500px, 100vw"
                className="rounded-xl w-full h-auto object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                ทำไมต้องเป็น <br />
                <span className="text-[var(--brand-orange)]">
                  SIAMSANTA PARTNER
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-800">
                โอกาสนี้เหมาะสำหรับผู้ที่คุณสมบัติดังต่อไปนี้
              </p>
              <p className="mt-6 text-gray-600">
                เรามิได้มีควบคุมแบบบริษัทฯ
                แต่ควบคุมส่วนร่วมเป็นส่วนหนึ่งอาชีพที่ฟรีแลนซ์รับ
                ด้วยระบบสนับสนุนครบวงจร ความเชี่ยวชาญของทีม
                และเครือข่ายพันธมิตรระดับโลก
                คุณจะได้รับเครื่องมือและโอกาสในการเติบโตอย่างเป็นรูปธรรม
              </p>
              <p className="mt-4 text-gray-600">
                โอกาสนี้สำหรับผู้ที่มองหาความมั่นคง
                พร้อมสร้างธุรกิจท่องเที่ยวระดับโลกไปด้วยกัน อย่างเป็นมาตรฐาน
                และเป้าหมายร่วมกับทีมเวิร์คในอาชีพ
              </p>
              <ul className="mt-8 space-y-4 text-gray-600 list-disc list-inside">
                <li>
                  ทีมงานที่มีความชำนาญและมีประสบการณ์จริงในอุตสาหกรรมท่องเที่ยว
                </li>
                <li>
                  ระบบและเครื่องมือพร้อมใช้งาน เป็นโซลูชั่นบ้าน-ซัพพอร์ต ระยะยาว
                </li>
                <li>
                  เครือข่ายซัพพลายเออร์ครอบคลุม ทั้งตั๋วเครื่องบิน โรงแรม
                  และกิจกรรมท่องเที่ยวทั่วโลก
                </li>
                <li>
                  ผลประโยชน์ที่คุ้มค่า โปร่งใส:
                  คอมมิชชั่นและสิทธิพิเศษด้านการเดินทาง
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Section 4: Specialists Grid === */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
              SIAMSANTA PARTNER
            </h2>
            <p className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-1 text-[var(--brand-orange)]">
              specialists
            </p>
          </motion.div>

          <div className="mt-20 grid gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col text-center"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      width={1000}
                      height={600}
                      sizes="(min-width:1024px) 400px, 100vw"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11/12">
                      <div className="text-white text-sm font-semibold py-2.5 px-4 rounded-full shadow-md text-balance text-center bg-[var(--brand-orange)]">
                        {card.title}
                      </div>
                    </div>
                  </div>
                  <div className="pt-12 pb-6 px-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === Section 5: Financial Stability === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white rounded-2xl border-2 p-6 sm:p-8 shadow-xl border-[var(--brand-orange)]">
            {/* Image */}
            <div className="w-full">
              <Image
                src="/partner/office_wide.png"
                alt="บรรยากาศออฟฟิศ SIAMSANTA PARTNER"
                width={1600}
                height={800}
                sizes="100vw"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-bold tracking-tight">
                ความมั่นคงทางการเงิน: บทพิสูจน์ที่ทำให้คุณเชื่อใจ
              </h3>
              <p className="mt-4 max-w-4xl mx-auto text-gray-600">
                เราทุกคนกำลังมองหาความเชื่อมั่นในการร่วมลงทุน
                เราจึงมีตัวเลขที่สะท้อนถึงความมั่นคงและความน่าเชื่อถือของ
                SiamSanta Group Co., LTD
                ซึ่งเป็นภาพพิสูจน์ถึงศักยภาพและอนาคตที่ชัดเจน
              </p>

              <div className="mt-6 text-left w-full mx-auto bg-gray-50 p-6 rounded-lg border">
                <ul className="space-y-4 text-gray-700 list-disc list-inside">
                  <li>
                    เรามีรายได้และเงินทุนหมุนเวียนในบริษัทสุทธิ{" "}
                    <strong className="text-gray-900">
                      30,000,000 บาทต่อเดือน
                    </strong>{" "}
                    (สามสิบล้านบาทต่อเดือน)
                  </li>
                  <li>
                    ตลอดระยะเวลา 1 ปีที่ผ่านมา
                    บริษัทมีเงินทุนหมุนเวียนรวมมากกว่า{" "}
                    <strong className="text-gray-900">100 ล้านบาท</strong>{" "}
                    (หนึ่งร้อยล้านบาทต่อปี)
                  </li>
                </ul>
              </div>

              <p className="mt-6 max-w-4xl mx-auto text-gray-600">
                ตัวเลขเหล่านี้เป็นเครื่องยืนยันหลักฐานทางการเงินที่ใส
                และความแข็งแกร่งทางการเงินของเรา
                เราพร้อมจะสนับสนุนให้พาร์ทเนอร์ของเราพัฒนาและเติบโตได้อย่างมั่นคง
                อย่าพลาดโอกาสทองของคุณในการร่วมเติบโตไปกับเราที่พร้อมขับเคลื่อนธุรกิจท่องเที่ยวระดับโลกให้เติบโตได้ไม่หยุด
                มาร่วมลงทุนกับ Travel Partner โดย SiamSanta Group
                และสร้างอนาคตที่มั่นคงไปด้วยกัน
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === Section 6: Business Opportunity === */}
      <section className="bg-white py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
              โอกาสในการร่วมธุรกิจ
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Laptop Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="bg-gray-50/70 p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/partner/laptop.png"
                  alt="หน้าเว็บไซต์ตัวอย่าง"
                  width={1200}
                  height={800}
                  sizes="(min-width:1024px) 800px, 100vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Stacked images */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <div className="bg-gray-50/70 p-4 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/partner/team.png"
                    alt="ทีมงานออฟฟิศ"
                    width={1000}
                    height={700}
                    sizes="(min-width:1024px) 500px, 100vw"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="bg-gray-50/70 p-4 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex justify-center items-center">
                  <Image
                    src="/logodiamsantapartner.png"
                    alt="Siamsanta Partner Logo"
                    width={300}
                    height={100}
                    className="object-contain h-auto w-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              Travel Partner เหมาะกับใคร: โอกาสทองสำหรับนักลงทุน
            </h3>
            <div className="mt-6 space-y-5 text-gray-600 leading-relaxed">
              <p>
                Travel Partner โดย SiamSanta Group
                คือโอกาสทางธุรกิจที่ไม่ซับซ้อน
                เหมาะสำหรับผู้บริโภคที่พร้อมเติบโตไปในอุตสาหกรรมท่องเที่ยวไปกับเราอย่างก้าวกระโดด
                คุณแค่ค้นหาตัวตนเจอเท่านั้น ลงทุนอย่างมั่นใจ
              </p>
              <p>
                ผู้ที่ต้องการอิสระภาพจากค่าใช้จ่ายระยะยาว ไม่ว่างานเกษียณ
                หรือเตรียมลงทุนเป็นนายหน้าเฉพาะทาง ทั้งการบริหารจัดการองค์กร
                และการทำบัญชีจะถูกเก็บเป็นความลับในอุตสาหกรรมที่แข็งแกร่ง
                ไม่ต้องมีออฟฟิศ-พนักงานในนามบริษัทศูนย์ Travel Partner
                ส่งผลให้คุณไม่ต้องแบกรับภาระธุรกิจที่อาจเกิดวิกฤตระหว่างประเทศได้ทันที
                ด้วยเงินลงทุนเริ่มต้นเพียง 100,000 บาท
                พร้อมโปรแกรมสร้างผลตอบแทนที่เป็นกรรมธรรม์และชัดเจน
              </p>
              <p>
                ผู้ที่สนใจในการบริหารธุรกิจและจัดการองค์กรบนพื้นที่โซเชียลมีเดีย
                ทำธุรกิจทัวร์-ท่องเที่ยวและรองรับการเดินทางไปกับอาชีพ
                ที่ปรึกษาอิสระที่พร้อมขยายตลาดรองรับลูกค้าโลก Travel Partner
                พร้อมผลตอบแทนส่วนแบ่งโบนัสพิเศษตั้งแต่ 2-5%
                สำหรับการเดินทางของคุณและลูกค้า
              </p>
              <p>
                ผู้ที่ต้องการขยายเครือข่ายและสร้างรายได้อย่างถูกสุขลักษณะ
                ลูกค้าอยู่กับคุณค่ามิใช่แค่ราคา พร้อมข้อมูลที่อยู่ในมือแล้ว
                โอกาสที่จะช่วยต่อยอดการหารายได้เกิดขึ้นอย่างง่ายดาย
                ด้วยเครื่องมือสื่อสารการตลาด เปิดทางรอดให้มี
                และทำงานช่วยเหลือดังหัวใจ
              </p>
              <p>
                ผู้ที่ต้องการองค์กรที่โปร่งใสและเติบโตไปด้วยกัน:
                เราให้ความสำคัญกับความโปร่งใสและผลประโยชน์ที่เป็นธรรม
                พร้อมรายงานผลการดำเนินงานอย่างสม่ำเสมอ
                เพื่อให้คุณเติบโตไปในทิศทางขององค์กร
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Section 7: Benefits & Returns === */}
      <section className="bg-sky-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
              ผลตอบแทนที่คุ้มค่า
            </h2>
            <p className="mt-2 text-xl font-semibold text-[var(--brand-navy)]">
              สิทธิประโยชน์สำหรับผู้ถือหุ้นพาร์ทเนอร์กับเรา
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600">
              การร่วมเป็นพาร์ทเนอร์กับ Travel Partner
              คือการลงทุนที่ให้ผลตอบแทนคุ้มค่า และมั่นคง
              ด้วยสิทธิประโยชน์ที่โดดเด่นและโปร่งใส
              เพื่อให้เห็นว่าของคุณทำงานสร้างความมั่งคั่งอย่างแท้จริง
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Orange card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="rounded-2xl p-8 flex flex-col bg-[var(--brand-orange)] text-white"
            >
              <h3 className="text-2xl font-bold">รับเงินปันผลรายเดือน</h3>
              <p className="text-lg font-semibold opacity-90">
                สร้าง Passive Income อย่างต่อเนื่อง
              </p>
              <p className="mt-4 text-sm opacity-90">
                คุณจะได้รับเงินปันผลรายเดือนจากผลกำไรสุทธิของธุรกิจหลังหักค่าใช้จ่าย
                โดยจ่ายทุกวันที่ 25 ของเดือนครบรอบ หลังจากถือหุ้นครบ 1 ปี
              </p>
              <ul className="mt-6 space-y-3 list-disc list-inside text-sm font-semibold flex-grow">
                <li>
                  3% ต่อปี สำหรับมูลค่าหุ้นรวม{" "}
                  <strong>100,000 - 1,000,000</strong> บาท
                </li>
                <li>
                  5% ต่อปี สำหรับมูลค่าหุ้นรวม{" "}
                  <strong>1,100,000 - 4,100,000</strong> บาท
                </li>
                <li>
                  10% ต่อปี สำหรับมูลค่าหุ้นรวม <strong>10,000,000</strong>{" "}
                  บาทขึ้นไป
                </li>
              </ul>
              <p className="mt-6 text-sm opacity-95">
                โอกาสในการสร้างรายได้แบบ Passive Income
                ที่ช่วยเติมเต็มความมั่นคงให้กับคุณทุกเดือน
              </p>
            </motion.div>

            {/* Blue card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="rounded-2xl p-8 flex flex-col text-white bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-2)]"
            >
              <h3 className="text-2xl font-bold">
                ส่วนลดสูงสุดสำหรับการเดินทาง
              </h3>
              <p className="text-lg font-semibold opacity-90">
                เปิดประสบการณ์โลกกว้างในราคาสุดพิเศษ
              </p>
              <p className="mt-4 text-sm opacity-90">
                ในฐานะพาร์ทเนอร์ของเรา
                คุณจะได้รับสิทธิพิเศษในการเดินทางกับเครือข่ายของ SiamSanta Group
                Co., LTD (เงื่อนไขเป็นไปตามที่บริษัทกำหนด) ทั้งตั๋วเครื่องบิน
                โรงแรม และกิจกรรม
              </p>
              <ul className="mt-6 space-y-3 list-disc list-inside text-sm font-semibold flex-grow">
                <li>
                  ส่วนลดการเดินทาง <strong>5-20%</strong>{" "}
                  สำหรับทริปบริการทัวร์รายการ
                </li>
                <li>เข้าถึงดีลพิเศษช่วงพีคและช่วงโลว์ซีซั่นก่อนใคร</li>
                <li>
                  วางแผนทริปได้คุ้มค่ากว่าเดิม
                  ให้คุณและครอบครัวท่องเที่ยวได้บ่อยขึ้น
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Section 8: Referral Opportunity === */}
      <section className="bg-[var(--brand-orange)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Text */}
            <div className="text-center">
              <h2 className="text-xl font-bold tracking-wider">
                โอกาสสร้างรายได้จากการแนะนำ
              </h2>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                ขยายโอกาสทางการขายของคุณ
              </p>
              <p className="mt-4 max-w-3xl mx-auto text-white/90">
                เพิ่มช่องทางการสร้างรายได้ง่าย ๆ
                เพียงคุณแนะนำเพื่อนและบุคคลอื่นมาจองแพ็กเกจท่องเที่ยวของเรา
                หากมีการปิดการขายได้ คุณจะได้รับค่าคอมมิชชั่น{" "}
                <strong className="font-bold">5%</strong>{" "}
                จากผลกำไรหลังหักครบทริปแรกทันที—อีกช่องทางที่ช่วยให้คุณสร้างรายได้เพิ่มได้อย่างอิสระและไร้ขีดจำกัด
              </p>
            </div>

            {/* Image */}
            <div className="mt-12">
              <Image
                src="/partner/office_wide2.png"
                alt="Business meeting at Siamsanta Partner"
                width={1600}
                height={800}
                sizes="100vw"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Section 9: Final CTA === */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl bg-[var(--brand-orange)]">
                <Image
                  src="/partner/passport_plane.png"
                  alt="Passport and airplane model"
                  width={1200}
                  height={1200}
                  sizes="(min-width:1024px) 500px, 100vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-orange)]">
                ร่วมเป็นพาร์ทเนอร์ธุรกิจท่องเที่ยวระดับโลก
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ร่วมลงทุนกับ Travel Partner โดย SiamSanta Group
                ก้าวสู่ความเป็นมืออาชีพอย่างยั่งยืน
                การตัดสินใจร่วมลงทุนกับเราคือค้าสำคัญที่จะนำคุณไปสู่โลกโอกาสที่เติบโต
                ผลตอบแทนที่คุ้มค่า และการสนับสนุนจากทีมมืออาชีพ
                เราพร้อมช่วยคุณสร้างความสำเร็จไปด้วยกัน
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://line.me/R/ti/p/@YOUR_LINE_ID"
                  target="_blank"
                  className="font-bold px-8 py-3 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-2)]"
                >
                  ติดต่อแอดมิน
                </Link>
                <Link
                  href="mailto:partner@siamsantagroup.com?subject=ขอรับข้อมูล%20SIAMSANTA%20Partner"
                  className="font-bold px-8 py-3 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-navy-2)]"
                >
                  รับข้อมูลอีเมลเพิ่มเติม
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Final CTA Banner (แทนฟอร์ม) === */}
      <section className="bg-[var(--brand-dark-blue)]">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left text */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-[var(--brand-orange)]">
                SIAMSANTA PARTNER:
                ร่วมเป็นพาร์ทเนอร์ธุรกิจท่องเที่ยววันนี้รับสิทธิพิเศษมากมาย
              </h2>
              <p className="mt-1 text-base text-white/90">
                ที่เหลือเราจัดการให้
                เปิดโอกาสทางธุรกิจที่คุณคุ้มค่าและปลอดภัยที่สุดในยุคดิจิทัล
              </p>
            </div>

            {/* Right contacts */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <p className="text-lg font-bold text-white">ติดต่อสอบถาม</p>
              <Link
                href="https://line.me/R/ti/p/@YOUR_LINE_ID"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
                aria-label="LINE"
              >
                <Image
                  src="/icons/icon-line.png"
                  alt="LINE"
                  width={48}
                  height={48}
                />
              </Link>
              <Link
                href="http://m.me/siamsantaajapantour"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook Messenger"
              >
                <Image
                  src="/icons/icon-messenger.png"
                  alt="Facebook Messenger"
                  width={48}
                  height={48}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnerPage;
