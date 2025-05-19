"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { fetchOrders, updateOrderStatus as updateOrderStatusAPI } from "../../api/api";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders(); // Appel à l'API pour récupérer les commandes
        setOrders(response.data); // Mettre à jour l'état avec les commandes récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        toast.error("Impossible de charger les commandes");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format price
  const formatPrice = (price, currency, isEuro, isGbp) => {
    if (currency === "usd" && isEuro === true) {
      return `${price * 10.3} MAD`
    } else if (currency === "usd" && isGbp === true) {
      return `${price * 12.3} MAD`
    } else if (currency === "usd" && isEuro === false) {
      return `${price * 9.4} MAD`
    } else {
      return `${price} MAD`
    }
  }

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatusAPI(orderId, newStatus); // Appel à l'API
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
      setIsModalOpen(false);
      toast.success(`Le statut de la commande ${orderId} a été mis à jour en ${newStatus}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la commande :", error);
      toast.error("Impossible de mettre à jour le statut de la commande");
    }
  };

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 w-full p-2 sm:p-2 md:p-4 lg:p-8">
        <h1 className="text-2xl font-semibold text-[#B9703E] mb-6">Orders</h1>

        {/* Filters */}
        <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B9703E]"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B9703E]"
              >
                <option value="all">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <p className="text-center text-gray-500 py-4">Chargement des commandes...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F0E4CF] text-left">
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatPrice(order.total, order.currency, order.isEuro, order.isGbp)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap">
                        <button onClick={() => viewOrderDetails(order)} className=" hover:text-[#B9703E] transition-colors duration-300">
                          < MdOutlineRemoveRedEye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F0E4CF] rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden m-8 sm:m-8 lg:m-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#B9703E] font-semibold">Order Details : {selectedOrder._id}</h2>
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
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <p className="font-medium text-gray-700">{selectedOrder.customer}</p>
                <p className="font-medium text-gray-700">{selectedOrder.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                <p className="font-medium text-gray-700">Date: {selectedOrder.date}</p>
                <p className="font-medium text-gray-700">Payment Method: {selectedOrder.payment}</p>
                <p className="font-medium text-gray-700">
                  Status:{" "}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <p className="font-medium text-gray-700">{selectedOrder.shipping.address}</p>
              <p className="font-medium text-gray-700">
                {selectedOrder.shipping.city}, {selectedOrder.shipping.postalCode}
              </p>
              <p className="font-medium text-gray-700">{selectedOrder.shipping.country}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              <div className="border rounded-md overflow-x-auto">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-[#B9703E]/70 text-left">
                      <th className="px-4 py-2 text-md font-semibold">Product</th>
                      <th className="px-4 py-2 text-md font-semibold">Price</th>
                      <th className="px-4 py-2 text-md font-semibold">Quantity</th>
                      <th className="px-4 py-2 text-md font-semibold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-gray-700 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-gray-700 text-sm">{formatPrice(item.price, selectedOrder.currency, selectedOrder.isEuro, selectedOrder.isGbp)}</td>
                        <td className="px-4 py-2 text-gray-700 text-sm">{item.quantity}</td>
                        <td className="px-4 py-2 text-gray-700 text-sm text-right">{formatPrice(item.price * item.quantity, selectedOrder.currency, selectedOrder.isEuro, selectedOrder.isGbp)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-[#B9703E]/40">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-right font-medium">
                        Total
                      </td>
                      <td className="px-4 py-2 text-right font-medium">{formatPrice(selectedOrder.total, selectedOrder.currency, selectedOrder.isEuro, selectedOrder.isGbp)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-4">Update Status</h3>
                <div className="flex space-x-2">
                  <div>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder._id, "processing")}
                      className={`px-3 py-1 text-xs rounded-md mr-0 sm:mr-0 md:mr-2 mb-2 sm:mb-2 md:mb-0 ${selectedOrder.status === "processing" ? "bg-blue-100 text-blue-800" : "bg-gray-100 hover:bg-blue-50"}`}
                    >
                      Processing
                    </button>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder._id, "shipped")}
                      className={`px-3 py-1 text-xs rounded-md ${selectedOrder.status === "shipped" ? "bg-purple-100 text-purple-800" : "bg-gray-100 hover:bg-purple-50"}`}
                    >
                      Shipped
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder._id, "completed")}
                      className={`px-3 py-1 text-xs rounded-md mr-0 sm:mr-0 md:mr-2 mb-2 sm:mb-2 md:mb-0 ${selectedOrder.status === "completed" ? "bg-green-100 text-green-800" : "bg-gray-100 hover:bg-green-50"}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder._id, "cancelled")}
                      className={`px-3 py-1 text-xs rounded-md ${selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-gray-100 hover:bg-red-50"}`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#B9703E]/90 mt-6 text-white px-3 py-1 rounded-md hover:bg-[#8A9A5B] transition-colors duration-300"
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

export default Orders
