
"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function FavoritesPage() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    wishlistLoaded,
  } = useWishlist();

  if (!wishlistLoaded) {
    return (
      <main className="flex-1 bg-gray-50 px-4 py-20 text-center">
        <p className="text-gray-500">Loading your favorites...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <Heart size={30} className="fill-red-500 text-red-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                My Favorites
              </h1>
            </div>

            <p className="text-gray-500">
              Your favorite products, all in one place.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="rounded-full border border-red-200 px-5 py-2.5
              text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <Heart size={36} className="text-orange-500" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              No favorites yet
            </h2>

            <p className="mx-auto mb-7 max-w-md text-gray-500">
              Explore Marketora and save the products you love by tapping
              the heart button.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full
              bg-orange-500 px-6 py-3 font-semibold text-white
              transition hover:bg-orange-600"
            >
              <ShoppingBag size={19} />
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-gray-500">
              {wishlist.length} saved{" "}
              {wishlist.length === 1 ? "product" : "products"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product) => {
                const productId = product._id || product.id;
                const imageSrc =
                  typeof product.image === "string" &&
                  product.image.trim() !== ""
                    ? product.image
                    : "/product-image.jpg";

                return (
                  <article
                    key={productId}
                    className="overflow-hidden rounded-2xl border
                    border-gray-100 bg-white shadow-sm transition
                    duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link
                      href={`/products/${productId}`}
                      className="relative block h-56 bg-gray-100"
                    >
                      <Image
                        src={imageSrc}
                        alt={product.name || "Marketora product"}
                        fill
                        sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                        unoptimized
                      />
                    </Link>

                    <div className="p-5">
                      <h2 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">
                        {product.name || "Untitled Product"}
                      </h2>

                      {product.category && (
                        <p className="mb-2 text-sm text-gray-500">
                          {product.category}
                        </p>
                      )}

                      <p className="mb-5 text-xl font-bold text-orange-600">
                        Rs. {Number(product.price || 0).toLocaleString()}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/products/${productId}`}
                          className="flex flex-1 items-center justify-center
                          rounded-full bg-orange-500 px-4 py-2.5
                          text-sm font-semibold text-white transition
                          hover:bg-orange-600"
                        >
                          View Product
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeFromWishlist(productId)}
                          aria-label={`Remove ${product.name || "product"} from favorites`}
                          title="Remove from favorites"
                          className="flex h-10 w-10 shrink-0 items-center
                          justify-center rounded-full border border-red-100
                          text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
