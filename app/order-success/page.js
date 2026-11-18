
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  Home,
  ClipboardCheck,
} from "lucide-react";

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-lg sm:p-10"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={58} className="text-green-500" />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-green-600">
          Order Confirmation
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-blue-950 sm:text-4xl">
          Thank You!
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
          Your order has been submitted successfully. Thank you for shopping
          with Marketora!
        </p>

        {orderId ? (
          <div className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm font-semibold text-gray-600">
              Your Order ID
            </p>

            <p className="mt-2 break-all font-mono text-sm font-bold text-blue-950 sm:text-base">
              {orderId}
            </p>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(orderId);
              }}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
            >
              <ClipboardCheck size={17} />
              Copy Order ID
            </button>
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            No order ID was provided in the page URL. Please check your order
            confirmation details.
          </p>
        )}

        <div className="mt-7 flex items-center gap-4 rounded-2xl bg-gray-50 p-4 text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Package size={25} />
          </div>

          <div>
            <p className="font-bold text-gray-900">Cash on Delivery</p>
            <p className="mt-1 text-sm text-gray-500">
              Pay when your order arrives.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600"
          >
            <ShoppingBag size={19} />
            Shop More
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 font-bold text-blue-950 transition hover:bg-gray-50"
          >
            <Home size={19} />
            Back to Home
          </Link>
        </div>

        <p className="mt-6 text-xs leading-5 text-gray-400">
          Please save your Order ID for future reference.
        </p>
      </motion.div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
          Loading order confirmation...
        </div>
      }
    >
      <OrderConfirmation />
    </Suspense>
  );
}
