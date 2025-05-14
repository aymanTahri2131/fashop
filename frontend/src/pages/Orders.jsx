import React, { useEffect, useState } from "react";
import { fetchOrdersByUser } from "../api/api";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchOrdersByUser(user._id); // Assurez-vous que l'API est correcte
        console.log("Fetched orders:", response.data); // Debugging line
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user]);

  if (!user) {
    return <p className="text-center text-lg mt-10">You need to log in to view this page.</p>;
  }

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-semibold text-[#bc6c39] mb-8">My Orders</h1>
      {Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-lg text-center">You have no orders yet. Start shopping now!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 ">
            <thead>
              <tr className="bg-[#F0E4CF] rounded-t-lg">
                <th className="px-4 py-2 text-left">Order Items</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Shipped at</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center justify-between pr-4">

                        <div className="flex items-center">
                          <p className="text-sm font-semibold mr-2">{item.quantity} x</p>
                          <p className="text-sm font-semibold mr-2">{item.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{item.price * item.quantity} MAD</p>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{order.total} MAD</td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2">
                    {order.status === "shipped" ? new Date(order.updatedAt).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;