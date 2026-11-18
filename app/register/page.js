
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      console.error("Registration error:", err);

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

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure accounts",
      text: "Your account is protected with secure authentication.",
    },
    {
      icon: Zap,
      title: "Fast marketplace",
      text: "Buy, sell and discover products with less friction.",
    },
    {
      icon: Sparkles,
      title: "Built for discovery",
      text: "Find products and opportunities in one place.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9f5] px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Glow */}

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
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid w-full overflow-hidden rounded-[32px] border border-[#eee5df] bg-white shadow-[0_30px_90px_rgba(23,23,23,0.10)] lg:grid-cols-2"
        >
          {/* LEFT SIDE */}

          <div className="relative hidden min-h-[700px] overflow-hidden bg-[#171717] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <motion.div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a36] opacity-30 blur-3xl"
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 30, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ffc857] opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.18, 1],
                x: [0, 25, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute right-20 top-28 h-3 w-3 rounded-full bg-[#ff5a36]"
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-40 right-28 h-2 w-2 rounded-full bg-[#ffc857]"
              animate={{
                y: [0, 18, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo */}

            <motion.div
              className="relative z-10"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.5,
              }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-black tracking-tight"
              >
                <motion.span
                  whileHover={{
                    rotate: -8,
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a36]"
                >
                  <ShoppingBag size={21} />
                </motion.span>

                Marketora
              </Link>
            </motion.div>

            {/* Welcome Content */}

            <motion.div
              className="relative z-10"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                }}
                className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
              >
                <Sparkles
                  size={15}
                  className="mr-2 text-[#ffc857]"
                />

                Your marketplace starts here
              </motion.div>

              <h1 className="max-w-lg text-5xl font-black leading-[1.05] tracking-tight">
                Buy smarter.
                <br />
                Sell easier.
                <br />

                <motion.span
                  className="inline-block text-[#ff7048]"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Discover more.
                </motion.span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/60">
                Create your Marketora account and join a modern marketplace
                built for discovering great products and selling with ease.
              </p>

              {/* Benefits */}

              <div className="mt-10 space-y-3">
                {benefits.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.65 + index * 0.12,
                        duration: 0.5,
                      }}
                      whileHover={{
                        x: 5,
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.07]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff5a36]/15 text-[#ff7048]">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-xs text-white/45">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 text-sm text-white/40"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
              }}
            >
              © {new Date().getFullYear()} Marketora
            </motion.div>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <motion.div
              className="w-full max-w-md"
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Mobile Logo */}

              <motion.div
                className="mb-8 lg:hidden"
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xl font-black"
                >
                  <motion.span
                    whileHover={{
                      rotate: -8,
                      scale: 1.08,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a36] text-white"
                  >
                    <ShoppingBag size={21} />
                  </motion.span>

                  Marketora
                </Link>
              </motion.div>

              {/* Heading */}

              <motion.div
                className="mb-8"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}
              >
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#ff5a36]">
                  Join Marketora
                </p>

                <h2 className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#6b6b6b]">
                  Start buying, selling and discovering products today.
                </p>
              </motion.div>

              {/* Error and Success Messages */}

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                    }}
                    className="mb-5 overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600"
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Registration Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.45,
                  }}
                >
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-[#171717]"
                  >
                    Full name
                  </label>

                  <div className="group relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] transition-colors group-focus-within:text-[#ff5a36]"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      className="h-13 w-full rounded-2xl border border-[#eee5df] bg-[#fffdfb] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#ff5a36] focus:bg-white focus:ring-4 focus:ring-[#ff5a36]/10"
                    />
                  </div>
                </motion.div>

                {/* EMAIL */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.52,
                  }}
                >
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
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-13 w-full rounded-2xl border border-[#eee5df] bg-[#fffdfb] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#ff5a36] focus:bg-white focus:ring-4 focus:ring-[#ff5a36]/10"
                    />
                  </div>
                </motion.div>

                {/* PASSWORD */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.59,
                  }}
                >
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-[#171717]"
                  >
                    Password
                  </label>

                  <div className="group relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] transition-colors group-focus-within:text-[#ff5a36]"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className="h-13 w-full rounded-2xl border border-[#eee5df] bg-[#fffdfb] pl-11 pr-12 text-sm outline-none transition-all duration-300 focus:border-[#ff5a36] focus:bg-white focus:ring-4 focus:ring-[#ff5a36]/10"
                    />

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.85,
                      }}
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] transition-colors hover:text-[#ff5a36]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* CONFIRM PASSWORD */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.66,
                  }}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-[#171717]"
                  >
                    Confirm password
                  </label>

                  <div className="group relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] transition-colors group-focus-within:text-[#ff5a36]"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className="h-13 w-full rounded-2xl border border-[#eee5df] bg-[#fffdfb] pl-11 pr-12 text-sm outline-none transition-all duration-300 focus:border-[#ff5a36] focus:bg-white focus:ring-4 focus:ring-[#ff5a36]/10"
                    />

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.85,
                      }}
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] transition-colors hover:text-[#ff5a36]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* CREATE ACCOUNT BUTTON */}

                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.73,
                  }}
                  whileHover={{
                    scale: loading ? 1 : 1.015,
                    y: loading ? 0 : -2,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ff5a36] px-5 text-sm font-bold text-white shadow-lg shadow-[#ff5a36]/20 transition-all hover:bg-[#e84322] hover:shadow-xl hover:shadow-[#ff5a36]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </form>

              {/* LOGIN LINK */}

              <motion.p
                className="mt-7 text-center text-sm text-[#6b6b6b]"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.85,
                }}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#ff5a36] transition-colors hover:text-[#e84322]"
                >
                  Log in
                </Link>
              </motion.p>

              {/* FOOTER */}

              <motion.p
                className="mt-6 text-center text-xs leading-5 text-[#999]"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.95,
                }}
              >
                By creating an account, you agree to use Marketora responsibly
                and follow our marketplace guidelines.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
