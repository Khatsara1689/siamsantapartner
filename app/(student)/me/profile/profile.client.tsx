"use client";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateProfileAction, updatePasswordAction } from "./profile.server";

type Me = {
  id: number;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  role: "ADMIN" | "STUDENT";
  createdAt: string | Date;
  phone?: string | null;
  memberId?: string | null;
  cardIssuedAt?: string | Date | null;
  cardExpiredAt?: string | Date | null;
};
type Stats = { enroll: number; completed: number; progressPct: number };

export default function ProfileView({ me, stats }: { me: Me; stats: Stats }) {
  const [tab, setTab] = useState<"profile" | "security">("profile");
  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-[var(--brand-navy)]/6 to-white pb-14">
      {/* Banner */}
      <section className="relative h-48 md:h-56">
        <div className="absolute inset-0 bg-[var(--brand-navy)]">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_20%_-10%,rgba(255,255,255,0.25),transparent)]" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-4 pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
              โปรไฟล์ของฉัน
            </h1>
            <p className="text-white/90 mt-1">{me.email}</p>
          </div>
        </div>
      </section>

      {/* Card header */}
      <section className="-mt-8 md:-mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-xl border overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <AvatarBadge name={me.name ?? ""} src={me.avatarUrl ?? ""} />
              <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                <Stat label="ลงทะเบียนคอร์ส" value={stats.enroll} />
                <Stat label="เรียนจบ (บทเรียน)" value={stats.completed} />
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">ความคืบหน้า</span>
                  <div className="mt-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${stats.progressPct}%` }}
                      className="h-full bg-[var(--brand-orange)] transition-[width]"
                    />
                  </div>
                  <span className="text-xs mt-1 text-slate-500">
                    {stats.progressPct}%
                  </span>
                </div>
              </div>
              <RoleBadge role={me.role} />
            </div>

            {/* Tabs */}
            <div className="px-6 md:px-8 border-t bg-white">
              <div className="flex gap-4">
                <TabButton
                  active={tab === "profile"}
                  onClick={() => setTab("profile")}
                >
                  โปรไฟล์
                </TabButton>
                <TabButton
                  active={tab === "security"}
                  onClick={() => setTab("security")}
                >
                  ความปลอดภัย
                </TabButton>
              </div>
            </div>

            {/* Tab content */}
            <div className="p-6 md:p-8 bg-white">
              {tab === "profile" ? <ProfileForm me={me} /> : <SecurityForm />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- small components ---------- */
function AvatarBadge({ name, src }: { name: string; src?: string }) {
  const initials =
    (name || "?")
      .trim()
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "?";
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-slate-100">
        {src ? (
          <Image alt={name} src={src} fill className="object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-xl font-bold text-slate-500">
            {initials}
          </div>
        )}
      </div>
      <div>
        <div className="text-xl font-bold">{name || "ยังไม่ตั้งชื่อ"}</div>
        <div className="text-xs text-slate-500">แก้ไขข้อมูลส่วนตัวด้านล่าง</div>
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border p-3 text-center hover:shadow-sm transition">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}
function RoleBadge({ role }: { role: "ADMIN" | "STUDENT" }) {
  const label = role === "ADMIN" ? "ผู้ดูแลระบบ" : "สมาชิก";
  return (
    <div className="ml-auto">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        <span
          className={`w-2 h-2 rounded-full ${
            role === "ADMIN" ? "bg-emerald-500" : "bg-blue-500"
          }`}
        />
        {label}
      </span>
    </div>
  );
}
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition ${
        active
          ? "border-[var(--brand-orange)] text-[var(--brand-orange)]"
          : "border-transparent text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Profile Form ---------- */
function ProfileForm({ me }: { me: Me }) {
  const router = useRouter();
  const isAdmin = me.role === "ADMIN";

  const [name, setName] = useState(me.name ?? "");
  const [avatarUrlInput, setAvatarUrlInput] = useState(me.avatarUrl ?? "");
  const [phone, setPhone] = useState<string>(me.phone ?? "");
  const [memberId, setMemberId] = useState<string>(
    me.memberId ?? `ONLINE-NP${String(me.id).padStart(6, "0")}`
  );
  const [issuedAt, setIssuedAt] = useState<string>(
    me.cardIssuedAt
      ? new Date(me.cardIssuedAt as any).toISOString().slice(0, 10)
      : ""
  );
  const [expiredAt, setExpiredAt] = useState<string>(
    me.cardExpiredAt
      ? new Date(me.cardExpiredAt as any).toISOString().slice(0, 10)
      : ""
  );

  const [saving, start] = useTransition();
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // upload preview
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    me.avatarUrl ?? ""
  );
  useEffect(() => {
    if (!avatarFile) return;
    const objUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objUrl);
    return () => URL.revokeObjectURL(objUrl);
  }, [avatarFile]);
  useEffect(() => {
    if (!avatarFile) setAvatarPreview(avatarUrlInput || "");
  }, [avatarUrlInput, avatarFile]);

  async function fileToDataUrl(file: File): Promise<string> {
    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  const onSave = () => {
    setOk(null);
    setErr(null);
    start(async () => {
      const avatarDataUrl = avatarFile ? await fileToDataUrl(avatarFile) : null;

      // ถ้าไม่ใช่ Admin → ไม่ส่งฟิลด์ที่ควบคุมโดยแอดมิน
      const payload: any = {
        name,
        phone: phone || null,
        avatar: avatarDataUrl ?? (avatarUrlInput || null),
      };
      if (isAdmin) {
        payload.memberId = memberId;
        payload.cardIssuedAt = issuedAt || null;
        payload.cardExpiredAt = expiredAt || null;
      }

      const res = await updateProfileAction(payload);

      if (res.ok) {
        setOk("บันทึกโปรไฟล์เรียบร้อย ✅");
        router.refresh();
      } else {
        setErr(res.message || "บันทึกไม่สำเร็จ");
      }
    });
  };

  return (
  <div className="space-y-4 md:space-y-6">
    {/* แถวอัปโหลดรูป (อยู่นอกกริด) */}
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-200 shrink-0">
        {avatarPreview ? <Image src={avatarPreview} alt="avatar" fill className="object-cover" /> : null}
      </div>
      <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
        <input type="file" accept="image/*" onChange={(e)=>setAvatarFile(e.target.files?.[0] ?? null)} className="hidden" />
        <span className="rounded-lg border px-3 py-2 hover:bg-gray-50">เลือกรูปจากเครื่อง</span>
        <span className="text-xs text-slate-500">(PNG/JPG ≤ 5MB)</span>
      </label>
    </div>

    {/* กริด 2 คอลัมน์: ซ้าย (ฟอร์มถึงวันหมดอายุ) + ขวา (การ์ด) */}
    <div className="grid md:grid-cols-2 gap-6 items-stretch">
      <div className="space-y-4">
        <FloatingInput label="ลิงก์รูปโปรไฟล์ (URL)" value={avatarUrlInput} onChange={setAvatarUrlInput} placeholder="https://..." />
        <FloatingInput label="ชื่อที่แสดง" value={name} onChange={setName} placeholder="ชื่อ-นามสกุล" />
        <FloatingInput label="เบอร์โทร" value={phone} onChange={setPhone} placeholder="เช่น 0891234567" type="tel" />
        <FloatingInput label="รหัสนักเรียน (ID)" value={memberId} onChange={setMemberId}
          placeholder="เช่น ONLINE-NP000123" disabled={!isAdmin}
          hint={!isAdmin ? "แก้ไขได้เฉพาะผู้ดูแลระบบ" : undefined}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput label="วันออกบัตร" type="date" value={issuedAt} onChange={setIssuedAt} disabled={!isAdmin} />
          <FloatingInput label="วันหมดอายุ" type="date" value={expiredAt} onChange={setExpiredAt} disabled={!isAdmin} />
        </div>
      </div>

      {/* การ์ดสูงเท่าคอลัมน์ซ้าย */}
      <StudentCardPreview
        className="h-full"
        avatarPreview={avatarPreview}
        name={name || "ชื่อที่แสดง"}
        email={me.email || "-"}
        phone={phone || "กรอกเบอร์โทร"}
        memberId={memberId || "-"}
        issuedAt={issuedAt}
        expiredAt={expiredAt}
      />
    </div>

    {/* ปุ่มบันทึก + ข้อความ (อยู่นอกกริด) */}
    <div className="pt-1">
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-orange)] text-white px-5 py-2.5 font-semibold disabled:opacity-60 hover:opacity-90 transition"
      >
        {saving ? "กำลังบันทึก..." : "บันทึก"}
      </button>
      {ok && <p className="text-emerald-600 text-sm mt-2">{ok}</p>}
      {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
    </div>
  </div>
);
}

/* ---------- Security ---------- */
function SecurityForm() {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [saving, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const onSave = () => {
    setMsg(null);
    if (pass1.length < 8) return setMsg("รหัสผ่านอย่างน้อย 8 ตัวอักษร");
    if (pass1 !== pass2) return setMsg("รหัสผ่านไม่ตรงกัน");
    start(async () => {
      const res = await updatePasswordAction({ newPassword: pass1 });
      setMsg(
        res.ok ? "อัปเดตรหัสผ่านแล้ว ✅" : res.message || "อัปเดตไม่สำเร็จ"
      );
      setPass1("");
      setPass2("");
    });
  };

  return (
    <div className="max-w-lg space-y-4">
      <FloatingInput
        label="รหัสผ่านใหม่"
        type="password"
        value={pass1}
        onChange={setPass1}
        placeholder="อย่างน้อย 8 ตัวอักษร"
      />
      <FloatingInput
        label="ยืนยันรหัสผ่านใหม่"
        type="password"
        value={pass2}
        onChange={setPass2}
        placeholder="พิมพ์ซ้ำอีกครั้ง"
      />
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-xl bg-slate-900 text-white px-5 py-2.5 font-semibold disabled:opacity-60 hover:bg-black transition"
      >
        {saving ? "กำลังบันทึก..." : "อัปเดตรหัสผ่าน"}
      </button>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}
    </div>
  );
}

/* ---------- UI helpers ---------- */
function FloatingInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  hint?: string;
}) {
  const active = value.length > 0;
  return (
    <label className="relative block">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`peer w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-[var(--brand-orange)] outline-none ${
          disabled ? "bg-slate-50 text-slate-400 cursor-not-allowed" : ""
        }`}
      />
      <span
        className={`pointer-events-none absolute left-3 px-1 bg-white text-xs transition-all ${
          active
            ? "-top-2 text-[var(--brand-orange)]"
            : "top-3.5 text-slate-400"
        }`}
      >
        {label}
      </span>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </label>
  );
}

