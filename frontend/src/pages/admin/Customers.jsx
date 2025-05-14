"use client"

import React, { useEffect, useState } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { fetchUsers } from "../../api/api";
import { toast } from "react-toastify"

// Mock data for customers
const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+212 600 123 456",
    location: "Casablanca, Morocco",
    orders: 5,
    totalSpent: 2450,
    lastOrder: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+212 600 789 012",
    location: "Rabat, Morocco",
    orders: 2,
    totalSpent: 820,
    lastOrder: "2023-05-14",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+212 600 345 678",
    location: "Marrakech, Morocco",
    orders: 3,
    totalSpent: 1250,
    lastOrder: "2023-05-13",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+212 600 901 234",
    location: "Tangier, Morocco",
    orders: 1,
    totalSpent: 420,
    lastOrder: "2023-05-12",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+212 600 567 890",
    location: "Fes, Morocco",
    orders: 4,
    totalSpent: 1780,
    lastOrder: "2023-05-11",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+212 600 234 567",
    location: "Agadir, Morocco",
    orders: 2,
    totalSpent: 890,
    lastOrder: "2023-05-10",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+212 600 890 123",
    location: "Casablanca, Morocco",
    orders: 6,
    totalSpent: 3200,
    lastOrder: "2023-05-09",
  },
  {
    id: 8,
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    phone: "+212 600 456 789",
    location: "Marrakech, Morocco",
    orders: 3,
    totalSpent: 1450,
    lastOrder: "2023-05-08",
  },
]

function Customers() {
  const [customers, setCustomers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetchUsers();
        if (response.data && response.data.length > 0) {
          setCustomers(response.data);
        } else {
          toast.info("No customers found.");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers. Please try again.");
      }
    };
  
    fetchCustomers();
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0
    if (sortField === "name") {
      comparison = a.firstName.localeCompare(b.firstName)
    } else if (sortField === "email") {
      comparison = a.email.localeCompare(b.email);
    }
    return sortDirection === "asc" ? comparison : -comparison
  })

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Format price
  const formatPrice = (price) => {
    return `${price} MAD`
  }

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 w-full p-2 sm:p-2 md:p-4 lg:p-8">
        <h1 className="text-2xl font-semibold mb-6 text-[#B9703E]">Customers</h1>

        {/* Search */}
        <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-[#F0E4CF] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th
                    className="px-6 py-3 text-sm font-semibold uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === "name" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "transform rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">is Admin</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white font-medium">
                {sortedCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.shipping?.city || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.isAdmin ? "Yes" : "No"}</td>
                    <td className=" flex items-center justify-center px-6 py-4 ">
                      <button
                        onClick={() => viewCustomerDetails(customer)}
                        className="text-gray-600 hover:text-black transition-colors duration-300 mt-3"
                      >
                        <MdOutlineRemoveRedEye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedCustomers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F0E4CF] rounded-lg w-full max-w-2xl p-6 pl-8 sm:pl-8 lg:pl-4 m-8 sm:m-8 lg:m-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#B9703E]">Customer Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-[#B9703E]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-md font-semibold mb-2">Customer Information</h3>
                <p className="text-gray-600">{selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                <p className="text-gray-600">{selectedCustomer.email}</p>
                <p className="text-gray-600">{selectedCustomer.phone}</p>
                <p className="text-gray-600">{selectedCustomer.shipping?.city || "N/A"}</p>
              </div>
              {/* <div>
                <h3 className="text-md font-semibold mb-2">Order Statistics</h3>
                <p className="text-gray-600">Total Orders: {selectedCustomer.orders}</p>
                <p className="text-gray-600">Total Spent: {formatPrice(selectedCustomer.totalSpent)}</p>
                <p className="text-gray-600">Last Order: {selectedCustomer.lastOrder}</p>
                <p className="text-gray-600">
                  Average Order Value: {formatPrice(Math.round(selectedCustomer.totalSpent / selectedCustomer.orders))}
                </p>
              </div> */}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#B9703E] text-white rounded-md hover:bg-[#8A9A5B] transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers
