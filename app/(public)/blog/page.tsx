import Link from "next/link"
import { prisma } from "@/lib/db"
import { motion } from "framer-motion"

export const dynamic = "force-dynamic"

export default async function BlogListPage() {
  const posts = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { id: true, slug: true, title: true, summary: true, coverImage: true, publishedAt: true },
  })

  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 bg-[--brand-navy]/5 border border-[--brand-navy]/10">
        <h1 className="text-2xl font-bold">บทความล่าสุด</h1>
        <p className="text-slate-600 text-sm">สาระความรู้และอัปเดตจาก SiamSanta Partner</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <motion.div key={p.id} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border bg-white">
            <Link href={`/blog/${p.slug}`}>
              {p.coverImage ? (
                <img src={p.coverImage} alt="" className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-slate-100" />
              )}
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">{p.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{p.summary}</p>
                {p.publishedAt && (
                  <div className="text-xs text-slate-500 mt-2">
                    เผยแพร่ {new Date(p.publishedAt).toLocaleDateString("th-TH")}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