/* ---------- Student Card Preview ---------- */
function StudentCardPreview({
  className,
  avatarPreview,
  name,
  email,
  phone,
  memberId,
  issuedAt,
  expiredAt,
}: {
  className?: string;
  avatarPreview?: string;
  name: string;
  email: string;
  phone: string;
  memberId: string;
  issuedAt?: string;
  expiredAt?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl border border-slate-300 bg-white shadow-[0_6px_24px_rgba(2,6,23,0.08)]",
        "overflow-hidden flex flex-col", // ให้ยืดสูง
        className || "",
      ].join(" ")}
    >
      {/* Header เหลืองแบบการ์ดตัวอย่าง */}
      <div className="bg-[#F4C542] px-6 py-3">
        <h3 className="text-[20px] md:text-[22px] font-extrabold tracking-wide text-slate-900 uppercase">
          STUDENT CARD
        </h3>
      </div>

      {/* เนื้อการ์ด */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-[104px_12px_1fr] gap-5">
          {/* กล่องรูปโปรไฟล์แบบมุมโค้ง + ขอบอ่อน */}
          <div className="col-span-1">
            <div className="rounded-[18px] border-2 border-slate-200 bg-slate-50 p-2 shadow-sm w-[120px] h-[120px]">
              <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-white">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
                    NO PHOTO
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* คอลัมน์เครื่องหมาย : */}
          <div className="col-span-1"></div>

          {/* ข้อมูล */}
          <div className="col-span-1 space-y-1.5 text-[15px] leading-7">
            <Row k="Name" v={name} strong />
            <Row k="ID" v={memberId} />
            <Row k="E-MAIL" v={email} />
            <Row k="TEL" v={phone} />
            <Row k="Issued" v={issuedAt ? formatDate(issuedAt) : "-"} />
            <Row k="Expired" v={expiredAt ? formatDate(expiredAt) : "-"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  strong = false,
}: {
  k: string;
  v: string;
  strong?: boolean;
}) {
  return (
    <div className="grid grid-cols-[96px_12px_1fr]">
      <div className="text-slate-600">{k}</div>
      <div className="text-slate-700">:</div>
      <div
        className={
          strong
            ? "font-extrabold text-slate-900"
            : "font-semibold text-slate-800"
        }
      >
        {v}
      </div>
    </div>
  );
}

function formatDate(isoLike: string) {
  // "YYYY-MM-DD" → "DD-MM-YYYY"
  const [y, m, d] = isoLike.split("-");
  return `${d}-${m}-${y}`;
}
