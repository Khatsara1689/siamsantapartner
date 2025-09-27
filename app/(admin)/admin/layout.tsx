import AdminSidebar from "@/components/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <AdminSidebar />
      </div>
      <section className="md:col-span-9 space-y-6">{children}</section>
    </div>
  )
}
