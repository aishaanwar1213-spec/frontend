
"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/orders";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  async function fetchOrders() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed (${response.status})`
        );
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Orders load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(orderId, status) {
    setUpdatingId(orderId);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update nahi hua.");
      }

      await fetchOrders();
    } catch (err) {
      setError(err.message || "Status update nahi hua.");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Marketora Admin
            </h1>
            <p className="mt-2 text-gray-500">
              Manage customer orders and deliveries.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Refresh Orders
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {orders.length}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Problem loading orders</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <section className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Orders
            </h2>
          </div>

          {loading ? (
            <p className="p-8 text-gray-500">Loading orders...</p>
          ) : orders.length === 0 && !error ? (
            <p className="p-8 text-gray-500">
              Abhi koi order nahi mila.
            </p>
          ) : (
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-100"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="mt-1 max-w-48 text-xs text-gray-500">
                        {order.address}
                      </p>
                    </td>

                    <td className="p-4">{order.phone}</td>

                    <td className="p-4 font-semibold">
                      Rs. {Number(order.totalAmount || 0).toLocaleString()}
                    </td>

                    <td className="p-4">
                      {order.paymentMethod || "COD"}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                        {order.orderStatus || "Placed"}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={order.orderStatus || "Placed"}
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className="rounded-lg border border-gray-300 p-2 disabled:opacity-50"
                      >
                        {[
                          "Placed",
                          "Confirmed",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
