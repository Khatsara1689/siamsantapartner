import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
    const MAX = 5 * 1024 * 1024;
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "อนุญาตเฉพาะ JPG/PNG/WebP" }, { status: 400 });
    if (file.size > MAX) return NextResponse.json({ error: "ไฟล์ใหญ่เกิน 5MB" }, { status: 400 });

    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

    const dir = path.join(process.cwd(), "public", "uploads", "avatars");
    await mkdir(dir, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, name), buf);

    return NextResponse.json({ url: `/uploads/avatars/${name}` });
  } catch (e) {
    console.error("upload error", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
