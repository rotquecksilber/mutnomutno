'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import Image from 'next/image';
import styles from './Swiper.module.css';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

interface CustomCarouselProps {
  pictures: string[];
}

// Инициализируем модули Swiper, если это необходимо
SwiperCore.use([Navigation, Pagination, Thumbs]);

const CustomCarousel: React.FC<CustomCarouselProps> = ({ pictures }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <div className={styles.carousel}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {pictures.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carousel__imageContainer}>
              <Image
                src={pic}
                alt={`Product Image ${index + 1}`}
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[Thumbs]}
        className={styles.thumbsSwiper}
      >
        {pictures.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carousel__thumbContainer}>
              <Image
                src={pic}
                alt={`Thumbnail Image ${index + 1}`}
                fill

                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomCarousel;
