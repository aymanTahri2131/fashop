import { Routes, Route } from "react-router-dom"
import Dashboard from "../../pages/admin/Dashboard"
import AdminLayout from "./AdminLayout"
import Products from "../../pages/admin/Products"
import Orders from "../../pages/admin/Orders"
import Customers from "../../pages/admin/Customers"
import Testimonials from "../../pages/admin/Testimonials"
import Settings from "../../pages/admin/Settings"

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminRoutes
