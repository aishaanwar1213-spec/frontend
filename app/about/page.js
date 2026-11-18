
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Target,
  Eye,
  Heart,
  Users,
  Search,
  ShieldCheck,
  ArrowRight,
  Store,
  Handshake,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We want to make it easier for buyers and sellers to discover each other and connect through one marketplace.",
  },
  {
    icon: ShieldCheck,
    title: "Trust and Transparency",
    description:
      "Clear product information and responsible buying and selling practices help people make informed decisions.",
  },
  {
    icon: Sparkles,
    title: "Simple Experience",
    description:
      "We aim to make browsing, discovering and listing products straightforward and convenient.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-5 py-20 text-white md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-bold uppercase tracking-[0.2em] text-orange-400">
              About Marketora
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              A Marketplace Built for{" "}
              <span className="text-orange-400">Everyone.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 md:text-lg">
              Marketora brings buyers and sellers together in one convenient
              online marketplace. Discover products, explore categories and
              find new opportunities to buy and sell.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Explore Marketplace
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/categories"
                className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Browse Categories
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-950/20">
                <ShoppingBag size={42} className="text-white" />
              </div>

              <h2 className="mt-7 text-3xl font-extrabold">
                Welcome to Marketora
              </h2>

              <p className="mt-3 leading-7 text-blue-100">
                Discover products. Connect with people. Make shopping simpler.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Handshake size={23} className="text-orange-300" />
                </div>
                <div>
                  <p className="font-bold">Buy and Sell</p>
                  <p className="text-sm text-blue-200">
                    One convenient marketplace
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-orange-500 p-4 shadow-xl sm:-right-5">
              <Heart size={27} fill="white" className="text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Making Buying and Selling More Convenient
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600">
            Marketora is an online marketplace concept designed to help people
            explore products across different categories. Our goal is to create
            a simple place where users can browse listings, discover useful
            items and connect with buying and selling opportunities.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-600">
            From electronics and fashion to home essentials and accessories,
            Marketora aims to make product discovery easier through a clear,
            accessible and user-friendly experience.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-gray-50 px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Target size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Our Mission
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Our mission is to make online buying and selling easier by
              providing an accessible marketplace where people can discover
              products, explore their options and connect with potential
              buyers or sellers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
              <Eye size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Our Vision
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Our vision is to grow into a useful and trusted marketplace where
              discovering products and connecting with people feels simple,
              convenient and accessible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-bold uppercase tracking-widest text-orange-500">
            What Matters to Us
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            The Values Behind Marketora
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            We want every part of the marketplace experience to be useful,
            understandable and focused on people.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How to Explore */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-950 px-6 py-12 text-center text-white md:px-12 md:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
            <Store size={32} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">
            Your Next Discovery Starts Here
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Explore categories, browse available products and discover what
            Marketora has to offer.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
