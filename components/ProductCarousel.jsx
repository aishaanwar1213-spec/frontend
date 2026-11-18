
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

import "swiper/css";

export default function ProductCarousel() {
  const router = useRouter();

  const {
    toggleWishlist,
    isWishlisted,
    wishlistLoaded,
  } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Products load nahi ho sake.");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Backend se connection nahi ho saka.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  return (
    <section className="bg-gray-50 px-4 py-12 md:px-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Discover something new
          </p>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Trending Now
          </h2>
        </div>

        <button
          type="button"
          onClick={() => router.push("/products")}
          className="flex shrink-0 items-center gap-1 font-semibold text-orange-600 hover:text-orange-700"
        >
          View All <ArrowRight size={17} />
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-orange-500 px-5 py-2 font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center">
          <ShoppingCart
            size={38}
            className="mx-auto mb-3 text-gray-400"
          />

          <h3 className="text-xl font-bold text-gray-800">
            Products coming soon!
          </h3>

          <p className="mt-2 text-gray-500">
            Abhi koi product available nahi hai.
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-5 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Explore Marketplace
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          loop={products.length > 4}
          speed={700}
          autoplay={
            products.length > 1
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => {
            const productId = product._id || product.id;
            const saved = isWishlisted(productId);

            return (
              <SwiperSlide key={productId}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/products/${productId}`)
                      }
                      className="block w-full bg-gray-100 text-left"
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.image || "/product-image.jpg"}
                        alt={product.name || "Marketora product"}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/product-image.jpg";
                        }}
                        className="h-52 w-full object-cover sm:h-60"
                      />
                    </button>

                    {product.oldPrice &&
                      Number(product.oldPrice) > Number(product.price) && (
                        <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                          {Math.round(
                            ((Number(product.oldPrice) -
                              Number(product.price)) /
                              Number(product.oldPrice)) *
                              100
                          )}
                          % OFF
                        </span>
                      )}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      disabled={!wishlistLoaded}
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
                      className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-md transition hover:scale-110 disabled:opacity-60 ${
                        saved
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        size={19}
                        className={saved ? "fill-current" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="mb-1 text-xs font-medium uppercase text-orange-600">
                          {product.category || "General"}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/products/${productId}`)
                          }
                          className="line-clamp-1 text-left font-semibold text-gray-800 hover:text-orange-600"
                        >
                          {product.name}
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-lg font-bold text-green-600">
                      {formatPrice(product.price)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {Number(product.stock || 0) > 0
                        ? "In stock"
                        : "Out of stock"}
                    </p>

                    <button
                      type="button"
                      disabled={Number(product.stock || 0) <= 0}
                      onClick={() =>
                        router.push(`/products/${productId}`)
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      <ShoppingCart size={17} />
                      {Number(product.stock || 0) > 0
                        ? "View Product"
                        : "Out of Stock"}
                    </button>
                  </div>
                </motion.article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
