
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PackagePlus,
  Store,
  ImagePlus,
  X,
  Video,
  PlayCircle,
} from "lucide-react";

const MAX_IMAGES = 8;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export default function AddProductPage() {
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

  useEffect(() => {
    return () => {
      images.forEach((item) => URL.revokeObjectURL(item.preview));
      if (video?.preview) URL.revokeObjectURL(video.preview);
    };
  }, [images, video]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImagesChange(event) {
    const selectedFiles = Array.from(event.target.files || []);

    setError("");
    setMessage("");

    if (!selectedFiles.length) return;

    const currentInput = event.target;

    if (images.length + selectedFiles.length > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images select kar sakti hain.`);
      currentInput.value = "";
      return;
    }

    for (const file of selectedFiles) {
      if (!IMAGE_TYPES.includes(file.type)) {
        setError("Sirf JPG, PNG aur WEBP images allowed hain.");
        currentInput.value = "";
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        setError(`${file.name}: image 5 MB se chhoti honi chahiye.`);
        currentInput.value = "";
        return;
      }
    }

    setImages((previous) => [
      ...previous,
      ...selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      })),
    ]);

    currentInput.value = "";
  }

  function removeImage(id) {
    setImages((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function handleVideoChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setMessage("");

    if (!file) return;

    if (!VIDEO_TYPES.includes(file.type)) {
      setError("Sirf MP4, WEBM aur MOV videos allowed hain.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setError("Video 50 MB ya us se chhoti honi chahiye.");
      event.target.value = "";
      return;
    }

    setVideo({
      file,
      preview: URL.createObjectURL(file),
    });

    event.target.value = "";
  }

  function removeVideo() {
    setVideo(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (images.length === 0) {
      setError("Kam az kam ek product picture select karein.");
      return;
    }

    if (!form.name.trim() || !form.description.trim()) {
      setError("Product name aur description enter karein.");
      return;
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setError("Valid product price enter karein.");
      return;
    }

    if (
      form.stock === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      setError("Valid stock quantity enter karein.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      images.forEach((item) => {
        formData.append("images", item.file);
      });

      if (video) {
        formData.append("video", video.file);
      }

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Product add nahi ho saka."
        );
      }

      setMessage("Product, pictures aur video successfully save ho gaye!");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "1",
      });

      setImages([]);
      setVideo(null);
    } catch (err) {
      setError(
        err.message || "Backend se connection nahi ho saka."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-5 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 font-medium text-blue-800 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="bg-blue-950 p-7 text-white md:p-9">
            <div className="mb-4 flex items-center gap-3">
              <Store size={30} className="text-orange-400" />
              <span className="text-xl font-bold">Marketora</span>
            </div>

            <h1 className="text-3xl font-extrabold">
              Add New Product
            </h1>

            <p className="mt-2 text-blue-200">
              Product ki details, pictures aur video add karein.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 md:p-9"
          >
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Product Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Wireless Headphones"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your product..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Price (Rs.) *
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="2500"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="">Select category</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>
            </div>

            {/* Multiple product images */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Product Pictures * (Maximum 8)
              </label>

              <label
                htmlFor="product-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-orange-500 hover:bg-orange-50"
              >
                <ImagePlus
                  size={36}
                  className="mb-3 text-orange-500"
                />

                <span className="font-semibold text-gray-700">
                  Choose product pictures
                </span>

                <span className="mt-1 text-sm text-gray-500">
                  JPG, PNG or WEBP · Maximum 5 MB each
                </span>

                <input
                  id="product-images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImagesChange}
                  className="sr-only"
                />
              </label>

              <p className="mt-2 text-sm text-gray-500">
                Selected: {images.length}/{MAX_IMAGES}
              </p>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {images.map((item, index) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-xl border border-gray-200 p-2"
                    >
                      <img
                        src={item.preview}
                        alt={`Product preview ${index + 1}`}
                        className="h-32 w-full rounded-lg object-contain"
                      />

                      <p className="mt-2 truncate text-xs text-gray-500">
                        {item.file.name}
                      </p>

                      {index === 0 && (
                        <p className="mt-1 text-xs font-semibold text-orange-600">
                          Main picture
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(item.id)}
                        className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-600"
                      >
                        <X size={15} />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Optional product video */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Product Video (Optional)
              </label>

              <label
                htmlFor="product-video"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-6 text-center transition hover:border-orange-500 hover:bg-orange-50"
              >
                <Video
                  size={36}
                  className="mb-3 text-blue-800"
                />

                <span className="font-semibold text-gray-700">
                  Choose product video
                </span>

                <span className="mt-1 text-sm text-gray-500">
                  MP4, WEBM or MOV · Maximum 50 MB
                </span>

                <input
                  id="product-video"
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoChange}
                  className="sr-only"
                />
              </label>

              {video && (
                <div className="mt-4 rounded-2xl border border-gray-200 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 font-semibold text-gray-700">
                      <PlayCircle size={18} className="text-orange-500" />
                      Video Preview
                    </p>

                    <button
                      type="button"
                      onClick={removeVideo}
                      className="flex items-center gap-1 text-sm font-semibold text-red-600"
                    >
                      <X size={16} />
                      Remove
                    </button>
                  </div>

                  <video
                    src={video.preview}
                    controls
                    playsInline
                    className="max-h-72 w-full rounded-xl bg-black"
                  />

                  <p className="mt-2 break-all text-sm text-gray-500">
                    {video.file.name}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Stock Quantity *
              </label>

              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PackagePlus size={21} />
              {loading ? "Uploading Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
