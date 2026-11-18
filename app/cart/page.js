
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    cartLoaded,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  function getItemId(item) {
    return item._id || item.id || item.productId;
  }

  function getItemName(item) {
    return item.name || item.title || "Product";
  }

  function getItemImage(item) {
    const image = item.image || item.images?.[0] || "";

    if (typeof image === "string") return image;

    return image?.url || "";
  }

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;
  }

  if (!cartLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
            <ShoppingCart size={42} className="text-orange-500" />
          </div>

          <h1 className="text-3xl font-extrabold text-blue-950">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            You haven't added any products yet. Explore Marketora and find
            something you love.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
          >
            <ShoppingBag size={19} />
            Explore Products
          </Link>

          <div className="mt-5">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-500 hover:text-orange-600"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}

        <div className="mb-8">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold uppercase tracking-widest text-orange-500">
                Marketora Shopping
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-blue-950 sm:text-4xl">
                My Shopping Cart
              </h1>

              <p className="mt-2 text-gray-500">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_370px]">
          {/* CART ITEMS */}

          <section className="space-y-4">
            {cartItems.map((item, index) => {
              const id = getItemId(item);
              const name = getItemName(item);
              const image = getItemImage(item);
              const price = Number(item.price || 0);
              const quantity = Number(item.quantity || 1);

              return (
                <motion.article
                  key={id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* PRODUCT IMAGE */}

                    <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-28 sm:w-28">
                      {image ? (
                        image.startsWith("/") ? (
                          <Image
                            src={image}
                            alt={name}
                            width={112}
                            height={112}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        )
                      ) : (
                        <ShoppingBag
                          size={36}
                          className="text-gray-300"
                        />
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-lg font-bold text-gray-900">
                        {name}
                      </h2>

                      <p className="mt-2 text-lg font-extrabold text-orange-600">
                        {formatPrice(price)}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Subtotal: {formatPrice(price * quantity)}
                      </p>
                    </div>

                    {/* QUANTITY + REMOVE */}

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-1.5">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(id)}
                          aria-label={`Decrease quantity of ${name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-5 text-center font-bold text-gray-900">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(id)}
                          aria-label={`Increase quantity of ${name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(id)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </section>

          {/* ORDER SUMMARY */}

          <aside className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-blue-950">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
                <span>Items</span>
                <span className="font-semibold text-gray-900">
                  {cartCount}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-gray-900">
                  Calculated separately
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-bold text-gray-900">
                    Estimated Total
                  </span>

                  <span className="text-xl font-extrabold text-orange-600">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Delivery charges are not included. The server will verify
                  product prices when you place your order.
                </p>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-center font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
            >
              <CreditCard size={20} />
              Proceed to Checkout
            </Link>

            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
              <ShoppingBag size={17} className="text-green-600" />
              Cash on Delivery available
            </div>

            <Link
              href="/products"
              className="mt-4 block text-center text-sm font-semibold text-blue-900 transition hover:text-orange-600"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
