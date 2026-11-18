
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error(
          "The server returned an unexpected response. Please check your backend route."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process your request."
        );
      }

      setSuccess(true);
    } catch (err) {
      console.error("Password reset request error:", err);

      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the server. Please make sure your backend is running."
        );
      } else {
        setError(
          err.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9f5] px-4 py-8 sm:px-6 lg:px-8">
      {/* Background glows */}
      <motion.div
        className="pointer-events-none fixed -right-32 -top-32 h-80 w-80 rounded-full bg-[#ffc857]/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none fixed -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#ff5a36]/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid w-full overflow-hidden rounded-[32px] border border-[#eee5df] bg-white shadow-[0_30px_90px_rgba(23,23,23,0.10)] lg:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <div className="relative hidden min-h-[620px] overflow-hidden bg-[#171717] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <motion.div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a36] opacity-30 blur-3xl"
              animate={{ scale: [1, 1.25, 1], rotate: [0, 30, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ffc857] opacity-20 blur-3xl"
              animate={{ scale: [1, 1.18, 1], x: [0, 25, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Link
              href="/"
              className="relative z-10 inline-flex items-center gap-2 text-xl font-black tracking-tight"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a36]">
                <ShoppingBag size={21} />
              </span>
              Marketora
            </Link>

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff5a36]/15 text-[#ff7048]">
                <LockKeyhole size={30} />
              </div>

              <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Sparkles size={15} className="mr-2 text-[#ffc857]" />
                Account recovery
              </div>

              <h1 className="max-w-lg text-5xl font-black leading-[1.05] tracking-tight">
                Get back
                <br />
                into your
                <br />
                <span className="text-[#ff7048]">Marketora.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/60">
                Forgot your password? Enter your registered email to request
                a secure password reset link.
              </p>
            </motion.div>

            <p className="relative z-10 text-sm text-white/40">
              © {new Date().getFullYear()} Marketora
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Mobile logo */}
              <div className="mb-8 lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xl font-black"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a36] text-white">
                    <ShoppingBag size={21} />
                  </span>
                  Marketora
                </Link>
              </div>

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <div className="mb-8">
                      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#ff5a36]">
                        Password recovery
                      </p>

                      <h2 className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
                        Forgot your password?
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-[#6b6b6b]">
                        Enter your email to request a password reset link.
                      </p>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          role="alert"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-bold text-[#171717]"
                        >
                          Email address
                        </label>

                        <div className="group relative">
                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] transition-colors group-focus-within:text-[#ff5a36]"
                          />

                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                            }}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="h-13 w-full rounded-2xl border border-[#eee5df] bg-[#fffdfb] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#ff5a36] focus:bg-white focus:ring-4 focus:ring-[#ff5a36]/10"
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{
                          scale: loading ? 1 : 1.015,
                          y: loading ? 0 : -2,
                        }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ff5a36] px-5 text-sm font-bold text-white shadow-lg shadow-[#ff5a36]/20 transition-all hover:bg-[#e84322] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <motion.span
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending link...
                          </>
                        ) : (
                          <>
                            Send reset link
                            <ArrowRight
                              size={18}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </motion.button>
                    </form>

                    <div className="mt-7 text-center">
                      <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#ff5a36] transition-colors hover:text-[#e84322]"
                      >
                        <ArrowLeft size={16} />
                        Back to login
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#20b486]/10 text-[#20b486]"
                    >
                      <CheckCircle2 size={42} />
                    </motion.div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight text-[#171717]">
                      Request received
                    </h2>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#6b6b6b]">
                      If an account exists for{" "}
                      <span className="font-bold text-[#171717]">
                        {email}
                      </span>
                      , you will receive password reset instructions if email
                      delivery is configured.
                    </p>

                    <div className="mt-7 rounded-2xl border border-[#eee5df] bg-[#fff9f5] p-4 text-left">
                      <p className="text-sm font-bold text-[#171717]">
                        Didn't receive an email?
                      </p>

                      <ul className="mt-2 space-y-1 text-xs leading-5 text-[#777]">
                        <li>• Check your spam or junk folder.</li>
                        <li>• Confirm that you entered the correct address.</li>
                        <li>• Wait a few moments before trying again.</li>
                      </ul>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <motion.button
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSuccess(false);
                          setError("");
                        }}
                        className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-[#eee5df] bg-white text-sm font-bold text-[#171717] transition-colors hover:border-[#ff5a36] hover:text-[#ff5a36]"
                      >
                        Try another email
                      </motion.button>

                      <Link
                        href="/login"
                        className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#ff5a36] text-sm font-bold text-white transition-colors hover:bg-[#e84322]"
                      >
                        Back to login
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
