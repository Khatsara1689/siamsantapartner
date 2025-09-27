import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!post || post.status !== "PUBLISHED") return notFound()

  return (
    <article className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.publishedAt && (
          <p className="text-sm text-slate-500">
            เผยแพร่ {new Date(post.publishedAt).toLocaleDateString("th-TH")}
          </p>
        )}
      </header>

      {post.coverImage && (
        <img src={post.coverImage} alt="" className="w-full max-h-[420px] object-cover rounded-2xl border" />
      )}

      <div className="prose max-w-none prose-p:leading-7 prose-img:rounded-xl"
           dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
