
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Menu,
  X,
  Search,
  Heart,
  Plus,
  User,
  LogOut,
  ShoppingCart,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  const { user, profile, logout } = useAuth();

  const { wishlistCount, wishlistLoaded } = useWishlist();

  const { cartCount, cartLoaded } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "How It Works", href: "/how-it-works" },
    
    { name: "About", href: "/about" },
    {
  name: "Track Order",
  href: "/track-order",
},  
  
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -15 },
    show: { opacity: 1, y: 0 },
  };

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/products");
    }

    setSearch("");
    setSearchOpen(false);
    setOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      setProfileOpen(false);
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function closeMobileMenu() {
    setOpen(false);
  }

  function FavoritesLink({ mobile = false }) {
    return (
      <Link
        href="/favorites"
        onClick={mobile ? closeMobileMenu : undefined}
        aria-label={`Favorites${
          wishlistLoaded && wishlistCount > 0
            ? `, ${wishlistCount} saved products`
            : ""
        }`}
        title="Favorites"
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
          mobile
            ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
        }`}
      >
        <Heart
          size={mobile ? 20 : 19}
          className={
            wishlistLoaded && wishlistCount > 0
              ? "text-red-500"
              : ""
          }
        />

        {wishlistLoaded && wishlistCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
      </Link>
    );
  }

  function CartLink({ mobile = false }) {
    return (
      <Link
        href="/cart"
        onClick={mobile ? closeMobileMenu : undefined}
        aria-label={`Shopping cart${
          cartLoaded && cartCount > 0
            ? `, ${cartCount} items`
            : ""
        }`}
        title="Shopping cart"
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
          mobile
            ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600"
        }`}
      >
        <ShoppingCart size={mobile ? 20 : 19} />

        {cartLoaded && cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    );
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: -3 }}
            className="h-11 w-11 overflow-hidden rounded-xl bg-white shadow-md sm:h-14 sm:w-14"
          >
            <Image
              src="/logo.png"
              width={56}
              height={56}
              alt="Marketora Logo"
              priority
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-blue-900 sm:text-xl">
              Marketora
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Smart Marketplace
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
        >
          {links.map((link) => (
            <motion.div
              variants={item}
              key={link.name}
              className="group relative"
            >
              <Link
                href={link.href}
                className="whitespace-nowrap text-sm font-semibold text-gray-700 transition hover:text-orange-500"
              >
                {link.name}
              </Link>

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* DESKTOP ACTIONS */}

        <div className="hidden shrink-0 items-center gap-2 lg:flex">

          {/* SEARCH */}

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Open search"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-orange-100 hover:text-orange-600"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </motion.button>

          {/* FAVORITES */}

          <FavoritesLink />

          {/* CART WITH COUNT */}

          <CartLink />

          {/* SELL */}

          <Link
            href="/post-ad"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Sell
          </Link>

          {/* PROFILE / LOGIN */}

          {mounted && user ? (
            <div className="relative">
              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white"
              >
                <User size={19} />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close profile menu"
                      onClick={() => setProfileOpen(false)}
                      className="fixed inset-0 z-40 cursor-default"
                    />

                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: -8,
                      }}
                      className="absolute right-0 top-14 z-50 w-60 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl"
                    >
                      <p className="mb-1 break-words font-bold text-gray-900">
                        {profile?.displayName || user.email}
                      </p>

                      <p className="mb-4 text-xs text-gray-500">
                        Your Marketora account
                      </p>

                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        Dashboard
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border border-blue-800 px-4 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE ACTIONS */}

        <div className="flex shrink-0 items-center gap-1 lg:hidden">

          {/* MOBILE SEARCH */}

          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Open search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-orange-50 hover:text-orange-600"
          >
            <Search size={20} />
          </button>

          {/* MOBILE FAVORITES */}

          <FavoritesLink mobile />

          {/* MOBILE CART WITH COUNT */}

          <CartLink mobile />

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-800 hover:bg-gray-100"
          >
            <motion.div animate={{ rotate: open ? 180 : 0 }}>
              {open ? <X size={25} /> : <Menu size={25} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* EXPANDABLE SEARCH */}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gray-100 bg-white"
          >
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6"
            >
              <Search
                size={20}
                className="shrink-0 text-orange-500"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                autoFocus
                className="min-w-0 flex-1 rounded-lg bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-200"
              />

              <button
                type="submit"
                className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-3 sm:px-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-3">
                <Link
                  href="/post-ad"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-3 font-bold text-white hover:bg-orange-600"
                >
                  <Plus size={18} />
                  Sell
                </Link>

                {mounted && user ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-3 font-semibold text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center rounded-xl border border-blue-200 px-3 py-3 font-semibold text-blue-800 hover:bg-blue-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
