// prisma/seed.ts
import {
  PrismaClient,
  Role,
  ArticleStatus,
  EnrollmentStatus,
  OrderStatus,
} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

function formatOrderCode() {
  return `SSP-${Date.now()}`
}

async function main() {
  console.log("🔥 Seeding minimal data (TS)...")

  // --- ลบข้อมูลเดิม (เฉพาะ dev) ---
  await prisma.payment.deleteMany()
  await prisma.order.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.section.deleteMany()
  await prisma.course.deleteMany()
  await prisma.article.deleteMany()
  await prisma.user.deleteMany()

  // 1) Users
  const admin = await prisma.user.create({
    data: {
      email: "admin@siamsanta.com",
      name: "Admin",
      role: Role.ADMIN,
      phone: "020000000",
      avatarUrl: null,
      memberId: null,
    },
  })

  const student = await prisma.user.create({
    data: {
      email: "student@siamsanta.com",
      name: "Student Demo",
      role: Role.STUDENT,
      phone: "0890000000",
      avatarUrl: null,
      memberId: null,
    },
  })

  // 1.1) สร้างรหัสผ่าน (hash) สำหรับ login ด้วย Credentials Provider
  const studentHash = await bcrypt.hash("123456", 10)
  await prisma.password.create({
    data: { userId: student.id, hash: studentHash },
  })

  // (ถ้าต้องการให้ admin login ได้ด้วย)
  const adminHash = await bcrypt.hash("123456", 10)
  await prisma.password.create({
    data: { userId: admin.id, hash: adminHash },
  })

  // 2) Article ตัวอย่าง
  await prisma.article.create({
    data: {
      slug: "welcome-to-siamsanta-partner",
      title: "ยินดีต้อนรับสู่ SiamSanta Partner",
      summary: "พรีวิวระบบคอร์สและคู่มือพาร์ทเนอร์",
      content: "นี่คือบทความตัวอย่างสำหรับทดสอบหน้าบทความ",
      status: ArticleStatus.PUBLISHED,
      authorId: admin.id,
      publishedAt: new Date(),
    },
  })

  // 3) Courses (+ Sections + Lessons)
  const courseA = await prisma.course.create({
    data: {
      slug: "japan-private-standard",
      title: "เที่ยวญี่ปุ่นส่วนตัว – STANDARD",
      subtitle: "เริ่มต้นสัมผัสญี่ปุ่นส่วนตัวแบบคุ้มค่า",
      description:
        "คอร์สตัวอย่างสำหรับทดสอบระบบเรียน—มีวิดีโอบทนำและบทเรียนสั้น ๆ",
      thumbnail:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80&auto=format&fit=crop",
      isPublished: true,
      price: 14900,
      sections: {
        create: [
          {
            title: "แนะนำหลักสูตร",
            order: 1,
            lessons: {
              create: [
                {
                  title: "ยินดีต้อนรับ",
                  order: 1,
                  freePreview: true,
                  content: "เนื้อหาแนะนำคอร์สและภาพรวม",
                  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
                {
                  title: "ภาพรวมการเดินทาง",
                  order: 2,
                  freePreview: false,
                  content: "อธิบายเส้นทางโดยรวม",
                },
              ],
            },
          },
          {
            title: "เตรียมตัวก่อนเดินทาง",
            order: 2,
            lessons: {
              create: [
                {
                  title: "เอกสารและวีซ่า",
                  order: 1,
                  freePreview: false,
                  content: "รายการเอกสารและคำแนะนำ",
                },
                {
                  title: "สิ่งของที่ควรเตรียม",
                  order: 2,
                  freePreview: false,
                  content: "รายการของจำเป็น",
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      sections: { include: { lessons: true } },
    },
  })

  await prisma.course.create({
    data: {
      slug: "japan-private-premium",
      title: "เที่ยวญี่ปุ่นส่วนตัว – PREMIUM",
      subtitle: "ประสบการณ์สุดพรีเมียม",
      description:
        "คอร์สตัวอย่างลำดับที่สองสำหรับทดสอบ Grid และหน้า enrollments",
      thumbnail:
        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&q=80&auto=format&fit=crop",
      isPublished: true,
      price: 29900,
      sections: {
        create: [
          {
            title: "บทนำ Premium",
            order: 1,
            lessons: {
              create: [
                { title: "ยินดีต้อนรับสู่ Premium", order: 1, freePreview: true },
                { title: "พาเที่ยวเบื้องต้น", order: 2, freePreview: false },
              ],
            },
          },
        ],
      },
    },
  })

  // 4) Enrollment (ให้ student ลง courseA)
  const enrollmentA = await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: courseA.id,
      status: EnrollmentStatus.ACTIVE,
    },
  })

  // 5) Order (PAID) + Payment และผูกกับ Enrollment
  const order = await prisma.order.create({
    data: {
      code: formatOrderCode(),
      userId: student.id,
      amount: courseA.price,
      status: OrderStatus.PAID,
      currency: "THB",
      provider: "mock",
      providerRef: "mock_txn_001",
    },
  })

  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: courseA.price,
      method: "qr",            // "card" | "qr" | "transfer"
      status: "succeeded",     // "succeeded" | "failed" | "pending"
      providerRef: "mock_payment_001",
    },
  })

  await prisma.enrollment.update({
    where: { id: enrollmentA.id },
    data: { orderId: order.id },
  })

  // 6) Progress (ติ๊กบทแรกให้สำเร็จ)
  const firstLessonId = courseA.sections?.[0]?.lessons?.[0]?.id ?? null
  if (firstLessonId) {
    await prisma.progress.create({
      data: { userId: student.id, lessonId: firstLessonId, isDone: true },
    })
  }

  console.log("✅ Seed completed.")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
