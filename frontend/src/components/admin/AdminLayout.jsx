import { Outlet } from "react-router-dom"
import { AdminLayoutProvider, useAdminLayout } from "./AdminLayoutContext"
import AdminSidebar from "./AdminSidebar"

function LayoutContent() {
  const { isCollapsed } = useAdminLayout()

  return (
    <div className="min-h-screen bg-[#F0E4CF]/30">
      <AdminSidebar />
      <main className={`transition-all duration-300 p-6 ${isCollapsed ? "ml-20" : "ml-64"}`}>
        <Outlet />
      </main>
    </div>
  )
}

export default function AdminLayout() {
  return (
    <AdminLayoutProvider>
      <LayoutContent />
    </AdminLayoutProvider>
  )
}
