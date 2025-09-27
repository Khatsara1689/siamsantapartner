// file: app/about/page.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * ใส่ไฟล์ภาพลงใน public:
 * /public/about/hero_bg.jpg            (ภาพฮีโร่)
 * /public/about/office.jpg             (ภาพออฟฟิศ/ทีม)
 * /public/about/partner-presenting.jpg (ภาพพรีเซนต์พาร์ทเนอร์)
 * /public/about/team-meeting.jpg       (ภาพวิสัยทัศน์ผู้บริหาร)
 *
 * หากคุณมีไฟล์ชื่ออื่นอยู่แล้ว เช่น hero_team.png, tablet_sale.png, tablet_sale2.png, meeting_room.png
 * ให้เปลี่ยนชื่อไฟล์หรือแก้ src ด้านล่างให้ตรงกับไฟล์จริงใน /public/about/
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7, delay } },
});

const AboutPage: FC = () => {
  return (
    <div className="bg-white">
      {/* === Hero Section === */}
      <section className="relative h-[460px] md:h-[560px] flex items-end justify-center text-white text-center pb-14 md:pb-20 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/about/hero_team.png"
          alt="ทีมงาน Siamsanta Travel"
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />

        {/* Content */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            ความเป็นมาของ <span className="text-[#ea8c2e]">Siamsanta Travel</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90">
            จากทีมผู้เชี่ยวชาญด้านญี่ปุ่น สู่แพลตฟอร์มท่องเที่ยวออนไลน์ครบวงจร
          </p>
        </motion.div>
      </section>

      {/* === Section 2: Story & Vision === */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
            {/* Left: Copy */}
            <motion.div {...fadeUp(0.1)}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Siamsanta Travel
              </h2>
              <p className="mt-2 text-xl font-semibold text-[#ea8c2e]">
                จากผู้เชี่ยวชาญสู่ผู้นำตลาด
              </p>

              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Siamsanta Travel เกิดจากความหลงใหลในการท่องเที่ยวญี่ปุ่นและประสบการณ์ตรงของทีมผู้บริหาร
                  เราเริ่มจากการเป็นผู้เชี่ยวชาญเส้นทางญี่ปุ่น เข้าใจวัฒนธรรม รายละเอียด และความต้องการของลูกค้าไทยอย่างลึกซึ้ง
                  จึงสามารถออกแบบบริการที่แตกต่างและเติบโตอย่างมั่นคงในตลาดพรีเมียม
                </p>

                <h3 className="text-2xl font-bold text-gray-900 pt-4">
                  ผสาน “ความเชี่ยวชาญ” กับ “ดิจิทัล” เพื่อการเติบโต
                </h3>
                <p>
                  เราใช้จุดแข็งด้านคอนเทนต์และการสื่อสารออนไลน์ ผสานเข้ากับหลังบ้านที่แข็งแรง
                  ตั้งแต่ระบบจอง โปรแกรมทัวร์ ไปจนถึงระบบพาร์ทเนอร์/แฟรนไชส์
                  เพื่อส่งมอบประสบการณ์ที่ราบรื่นทั้งฝั่งลูกค้าและคู่ค้า
                  ภายใต้มาตรฐานการบริการที่เป็นมืออาชีพ และแนวคิดแบบ E-commerce สมัยใหม่
                </p>
              </div>
            </motion.div>

            {/* Right: Image + Caption */}
            <motion.div {...fadeUp(0.2)}>
              <div className="w-full">
                <Image
                  src="/about/tablet_sale.png"
                  alt="บรรยากาศทีมงาน Siamsanta"
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-xl w-full h-auto object-cover"
                />

                <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
                  <p className="font-bold text-lg text-gray-900">
                    ความไว้วางใจจากองค์กรชั้นนำ
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    เราได้รับความเชื่อมั่นให้จัดกรุ๊ปทัวร์ สัมมนา และดูงานทั้งในและต่างประเทศ
                    สะท้อนมาตรฐานการดำเนินงานที่โปร่งใส ตรงเวลา และดูแลแบบมืออาชีพ
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Section 3: Join Us === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
            {/* Left: Image */}
            <motion.div {...fadeIn(0.1)}>
              <Image
                src="/about/tablet_sale2.png"
                alt="ร่วมเติบโตไปกับ Siamsanta Travel"
                width={1200}
                height={1400}
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>

            {/* Right: Copy */}
            <motion.div {...fadeUp(0.2)} className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  มาร่วมสร้างอนาคตในธุรกิจท่องเที่ยวไปกับเรา
                </h2>
                <p className="mt-3 text-gray-700">
                  โอกาสสำหรับผู้ที่มองหาธุรกิจที่ยืดหยุ่น ลงทุนไม่หนัก และเติบโตได้จริงด้วยระบบหลังบ้านที่พร้อม
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  จุดเด่นสำหรับพาร์ทเนอร์/แฟรนไชส์
                </h3>
                <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                  <li>อิสระและยืดหยุ่น: ทำงานจากที่บ้าน ไม่ต้องสต็อกสินค้า ไร้ภาระขนส่ง</li>
                  <li>รายได้เติบโตตามผลงาน: โครงสร้างคอมมิชชั่นโปร่งใส ปรับสเกลได้</li>
                  <li>เครื่องมือพร้อม: ระบบจอง คอนเทนต์การตลาด และทีมโค้ชชิ่งคอยสนับสนุน</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  อนาคตของธุรกิจท่องเที่ยว
                </h3>
                <p className="mt-3 text-gray-700">
                  เรามุ่งสร้างเครือข่ายที่ยั่งยืนบนฐานเทคโนโลยีและมาตรฐานบริการระดับองค์กร
                  เพื่อให้คู่ค้าทุกคนเติบโตได้อย่างมั่นคงในระยะยาว
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">โอกาสที่ไม่เหมือนใคร</h3>
                <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                  <li>อุตสาหกรรมกำลังฟื้นตัวและขยายตัวต่อเนื่อง</li>
                  <li>มีที่ปรึกษามืออาชีพช่วยวางระบบและกลยุทธ์ตั้งแต่เริ่มต้น</li>
                  <li>ทำงานร่วมกับทีมที่เชี่ยวชาญ พร้อมซัพพอร์ตทุกรายละเอียด</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Section 4: Executive Vision === */}
      <section className="bg-white py-16 sm:py-24">
        <motion.div
          {...fadeUp(0.1)}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#ea8c2e]">
              วิสัยทัศน์ผู้บริหาร Siamsanta Travel
            </h2>
            <p className="mt-4 max-w-4xl mx-auto text-lg text-gray-700">
              เป็น “แพลตฟอร์มท่องเที่ยวออนไลน์ครบวงจร” ที่สร้างประสบการณ์การเดินทางไร้รอยต่อ
              และเปิดโอกาสทางธุรกิจที่ยั่งยืนให้กับทุกคน
            </p>
          </div>

          <div className="mt-12">
            <Image
              src="/about/meeting_room.png"
              alt="ทีมผู้บริหารกำหนดวิสัยทัศน์"
              width={1600}
              height={900}
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* === Section 5: Our Commitment === */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0.1)} className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              เรามุ่งมั่นในการเติบโตอย่างมั่นคง
            </h2>

            <div className="mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-3 text-left">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg text-[#ea8c2e]">
                  นวัตกรรมดิจิทัลเป็นหัวใจ
                </h3>
                <p className="mt-3 text-gray-700">
                  เราพัฒนาระบบให้ใช้งานง่าย ปลอดภัย และเข้าถึงได้จากทุกอุปกรณ์
                  เพื่อประสบการณ์ที่ดีที่สุดของลูกค้าและคู่ค้า
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg text-[#ea8c2e]">โอกาสทางธุรกิจที่ยั่งยืน</h3>
                <p className="mt-3 text-gray-700">
                  เราไม่ได้เป็นเพียงบริษัททัวร์ แต่คือแพลตฟอร์มที่ช่วยให้ผู้ประกอบการอิสระเริ่มต้นและเติบโต
                  ด้วยระบบหลังบ้านและโครงสร้างรายได้ที่ชัดเจน
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg text-[#ea8c2e]">มาตรฐานบริการมืออาชีพ</h3>
                <p className="mt-3 text-gray-700">
                  ใส่ใจทุกรายละเอียด ตั้งแต่การให้คำปรึกษา วางแผนเส้นทาง ไปจนถึงการดูแลระหว่างเดินทาง
                  เพื่อความประทับใจและความสบายใจของลูกค้าทุกท่าน
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto space-y-4 text-gray-700">
              <p>
                เราเชื่อว่าการเดินทางคือการสร้างประสบการณ์และแรงบันดาลใจที่มีคุณค่า
                และเราพร้อมเป็นส่วนหนึ่งในการทำให้การเดินทางของคุณ “ง่าย ปลอดภัย และพรีเมียม”
              </p>
              <p>
                หากคุณกำลังมองหาพาร์ทเนอร์ด้านท่องเที่ยวที่ไว้ใจได้
                <span className="font-semibold"> Siamsanta Travel</span> คือคำตอบ
                ที่พร้อมเติบโตไปกับคุณในทุกเส้นทาง
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
