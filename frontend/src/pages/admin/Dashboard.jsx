"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

// Mock data for dashboard
const salesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 1500 },
  { month: "Apr", sales: 2200 },
  { month: "May", sales: 2800 },
  { month: "Jun", sales: 2400 },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", date: "2023-05-15", total: 850, status: "completed" },
  { id: "ORD-002", customer: "Jane Smith", date: "2023-05-14", total: 320, status: "processing" },
  { id: "ORD-003", customer: "Robert Johnson", date: "2023-05-13", total: 650, status: "completed" },
  { id: "ORD-004", customer: "Emily Davis", date: "2023-05-12", total: 420, status: "shipped" },
  { id: "ORD-005", customer: "Michael Brown", date: "2023-05-11", total: 980, status: "processing" },
]

const lowStockItems = [
  { id: 1, name: "Terracotta Vase", stock: 2, threshold: 5 },
  { id: 6, name: "Mug Set", stock: 3, threshold: 5 },
  { id: 8, name: "Artisanal Plate", stock: 1, threshold: 5 },
]

function Dashboard() {
  const [period, setPeriod] = useState("week")

  // Format price
  const formatPrice = (price) => {
    return `${price} MAD`
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 p-2 sm:p-2 md:p-4 lg:p-8 ">
        <h1 className="text-2xl font text-[#B9703E] semibold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className=" text-sm">Total Sales</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-2xl font-semibold">12,500 MAD</p>
            <p className="text-sm  mt-2">Last 30 days</p>
          </div>

          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className=" text-sm">Orders</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+8.2%</span>
            </div>
            <p className="text-2xl font-semibold">48</p>
            <p className="text-sm  mt-2">Last 30 days</p>
          </div>

          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className=" text-sm">Customers</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+5.3%</span>
            </div>
            <p className="text-2xl font-semibold">32</p>
            <p className="text-sm  mt-2">Last 30 days</p>
          </div>

          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className=" text-sm">Avg. Order Value</h3>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">-2.1%</span>
            </div>
            <p className="text-2xl font-semibold">260 MAD</p>
            <p className="text-sm  mt-2">Last 30 days</p>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-[#B9703E] font-semibold">Sales Overview</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setPeriod("week")}
                className={`border border-[#B9703E] px-3 py-1 text-sm rounded-md ${period === "week" ? "bg-[#B9703E] text-white" : "bg-[#F0E4CF]"}`}
              >
                Week
              </button>
              <button
                onClick={() => setPeriod("month")}
                className={`border border-[#B9703E] px-3 py-1 text-sm rounded-md ${period === "month" ? "bg-[#B9703E] text-white" : "bg-[#F0E4CF]"}`}
              >
                Month
              </button>
              <button
                onClick={() => setPeriod("year")}
                className={`border border-[#B9703E] px-3 py-1 text-sm rounded-md ${period === "year" ? "bg-[#B9703E] text-white" : "bg-[#F0E4CF]"}`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-orange-50 rounded-lg flex items-center justify-center">
            <div className="flex space-x-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 bg-[#B9703E] rounded-t-sm" style={{ height: `${data.sales / 30}px` }}></div>
                  <span className="text-xs mt-1">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg text-[#B9703E] font-semibold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-white px-2 py-1 rounded-md bg-[#B9703E] text-sm hover:bg-[#8A9A5B] transition-colors duration-200">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs  border-b">
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-b-0">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">{formatPrice(order.total)}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg text-[#B9703E]  font-semibold">Low Stock Alert</h2>
              <Link to="/admin/products" className="text-white px-2 py-1 rounded-md bg-[#B9703E] text-sm hover:bg-[#8A9A5B] transition-colors duration-200">
                Manage Inventory
              </Link>
            </div>

            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-red-600">
                        Only {item.stock} left (Threshold: {item.threshold})
                      </p>
                    </div>
                    <Link
                      to={`/admin/products/${item.id}`}
                      className="px-3 py-1 text-sm text-white bg-[#8A9A5B]/70 border border-gray-300 rounded-md hover:bg-[#8A9A5B] transition-colors duration-200"
                    >
                      Update
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 ">No low stock items</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
