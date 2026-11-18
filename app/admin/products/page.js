
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Save,
  Boxes,
  Store,
} from "lucide-react";

const API = "http://localhost:5000/api/products";

const CATEGORIES = [
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

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "0",
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [newImages, setNewImages] = useState([]);
  const [newVideo, setNewVideo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API, {
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Products load nahi hue.");
      }

      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Backend se connection nahi hua.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();

    return (
      (product.name || "").toLowerCase().includes(term) ||
      (product.category || "").toLowerCase().includes(term)
    );
  });

  function openEdit(product) {
    setEditing(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price ?? ""),
      category: product.category || "",
      stock: String(product.stock ?? 0),
    });
    setNewImages([]);
    setNewVideo(null);
    setError("");
    setMessage("");
  }

  function closeEdit() {
    setEditing(null);
    setForm(emptyForm);
    setNewImages([]);
    setNewVideo(null);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImagesChange(event) {
    const files = Array.from(event.target.files || []);

    setError("");
    setMessage("");

    if (files.length > 8) {
      setError("Ek dafa mein maximum 8 new images select karein.");
      event.target.value = "";
      return;
    }

    for (const file of files) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Images sirf JPG, PNG ya WEBP format mein hon.");
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: image maximum 5 MB honi chahiye.`);
        event.target.value = "";
        return;
      }
    }

    setNewImages(files);
    event.target.value = "";
  }

  function handleVideoChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setMessage("");

    if (!file) return;

    if (
      !["video/mp4", "video/webm", "video/quicktime"].includes(file.type)
    ) {
      setError("Video MP4, WEBM ya MOV format mein honi chahiye.");
      event.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("Video maximum 50 MB honi chahiye.");
      event.target.value = "";
      return;
    }

    setNewVideo(file);
    event.target.value = "";
  }

  async function handleUpdate(event) {
    event.preventDefault();
    if (!editing) return;

    setError("");
    setMessage("");

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      setError("Name, description aur category zaroori hain.");
      return;
    }

    if (form.price === "" || !Number.isFinite(Number(form.price)) || Number(form.price) < 0) {
      setError("Valid price enter karein.");
      return;
    }

    if (
      form.stock === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      setError("Stock zero ya positive whole number hona chahiye.");
      return;
    }

    setSaving(true);

    try {
      const body = new FormData();

      body.append("name", form.name.trim());
      body.append("description", form.description.trim());
      body.append("price", form.price);
      body.append("category", form.category);
      body.append("stock", form.stock);

      // If new images are selected, they replace the existing gallery.
      newImages.forEach((file) => body.append("images", file));

      // If no new video is selected, the existing video is kept.
      if (newVideo) body.append("video", newVideo);

      const response = await fetch(`${API}/${editing._id}`, {
        method: "PUT",
        credentials: "include",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product update nahi hua.");
      }

      setMessage("Product successfully update ho gaya!");
      closeEdit();
      await fetchProducts();
      setMessage("Product successfully update ho gaya!");
    } catch (err) {
      setError(err.message || "Product update nahi hua.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Kya aap "${product.name}" ko permanently delete karna chahti hain?`
    );

    if (!confirmed) return;

    setDeletingId(product._id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/${product._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product delete nahi hua.");
      }

      setProducts((previous) =>
        previous.filter((item) => item._id !== product._id)
      );

      setMessage("Product successfully delete ho gaya!");

      if (editing?._id === product._id) closeEdit();
    } catch (err) {
      setError(err.message || "Product delete nahi hua.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-blue-900 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <header className="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-blue-950 p-6 text-white sm:flex-row sm:items-center md:p-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-orange-400">
              <Store size={25} />
              <span className="font-bold">MARKETORA ADMIN</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Manage Products
            </h1>
            <p className="mt-2 text-blue-200">
              Products, prices aur inventory yahan manage karein.
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600"
          >
            <PlusCircle size={20} />
            Add Product
          </Link>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Package size={26} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  {loading ? "..." : products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                <Boxes size={26} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Units in Stock</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  {loading
                    ? "..."
                    : products.reduce(
                        (total, product) => total + (Number(product.stock) || 0),
                        0
                      )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name or category..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <Package size={42} className="mx-auto mb-3 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-800">
              No products found
            </h2>
            <p className="mt-2 text-gray-500">
              Search change karein ya naya product add karein.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => {
                    const image =
                      product.images?.[0] || product.image || "";

                    const stock = Number(product.stock) || 0;

                    return (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {image ? (
                              <img
                                src={image}
                                alt={product.name}
                                className="h-14 w-14 rounded-xl border border-gray-200 bg-white object-contain"
                              />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                                <Package className="text-gray-400" />
                              </div>
                            )}

                            <div className="max-w-56">
                              <p className="font-bold text-gray-900">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                ID: {product._id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 font-bold text-gray-900">
                          Rs. {Number(product.price || 0).toLocaleString("en-PK")}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              stock === 0
                                ? "bg-red-100 text-red-700"
                                : stock <= 5
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {stock === 0
                              ? "Out of stock"
                              : stock <= 5
                              ? `Low: ${stock}`
                              : stock}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(product)}
                              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                            >
                              <Pencil size={15} />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(product)}
                              disabled={deletingId === product._id}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 size={15} />
                              {deletingId === product._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
            <div className="mx-auto my-6 max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between bg-blue-950 p-5 text-white">
                <div>
                  <h2 className="text-xl font-bold">Edit Product</h2>
                  <p className="mt-1 text-sm text-blue-200">
                    Details aur stock update karein.
                  </p>
                </div>

                <button
                  onClick={closeEdit}
                  className="rounded-lg p-2 hover:bg-blue-900"
                  aria-label="Close edit form"
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 p-5 sm:p-7">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Price (Rs.)
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Stock Quantity
                    </label>
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={handleFormChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
                  >
                    {!CATEGORIES.includes(form.category) && form.category && (
                      <option value={form.category}>{form.category}</option>
                    )}
                    <option value="">Select category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="font-semibold text-gray-800">
                    Replace product pictures (optional)
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Agar new images select karein, to existing gallery replace ho jayegi. Select na karein to current images rahengi.
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImagesChange}
                    className="mt-3 block w-full text-sm text-gray-700"
                  />
                  {newImages.length > 0 && (
                    <p className="mt-2 text-sm font-semibold text-orange-700">
                      {newImages.length} new image(s) selected
                    </p>
                  )}
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="font-semibold text-gray-800">
                    Replace product video (optional)
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    New video select karne par purani video replace hogi. Select na karein to current video rahegi.
                  </p>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleVideoChange}
                    className="mt-3 block w-full text-sm text-gray-700"
                  />
                  {newVideo && (
                    <p className="mt-2 break-all text-sm font-semibold text-blue-700">
                      Selected: {newVideo.name}
                    </p>
                  )}
                </div>

                {error && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={closeEdit}
                    disabled={saving}
                    className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 disabled:opacity-60"
                  >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
