
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  ShoppingCart,
  PackageCheck,
  UserPlus,
  Camera,
  Tag,
  Handshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

const buyerSteps = [
  {
    icon: Search,
    title: "Explore Products",
    description:
      "Browse categories, search for products and compare the options available on Marketora.",
  },
  {
    icon: MessageCircle,
    title: "Connect with Sellers",
    description:
      "Review product details and contact the seller to ask questions before making a decision.",
  },
  {
    icon: ShoppingCart,
    title: "Choose Your Product",
    description:
      "Find the product you need and use the available shopping and checkout options.",
  },
  {
    icon: PackageCheck,
    title: "Complete Your Order",
    description:
      "Follow the available order instructions and keep track of your purchase.",
  },
];

const sellerSteps = [
  {
    icon: UserPlus,
    title: "Get Started",
    description:
      "Create your account and get ready to showcase your products on Marketora.",
  },
  {
    icon: Camera,
    title: "Add Your Product",
    description:
      "Upload a clear product image and provide its name, category, price and description.",
  },
  {
    icon: Tag,
    title: "Reach Buyers",
    description:
      "Keep your listing details accurate so customers can understand what you are selling.",
  },
  {
    icon: Handshake,
    title: "Manage Your Sales",
    description:
      "Respond to customer enquiries and follow the order process available on the platform.",
  },
];

function StepCard({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
        <Icon size={27} />
      </div>

      <span className="text-sm font-bold uppercase tracking-widest text-blue-800">
        Step {index + 1}
      </span>

      <h3 className="mt-2 text-xl font-bold text-gray-900">
        {step.title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300">
              <CheckCircle size={16} />
              Simple. Convenient. Accessible.
            </span>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              How Marketora{" "}
              <span className="text-orange-400">Works</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
              Whether you want to discover products or sell something,
              Marketora helps you get started in a few simple steps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Start Shopping <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Getting started
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            A Simple Way to Buy and Sell
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Follow the steps below to understand how to use the marketplace.
          </p>
        </div>

        {/* Buyer Steps */}
        <div className="mb-16">
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-gray-900">
              For Buyers
            </h2>
            <p className="mt-2 text-gray-600">
              Find products and explore your options.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyerSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Seller Steps */}
        <div>
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-gray-900">
              For Sellers
            </h2>
            <p className="mt-2 text-gray-600">
              Showcase your products and connect with potential buyers.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sellerSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="mx-5 mb-12 rounded-3xl border border-blue-100 bg-white px-6 py-10 md:mx-auto md:max-w-7xl md:px-12 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
            <ShieldCheck size={32} />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-gray-900 md:text-3xl">
            Shop and Sell Carefully
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Review product information before making a decision. Confirm
            prices and transaction details with the seller, and never share
            passwords or verification codes with anyone.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-50 px-5 py-14 text-center md:py-16">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Ready to explore Marketora?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
          Start browsing products or create an account to get started.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Explore Marketplace
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-blue-800 px-6 py-3 font-bold text-blue-800 transition hover:bg-blue-50"
          >
            Join Marketora
          </Link>
        </div>
      </section>
    </main>
  );
}