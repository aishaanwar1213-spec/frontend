
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Mail,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import { motion } from "motion/react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  function handleContinue() {
    setMessage("Please log in to continue to Marketora.");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff9f5] px-4 py-10">
      {/* Background effects */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ffc857]/20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#ff5a36]/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-xl rounded-[32px] border border-[#eee5df] bg-white p-7 text-center shadow-[0_30px_90px_rgba(23,23,23,0.10)] sm:p-12"
      >
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-[#171717]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a36] text-white">
            <ShoppingBag size={21} />
          </span>
          Marketora
        </Link>

        {/* Main icon */}
        <motion.div
          className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#ff5a36]/10 text-[#ff5a36]"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShieldCheck size={44} />
        </motion.div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-[#ff5a36]">
          Account authentication
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
          Your account is ready for the next step
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6b6b6b]">
          Marketora now uses its account login system. Sign in with the email
          and password you registered with to continue.
        </p>

        {message && (
          <div
            role="status"
            className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {message}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <motion.button
            type="button"
            onClick={handleContinue}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-[#ff5a36] px-5 text-sm font-bold text-white shadow-lg shadow-[#ff5a36]/20 transition-colors hover:bg-[#e84322]"
          >
            <LogIn size={18} />
            Continue to Login
          </motion.button>

          <Link
            href="/register"
            className="flex h-13 items-center justify-center gap-2 rounded-2xl border border-[#eee5df] bg-white px-5 text-sm font-bold text-[#171717] transition-colors hover:border-[#ff5a36] hover:text-[#ff5a36]"
          >
            <Mail size={18} />
            Create an account
          </Link>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#777] transition-colors hover:text-[#ff5a36]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </motion.section>
    </main>
  );
}
