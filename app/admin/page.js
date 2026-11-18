
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Store,
} from "lucide-react";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Could not load products");
        }

        const data = await response.json();
        setProductCount(data.count ?? data.products?.length ?? 0);
      } catch {
        setError("Backend se connect nahi ho raha.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 md:flex">
      {/* Sidebar */}
      <aside className="w-full bg-blue-950 p-6 text-white md:min-h-screen md:w-64">
        <Link href="/" className="mb-10 flex items-center gap-3">
          <Store size={30} className="text-orange-400" />
          <span className="text-2xl font-bold">Marketora</span>
        </Link>

        <p className="mb-4 text-xs uppercase tracking-widest text-blue-300">
          Admin Menu
        </p>

        <nav className="space-y-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl bg-orange-500 p-3 font-semibold"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-900"
          >
            <Package size={20} />
            All Products
          </Link>

          <Link
            href="/admin/products/add"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-900"
          >
            <PlusCircle size={20} />
            Add Product
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-900"
          >
            <ShoppingBag size={20} />
            View Store
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <section className="min-w-0 flex-1 p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-orange-600">
              MARKETORA ADMIN
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your marketplace products.
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
          >
            <PlusCircle size={20} />
            Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {loading ? "..." : productCount}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-4 text-orange-600">
                <Package size={28} />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Product Management</p>
                <p className="mt-3 text-lg font-bold text-gray-900">
                  Manage Inventory
                </p>
              </div>
              <div className="rounded-xl bg-blue-100 p-4 text-blue-700">
                <ShoppingBag size={28} />
              </div>
            </div>

            <Link
              href="/admin/products"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-orange-600"
            >
              View products <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Quick Action</p>
                <p className="mt-3 text-lg font-bold text-gray-900">
                  Add a new item
                </p>
              </div>
              <div className="rounded-xl bg-green-100 p-4 text-green-700">
                <PlusCircle size={28} />
              </div>
            </div>

            <Link
              href="/admin/products/add"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700 hover:text-orange-600"
            >
              Add now <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Welcome Panel */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Welcome to Marketora Admin!
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            Yahan se aap apne products manage karengi. Agle step mein
            hum product form banayenge jahan se product ki details
            MongoDB mein save hongi.
          </p>

          <Link
            href="/admin/products/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold transition hover:bg-orange-600"
          >
            <PlusCircle size={20} />
            Start Adding Products
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw size={16} />
          Product count MongoDB API se load hota hai.
        </div>
      </section>
    </main>
  );
}
