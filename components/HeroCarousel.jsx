"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


export default function HeroCarousel() {

  const banners = [
    "/banner-1.webp",
    "/banner-2.webp",
    "/banner-3.webp",
    "/banner-4.webp",
    "/banner-5.webp",
  ];


  return (

    <section className="w-full py-5">

      <Swiper

        modules={[Autoplay, Pagination]}

        slidesPerView={1}

        loop={true}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}

      >

        {
          banners.map((banner, index) => (

            <SwiperSlide key={index}>

              <div className="px-4 md:px-8">

                <img

                  src={banner}

                  alt={`banner-${index + 1}`}

                  className="
                  w-full
                  h-[250px]
                  md:h-[450px]
                  object-cover
                  rounded-3xl
                  "

                />

              </div>

            </SwiperSlide>

          ))
        }

      </Swiper>

    </section>

  );
}