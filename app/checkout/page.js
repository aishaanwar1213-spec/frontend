
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  CheckCircle,
  LoaderCircle,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

function getProductId(item) {
  return String(
    item._id || item.id || item.productId || item.product || ""
  );
}

function getProductName(item) {
  return item.name || item.title || "Product";
}

function getProductImage(item) {
  if (typeof item.image === "string") return item.image;
  if (item.image?.url) return item.image.url;

  if (Array.isArray(item.images) && item.images.length > 0) {
    return typeof item.images[0] === "string"
      ? item.images[0]
      : item.images[0]?.url || "";
  }

  return "";
}

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cartItems,
    cartLoaded,
    cartTotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    const customerName = form.customerName.trim();
    const customerEmail = form.customerEmail.trim().toLowerCase();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (!customerName || !customerEmail || !phone || !address) {
      setError("Please complete all delivery details.");
      return;
    }

    if (
      customerName.length > 100 ||
      phone.length > 20 ||
      address.length > 500
    ) {
      setError("Customer details exceed the allowed length.");
      return;
    }

    if (
      customerEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const items = cartItems.map((item) => ({
      productId: getProductId(item),
      quantity: Number(item.quantity || 1),
    }));

    if (
      items.some(
        (item) =>
          !item.productId ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
      )
    ) {
      setError("Your cart contains an invalid product or quantity.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName,
            customerEmail,
            phone,
            address,
            paymentMethod: "COD",
            items,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to place your order."
        );
      }

      const orderId = data.order?._id;

      if (!orderId) {
        throw new Error(
          "The order response did not include an order ID."
        );
      }

      setSuccess("Your order has been placed successfully!");

      clearCart();

      router.push(
        `/order-success?id=${encodeURIComponent(orderId)}`
      );

    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the backend. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!cartLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-orange-500"
          size={32}
        />
      </div>
    );
  }

  if (cartItems.length === 0 && !success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={56} className="mb-4 text-gray-300" />

        <h1 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          href="/products"
          className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <div className="mb-8">
          <p className="font-semibold uppercase tracking-wider text-orange-500">
            Marketora Checkout
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-blue-950 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details to place your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">

          {/* DELIVERY FORM */}

          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
          >

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <MapPin size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                <p className="text-sm text-gray-500">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                {success}
              </div>
            )}

            <div className="space-y-5">

              {/* FULL NAME */}

              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    autoComplete="name"
                    value={form.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* EMAIL ADDRESS */}

              <div>
                <label
                  htmlFor="customerEmail"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    autoComplete="email"
                    value={form.customerEmail}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    maxLength={254}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Your order confirmation will be sent to this email.
                </p>
              </div>

              {/* PHONE NUMBER */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    required
                    maxLength={20}
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* DELIVERY ADDRESS */}

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Complete Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House number, street, area, city"
                  required
                  maxLength={500}
                  rows={4}
                  autoComplete="street-address"
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

            </div>

            {/* PAYMENT METHOD */}

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="flex items-center gap-4 rounded-2xl border-2 border-orange-400 bg-orange-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-600">
                  <Truck size={24} />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Pay when your order arrives.
                  </p>
                </div>

                <CheckCircle size={22} className="text-orange-500" />
              </div>
            </div>

            {/* PLACE ORDER BUTTON */}

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  Place Order
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Your order total is calculated and verified by the server.
            </p>

          </motion.form>

          {/* ORDER SUMMARY */}

          <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cartItems.map((item, index) => {
                const image = getProductImage(item);
                const quantity = Number(item.quantity || 1);

                const price = Number(
                  String(item.price ?? 0).replace(/[^0-9.]/g, "")
                ) || 0;

                return (
                  <div
                    key={getProductId(item) || index}
                    className="flex gap-4"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                      {image ? (
                        <img
                          src={image}
                          alt={getProductName(item)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ShoppingBag
                          className="text-gray-400"
                          size={28}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold text-gray-900">
                        {getProductName(item)}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>

                      <p className="mt-1 font-bold text-orange-600">
                        Rs. {(price * quantity).toLocaleString("en-PK")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

              <div className="flex justify-between gap-4 text-sm text-gray-600">
                <span>Subtotal</span>

                <span>
                  Rs. {Number(cartTotal || 0).toLocaleString("en-PK")}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm text-gray-600">
                <span>Delivery</span>
                <span>Calculated separately</span>
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-4">
                <span className="font-bold text-gray-900">
                  Estimated Total
                </span>

                <span className="text-xl font-extrabold text-blue-950">
                  Rs. {Number(cartTotal || 0).toLocaleString("en-PK")}
                </span>
              </div>

              <p className="text-xs leading-5 text-gray-500">
                Final product total is calculated by the server. Delivery
                charges are not included in this estimate.
              </p>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
