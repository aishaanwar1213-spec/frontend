
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Shirt,
  Car,
  Sofa,
  Gamepad2,
  Watch,
  BookOpen,
  Dumbbell,
  Sparkles,
  ShoppingBag,
  House,
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "Mobiles", icon: Smartphone, color: "bg-blue-50 text-blue-600" },
  { name: "Electronics", icon: Laptop, color: "bg-purple-50 text-purple-600" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-50 text-pink-600" },
  { name: "Vehicles", icon: Car, color: "bg-orange-50 text-orange-600" },
  { name: "Furniture", icon: Sofa, color: "bg-amber-50 text-amber-700" },
  { name: "Gaming", icon: Gamepad2, color: "bg-indigo-50 text-indigo-600" },
  { name: "Accessories", icon: Watch, color: "bg-rose-50 text-rose-600" },
  { name: "Books", icon: BookOpen, color: "bg-green-50 text-green-600" },
  { name: "Sports", icon: Dumbbell, color: "bg-cyan-50 text-cyan-700" },
  { name: "Beauty", icon: Sparkles, color: "bg-fuchsia-50 text-fuchsia-600" },
  { name: "Home & Living", icon: House, color: "bg-teal-50 text-teal-700" },
  { name: "Accessories", icon: ShoppingBag, color: "bg-yellow-50 text-yellow-700" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-semibold uppercase tracking-[0.2em] text-orange-400"
          >
            Explore Marketora
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-4xl font-extrabold md:text-6xl"
          >
            Find What You Love,{" "}
            <span className="text-orange-400">All in One Place.</span>
          </motion.h1>

          <p className="mt-5 max-w-2xl leading-7 text-blue-100">
            Explore categories, discover great products and find what you need
            on Marketora.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Explore Marketplace <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Explore Categories
          </h2>
          <p className="mt-3 text-gray-600">
            Choose a category to find products that match your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={`${category.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.05 }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group flex h-full min-h-44 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:scale-110 ${category.color}`}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <h3 className="font-bold text-gray-800">
                    {category.name}
                  </h3>

                  <span className="mt-2 text-sm font-semibold text-orange-500 opacity-0 transition group-hover:opacity-100">
                    Explore →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-5 mb-12 rounded-3xl bg-orange-50 px-6 py-10 text-center md:mx-auto md:max-w-7xl md:py-14">
        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          Ready to discover something new?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Explore the marketplace and find products that are right for you.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Browse All Products <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
