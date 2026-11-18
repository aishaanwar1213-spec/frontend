
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  Upload,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const API = "http://localhost:5000/api/products";

const categories = [
  "Mobiles",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Vehicles",
  "Gaming",
  "Accessories",
  "Books",
  "Sports",
  "Beauty",
  "Furniture",
];

export default function PostAdPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "1",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImages(e) {
    const selected = Array.from(e.target.files || []);

    if (selected.length > 8) {
      setError("Maximum 8 images select karein.");
      e.target.value = "";
      return;
    }

    const invalid = selected.some(
      (file) =>
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 5 * 1024 * 1024
    );

    if (invalid) {
      setError("Sirf JPG, PNG ya WEBP images (maximum 5MB each) allowed hain.");
      e.target.value = "";
      setImages([]);
      return;
    }

    setError("");
    setImages(selected);
  }

  function handleVideo(e) {
    const selected = e.target.files?.[0];

    if (!selected) {
      setVideo(null);
      return;
    }

    if (
      !["video/mp4", "video/webm", "video/quicktime"].includes(
        selected.type
      ) ||
      selected.size > 50 * 1024 * 1024
    ) {
      setError("MP4, WEBM ya MOV video maximum 50MB upload karein.");
      e.target.value = "";
      setVideo(null);
      return;
    }

    setError("");
    setVideo(selected);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (images.length === 0) {
      setError("Product ki kam az kam 1 image select karein.");
      return;
    }

    if (Number(form.price) <= 0 || Number(form.stock) < 0) {
      setError("Price 0 se zyada aur stock 0 ya us se zyada hona chahiye.");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (video) {
      formData.append("video", video);
    }

    try {
      setLoading(true);

      const response = await fetch(API, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            data.error ||
            (response.status === 401 || response.status === 403
              ? "Admin login required hai. Pehle admin login karein."
              : "Product add nahi ho saka.")
        );
      }

      setMessage("Product successfully add ho gaya!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "1",
      });
      setImages([]);
      setVideo(null);

      e.target.reset();
    } catch (err) {
      setError(
        err.message ||
          "Backend se connection nahi ho raha. Server check karein."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Marketora
        </Link>

        <div className="mb-7 rounded-3xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white md:p-9">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500">
            <Package size={30} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-300">
            Marketora Seller
          </p>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            Add Your Product
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
            Apne product ki details enter karein aur usay Marketora
            inventory mein add karein.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-8"
        >
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              <XCircle size={20} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {message && (
            <div className="flex items-start gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle2 size={20} className="shrink-0" />
              <div>
                <p className="font-bold">{message}</p>
                <Link
                  href="/admin/products"
                  className="mt-1 inline-block underline"
                >
                  View all products
                </Link>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Product Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={120}
              placeholder="e.g. Wireless Bluetooth Headphones"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              maxLength={3000}
              rows={5}
              placeholder="Product ki condition, features aur details likhein..."
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Price (PKR) *
              </label>
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="e.g. 2500"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Available Stock *
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                required
                placeholder="e.g. 10"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Product Images * (Maximum 8)
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-orange-400 hover:bg-orange-50">
              <ImagePlus size={36} className="mb-3 text-orange-500" />
              <span className="font-bold text-slate-800">
                Choose product pictures
              </span>
              <span className="mt-2 text-xs text-slate-500">
                JPG, PNG or WEBP — maximum 5MB per image
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                required
                onChange={handleImages}
                className="mt-4 block w-full max-w-xs text-sm"
              />
            </label>

            {images.length > 0 && (
              <div className="mt-3 space-y-1 text-sm text-green-700">
                <p className="font-semibold">
                  {images.length} image(s) selected
                </p>
                {images.map((image, index) => (
                  <p key={`${image.name}-${index}`} className="truncate">
                    {image.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Product Video (Optional)
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideo}
              className="block w-full rounded-xl border border-slate-200 p-3 text-sm"
            />
            <p className="mt-2 text-xs text-slate-500">
              MP4, WEBM or MOV — maximum 50MB.
            </p>
            {video && (
              <p className="mt-2 text-sm text-green-700">
                Selected: {video.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={20} />
            {loading ? "Adding Product..." : "Add Product to Marketora"}
          </button>

          <p className="text-center text-xs leading-5 text-slate-500">
            Ye form aapke existing admin product API ko use karta hai.
            Admin authentication required hai.
          </p>
        </form>
      </div>
    </main>
  );
}
