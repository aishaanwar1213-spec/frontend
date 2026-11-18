
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Package,
  Image as ImageIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { addToCart, cartItems = [] } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // Fetch product
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Products load nahi ho sake.");
        }

        const data = await response.json();

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];

        const found = products.find(
          (item) => String(item._id) === String(id)
        );

        if (cancelled) return;

        if (!found) {
          setProduct(null);
          setError("Yeh product available nahi hai.");
          return;
        }

        setProduct(found);

        const images =
          Array.isArray(found.images) && found.images.length
            ? found.images
            : found.image
              ? [found.image]
              : [];

        setSelectedImage(images[0] || "");
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Kuch ghalat ho gaya.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const images =
    Array.isArray(product?.images) && product.images.length
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  const activeImage = images.includes(selectedImage)
    ? selectedImage
    : images[0] || "";

  const stock = Number(product?.stock ?? 0);
  const price = Number(product?.price ?? 0);

  const inCart = product
    ? cartItems.some(
        (item) =>
          String(item._id || item.id) === String(product._id)
      )
    : false;

  function handleAddToCart() {
    if (!product || stock <= 0 || quantity > stock) return;

    if (inCart) {
      router.push("/cart");
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price,
      image: product.image || images[0] || "",
      images: product.images || [],
      video: product.video || "",
      category: product.category,
      description: product.description,
      quantity,
    });

    setAdded(true);
  }

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading product details...
          </p>
        </div>
      </main>
    );
  }

  // Error
  if (error || !product) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#f8f9fb] px-5 text-center">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <Package size={40} className="mx-auto text-orange-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {error || "This product is currently unavailable."}
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={17} />
            Back to products
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-10">
        {/* Main Product Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* LEFT: Gallery */}
          <section className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-sm md:p-5">
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-[#f7f7f8] p-5 sm:min-h-[430px] md:min-h-[500px]">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="max-h-[470px] w-full object-contain transition duration-300"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon size={52} className="mx-auto" />
                    <p className="mt-3 text-sm">
                      No product image available
                    </p>
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-full border border-gray-100 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
                  Marketora Collection
                </span>

                {product.video && (
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-gray-900/85 px-3 py-2 text-xs font-semibold text-white">
                    <PlayCircle size={15} />
                    Video available
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label={`Show image ${index + 1}`}
                      className={`flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-xl border-2 bg-white p-1.5 transition sm:h-[88px] sm:w-[88px] ${
                        activeImage === image
                          ? "border-orange-500 ring-2 ring-orange-100"
                          : "border-gray-100 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Video Section */}
            {product.video && (
              <div className="mt-5 overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <PlayCircle size={22} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">
                      See it in action
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Watch the product video
                    </p>
                  </div>
                </div>

                <video
                  src={product.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="max-h-[420px] w-full rounded-2xl bg-black"
                >
                  Your browser does not support video playback.
                </video>
              </div>
            )}
          </section>

          {/* RIGHT: Product Details */}
          <section className="min-w-0">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 md:p-9">
              {/* Category and Availability */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                  {product.category || "General"}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                    stock > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      stock > 0 ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                  {stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>

              {/* Name */}
              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                {product.name || "Untitled Product"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Quality products, thoughtfully selected for you.
              </p>

              {/* Price */}
              <div className="mt-6 border-b border-gray-100 pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Our price
                </p>

                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Rs. {price.toLocaleString("en-PK")}
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    PKR
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="py-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Product description
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                  {product.description ||
                    "Product details will be updated soon."}
                </p>
              </div>

              {/* Quantity Selector */}
              {stock > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 py-5">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Quantity
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Select your quantity
                    </p>
                  </div>

                  <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => {
                        setQuantity((q) => Math.max(1, q - 1));
                        setAdded(false);
                      }}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-10 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled={quantity >= stock}
                      onClick={() => {
                        setQuantity((q) => Math.min(stock, q + 1));
                        setAdded(false);
                      }}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Total */}
              {stock > 0 && (
                <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    Rs. {(price * quantity).toLocaleString("en-PK")}
                  </span>
                </div>
              )}

              {/* Add to Cart */}
              <button
                type="button"
                disabled={stock <= 0}
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-orange-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {inCart ? (
                  <>
                    <CheckCircle2 size={20} />
                    Go to Cart
                  </>
                ) : added ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {stock > 0 ? "Add to Cart" : "Currently Unavailable"}
                  </>
                )}
              </button>

              {/* Added Confirmation */}
              {added && (
                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 size={19} />
                    Product added to your cart!
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      href="/cart"
                      className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      View Cart
                    </Link>

                    <button
                      type="button"
                      onClick={() => router.push("/checkout")}
                      className="rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}

              {inCart && !added && (
                <p className="mt-3 text-center text-xs text-gray-500">
                  This product is already in your cart.
                </p>
              )}

              {/* Trust Information */}
              <div className="mt-7 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Delivery
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Details at checkout
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Secure shopping
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Shop with confidence
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Support
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Contact us for help
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Product Information */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Package size={23} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                About this product
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore the product images and video to learn more
                about this item. For availability, delivery and other
                questions, please contact the Marketora team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
