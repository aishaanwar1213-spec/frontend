
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Heart,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import ProductCarousel from "@/components/ProductCarousel";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      router.push(`/products?search=${encodeURIComponent(value)}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* SEARCH SECTION */}
      <section className="relative z-10 mx-auto -mt-8 w-[92%] max-w-4xl">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/60"
        >
          <Search className="ml-2 h-5 w-5 shrink-0 text-orange-500" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mobiles, electronics, home products..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-7"
          >
            Search
          </button>
        </form>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-12 md:grid-cols-4 md:px-8">
        <Benefit
          icon={<Truck />}
          title="Convenient Shopping"
          description="Explore products in one place"
        />

        <Benefit
          icon={<ShieldCheck />}
          title="Shop with Confidence"
          description="Review product details before buying"
        />

        <Benefit
          icon={<ShoppingBag />}
          title="Easy Product Discovery"
          description="Find items that suit your needs"
        />

        <Benefit
          icon={<Headphones />}
          title="Here to Help"
          description="Support for your shopping journey"
        />
      </section>

      {/* CATEGORIES — only one category section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="EXPLORE MARKETORA"
          title="Shop by Category"
          description="Discover products across categories and find what you need."
        />

        <CategorySection />
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="POPULAR PICKS"
            title="Trending Products"
            description="Explore the latest products available on Marketora."
          />

          <button
            onClick={() => router.push("/products")}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            View All Products
            <ArrowRight size={17} />
          </button>
        </div>

        <ProductCarousel />
      </section>

      {/* MARKETPLACE HIGHLIGHTS */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              <Sparkles size={16} />
              Welcome to Marketora
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Your marketplace,
              <span className="text-orange-500"> your way.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-600">
              Discover a variety of products, explore different categories,
              and find items that match your needs. Marketora brings your
              marketplace experience together in one place.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Start Exploring
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <HighlightCard
              icon={<Search />}
              title="Discover More"
              description="Browse products and explore available categories."
            />

            <HighlightCard
              icon={<Heart />}
              title="Find Your Favorites"
              description="Discover products you may want to buy."
            />

            <HighlightCard
              icon={<ShoppingBag />}
              title="Product Details"
              description="Open a product to see its information."
            />

            <HighlightCard
              icon={<CheckCircle2 />}
              title="Simple Experience"
              description="Explore the marketplace with an easy interface."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
                Your next great find
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Ready to explore Marketora?
              </h2>

              <p className="mt-4 leading-7 text-orange-50">
                Browse available products and discover something you love.
              </p>
            </div>

            <button
              onClick={() => router.push("/products")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-orange-600 transition hover:bg-orange-50"
            >
              Browse Products
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-bold tracking-[0.2em] text-orange-500">
        {eyebrow}
      </p>

      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Benefit({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-orange-200 hover:shadow-lg sm:p-5"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
        {icon}
      </div>

      <h3 className="text-sm font-bold sm:text-base">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
        {description}
      </p>
    </motion.div>
  );
}

function HighlightCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
        {icon}
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        {/* BRAND */}
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              M
            </span>
            Marketora
          </a>

          <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
            Discover products, explore categories, and enjoy a simple
            marketplace experience with Marketora.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 transition hover:bg-orange-500 hover:text-white"
            >
              <span className="text-sm font-bold">IG</span>
            </a>

            <a
              href="mailto:support@marketora.com"
              aria-label="Email Marketora"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 transition hover:bg-orange-500 hover:text-white"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <ul className="mt-5 space-y-3 text-sm">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/products" label="All Products" />
            <FooterLink href="/login" label="Sign In" />
            <FooterLink href="/register" label="Create Account" />
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-bold text-white">Explore</h3>

          <ul className="mt-5 space-y-3 text-sm">
            <FooterLink href="/products?category=Mobiles" label="Mobiles" />
            <FooterLink
              href="/products?category=Electronics"
              label="Electronics"
            />
            <FooterLink
              href="/products?category=Home%20%26%20Living"
              label="Home & Living"
            />
            <FooterLink
              href="/products?category=Accessories"
              label="Accessories"
            />
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold text-white">Get in Touch</h3>

          <div className="mt-5 space-y-4 text-sm">
            <p className="flex items-start gap-3 leading-6 text-gray-400">
              <MapPin className="mt-1 shrink-0 text-orange-500" size={18} />
              <span>Pakistan</span>
            </p>

            <a
              href="aishafaizan2626@gmail.com"
              className="flex items-start gap-3 break-all text-gray-400 transition hover:text-orange-400"
            >
              <Mail className="mt-0.5 shrink-0 text-orange-500" size={18} />
              <span>aishafaizan2626@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-gray-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Marketora. All rights reserved.
          </p>

          <p>Made with care for your marketplace experience.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="transition hover:text-orange-400"
      >
        {label}
      </a>
    </li>
  );
}
