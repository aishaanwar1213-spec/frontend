"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, Truck, CheckCircle2, AlertCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(e) {
    e.preventDefault();
    setOrder(null);
    setError("");

    if (!orderId.trim()) {
      setError("Please enter your Order ID.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${encodeURIComponent(orderId.trim())}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Order not found.");
      }

      setOrder(data.order);
    } catch (err) {
      setError(err.message || "Could not fetch your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const statuses = ["Placed", "Confirmed", "Shipped", "Delivered"];
  const currentStatus = order?.orderStatus || "";
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-6 inline-block font-semibold text-blue-800 hover:text-orange-600">
          ← Back to Marketora
        </Link>

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <Package size={38} className="mb-4" />
            <h1 className="text-3xl font-extrabold">Track Your Order</h1>
            <p className="mt-2 text-orange-50">
              Enter your Order ID to check your delivery status.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleTrack} className="space-y-3">
              <label htmlFor="orderId" className="block font-semibold text-gray-700">
                Order ID
              </label>

              <input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Paste your Order ID"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-bold text-white transition hover:bg-orange-500 disabled:opacity-60"
              >
                <Search size={19} />
                {loading ? "Searching..." : "Track Order"}
              </button>
            </form>

            {error && (
              <div role="alert" className="mt-5 flex gap-2 rounded-xl bg-red-50 p-4 text-red-700">
                <AlertCircle size={20} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {order && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="mt-1 break-all font-bold text-gray-900">{order._id}</p>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Order Status</p>
                      <p className="mt-1 font-bold text-orange-600">{currentStatus}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="mt-1 font-semibold text-gray-800">
                        {order.paymentMethod || "COD"} — {order.paymentStatus || "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="mt-1 text-xl font-extrabold text-gray-900">
                        Rs. {Number(order.totalAmount || 0).toLocaleString("en-PK")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="mt-1 font-semibold text-gray-800">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-PK")
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {currentStatus === "Cancelled" ? (
                  <div className="rounded-xl bg-red-50 p-4 font-semibold text-red-700">
                    This order has been cancelled.
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <h2 className="mb-5 text-lg font-bold text-gray-900">
                      Delivery Progress
                    </h2>

                    <div className="space-y-5">
                      {statuses.map((status, index) => {
                        const complete = currentIndex >= index;

                        return (
                          <div key={status} className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${complete ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                              {index === 2 ? <Truck size={20} /> : <CheckCircle2 size={20} />}
                            </div>
                            <div>
                              <p className={`font-semibold ${complete ? "text-gray-900" : "text-gray-400"}`}>
                                {status}
                              </p>
                              <p className="text-sm text-gray-500">
                                {status === currentStatus ? "Current order status" : ""}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-gray-200 p-5">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Order Items</h2>
                  {order.items?.length ? (
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={item.product || index} className="flex justify-between gap-4">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name || "Product"}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-gray-900">
                            Rs. {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-PK")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No item details available.</p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <Link href="/products" className="font-bold text-orange-600 hover:text-orange-700">
                Continue Shopping →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}