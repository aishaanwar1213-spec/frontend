
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Package,
  RefreshCw,
  ArrowLeft,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const API_URL = "${API_URL}/api/products";

const categories = [
  "All Categories",
  "Mobiles",
  "Electronics",
  "Fashion",
  "Vehicles",
  "Furniture",
  "Home & Living",
  "Gaming",
  "Accessories",
  "Books",
  "Sports",
  "Beauty",
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    toggleWishlist,
    isWishlisted,
    wishlistLoaded,
  } = useWishlist();

  const { addToCart, cartItems = [] } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedProductId, setAddedProductId] = useState("");

  // Read search and category from URL.
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory =
      searchParams.get("category") || "All Categories";

    const matchedCategory = categories.find(
      (item) =>
        item.toLowerCase() === urlCategory.toLowerCase()
    );

    setSearch(urlSearch);
    setCategory(matchedCategory || "All Categories");
  }, [searchParams]);

  // Fetch products from backend.
  async function fetchProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Products fetch nahi ho sake.");
      }

      const data = await response.json();
      const list = Array.isArray(data)
        ? data
        : data.products;

      if (!Array.isArray(list)) {
        throw new Error(
          "Backend response ka format sahi nahi hai."
        );
      }

      setProducts(list);
    } catch (err) {
      setError(
        err.message ||
          "Products load nahi ho rahe. Check karein ke backend localhost:5000 par chal raha hai."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search, category filtering and sorting.
  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const description = String(
          product.description || ""
        ).toLowerCase();

        const productCategory = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(searchText) ||
          description.includes(searchText) ||
          productCategory.includes(searchText)
        );
      });
    }

    if (category !== "All Categories") {
      result = result.filter(
        (product) =>
          String(product.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (sort === "price-high") {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    }

    return result;
  }, [products, search, category, sort]);

  // Format price in Pakistani Rupees.
  const formatPrice = (price) => {
    const amount = Number(price);

    if (!Number.isFinite(amount)) {
      return "Price unavailable";
    }

    return `Rs. ${amount.toLocaleString("en-PK")}`;
  };

  // Clear search and filters.
  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setSort("newest");
    router.replace("/products");
  };

  // Add product to cart.
  const handleAddToCart = (product) => {
    const productId = product._id || product.id;

    if (!productId) return;

    if (
      product.stock !== undefined &&
      Number(product.stock) <= 0
    ) {
      return;
    }

    addToCart(product);
    setAddedProductId(String(productId));

    setTimeout(() => {
      setAddedProductId((current) =>
        current === String(productId) ? "" : current
      );
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
      {/* HEADER */}
      <section className="bg-blue-950 px-5 py-10 text-white sm:py-14">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-6 flex items-center gap-2 text-sm text-blue-100 transition hover:text-orange-300"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <p className="font-semibold uppercase tracking-widest text-orange-400">
            Discover Marketora
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Explore Products
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-blue-100">
            Search products, explore categories and find what
            you need in the Marketora marketplace.
          </p>

          {/* SEARCH */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center"
          >
            <Search className="ml-2 hidden shrink-0 text-gray-400 sm:block" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or category..."
              aria-label="Search products"
              className="min-w-0 flex-1 rounded-xl px-3 py-3 text-gray-800 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* PRODUCTS AND FILTERS */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {category === "All Categories"
                ? "All Products"
                : `${category} Products`}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} product(s) found`}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 font-semibold text-gray-700 transition hover:border-orange-300 disabled:opacity-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[240px_1fr]">
          {/* FILTER SIDEBAR */}
          <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <SlidersHorizontal
                size={20}
                className="text-orange-500"
              />

              <h3 className="text-lg font-bold text-gray-900">
                Filters
              </h3>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label className="mb-2 mt-5 block text-sm font-semibold text-gray-700">
              Sort Products
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 w-full rounded-xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Clear Filters
            </button>
          </aside>

          {/* PRODUCT GRID */}
          <div>
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-700">
                <p className="font-semibold">{error}</p>

                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-3 font-bold underline"
                >
                  Try Again
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse overflow-hidden rounded-2xl bg-white"
                  >
                    <div className="h-52 bg-gray-200" />

                    <div className="space-y-3 p-5">
                      <div className="h-4 rounded bg-gray-200" />
                      <div className="h-4 w-1/2 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !error && filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
                <Package
                  size={48}
                  className="mx-auto mb-4 text-gray-400"
                />

                <h3 className="text-xl font-bold text-gray-800">
                  No Products Found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try another search or select a different category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  Show All Products
                </button>
              </div>
            ) : !error ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => {
                  const productId = product._id || product.id;
                  const saved = isWishlisted(productId);
                  const idString = String(productId || "");
                  const justAdded = addedProductId === idString;

                  const alreadyInCart = cartItems.some(
                    (item) =>
                      String(item._id || item.id) === idString
                  );

                  const outOfStock =
                    product.stock !== undefined &&
                    Number(product.stock) <= 0;

                  return (
                    <motion.article
                      key={productId || index}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(index * 0.04, 0.3),
                      }}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* PRODUCT IMAGE + FAVORITES */}
                      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/products/${productId}`)
                          }
                          className="h-full w-full"
                          aria-label={`View ${product.name || "product"}`}
                        >
                          <img
                            src={product.image || "/product-image.jpg"}
                            alt={product.name || "Marketora product"}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/product-image.jpg";
                            }}
                            className="h-full w-full object-contain p-3"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          disabled={!wishlistLoaded || !productId}
                          aria-label={
                            saved
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          title={
                            saved
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-md transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 ${
                            saved
                              ? "text-red-500"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            size={20}
                            className={saved ? "fill-current" : ""}
                          />
                        </button>
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="p-5">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                          {product.category || "General"}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/products/${productId}`)
                          }
                          className="mt-3 block w-full truncate text-left text-lg font-bold text-gray-900 hover:text-orange-600"
                        >
                          {product.name || "Untitled Product"}
                        </button>

                        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                          {product.description ||
                            "No description available."}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                          <p className="text-xl font-extrabold text-green-600">
                            {formatPrice(product.price)}
                          </p>

                          <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                            {outOfStock
                              ? "Out of Stock"
                              : Number(product.stock) > 0
                                ? "In Stock"
                                : "Check Availability"}
                          </span>
                        </div>

                        {/* VIEW PRODUCT + ADD TO CART */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/products/${productId}`)
                            }
                            className="rounded-xl border border-orange-200 px-3 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
                          >
                            View Product
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            disabled={!productId || outOfStock}
                            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ShoppingCart size={17} />

                            {justAdded
                              ? "Added!"
                              : alreadyInCart
                                ? "Add More"
                                : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
