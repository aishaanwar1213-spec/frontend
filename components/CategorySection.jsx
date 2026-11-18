
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function CategorySection() {
  const router = useRouter();

  const categories = [
    {
      name: "Mobiles",
      image: "/categories/mobile.jpg",
    },
    {
      name: "Electronics",
      image: "/categories/electronics.jpg",
    },
    {
      name: "Fashion",
      image: "/categories/fashion.jpg",
    },
    {
      name: "Home & Living",
      image: "/categories/home.jpg",
    },
    {
      name: "Vehicles",
      image: "/categories/car.jpg",
    },
    {
      name: "Gaming",
      image: "/categories/gaming.jpg",
    },
    {
      name: "Accessories",
      image: "/categories/accessories.jpg",
    },
    {
      name: "Books",
      image: "/categories/books.jpg",
    },
    {
      name: "Sports",
      image: "/categories/gaming.jpg",
    },
    {
      name: "Beauty",
      image: "/categories/fashion.jpg",
    },
  ];

  return (
    <section className="px-4 py-8 md:px-8">
      {/* SECTION HEADER */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Discover Marketora
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-800 md:text-3xl">
            Explore Categories
          </h2>
        </div>

        <button
          type="button"
          onClick={() => router.push("/products")}
          className="shrink-0 font-semibold text-blue-700 transition hover:text-orange-500 hover:underline"
        >
          View All
        </button>
      </div>

      {/* CATEGORY CAROUSEL */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={14}
        slidesPerView={2}
        loop={true}
        speed={700}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={cat.name}>
            <motion.button
              type="button"
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                router.push(
                  `/products?category=${encodeURIComponent(cat.name)}`
                )
              }
              className="mb-2 w-full cursor-pointer rounded-xl border border-gray-100 bg-white p-3 text-center shadow-md transition hover:border-orange-200 hover:shadow-lg"
            >
              <div className="mx-auto h-16 w-16 overflow-hidden rounded-full bg-orange-50 sm:h-20 sm:w-20">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/product-image.jpg";
                  }}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-700 transition hover:text-orange-600">
                {cat.name}
              </h3>
            </motion.button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
