"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogNewPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    coverImage: "",
    status: "DRAFT",
  });
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="หัวข้อ"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="slug (a-z-0-9)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="รูปปก URL"
        value={form.coverImage}
        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
      />
      <textarea
        className="border p-2 w-full h-36"
        placeholder="สรุปสั้น"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />
      <textarea
        className="border p-2 w-full h-60"
        placeholder="เนื้อหา HTML/Markdown"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <div className="flex gap-2">
        <select
          className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
        <button className="px-4 py-2 rounded-xl bg-[--brand-orange] text-white hover:opacity-90 active:scale-[.98]">
          บันทึก
        </button>
      </div>
    </form>
  );
}
