"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./cardcontainer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  image: StaticImageData;
  description: string;
  rates: string[];
  additionalInfo: string[];
  galleryImages?: StaticImageData[];
}

const CardContainer: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  const router = useRouter();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<StaticImageData[]>([]);

  const openGallery = (images: StaticImageData[]) => {
    setGalleryImages(images);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleBookNow = () => {
    router.replace("/booking");
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            {card.image && (
              <div className={styles.cardImage}>
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                />
                <h3>{card.title}</h3>
              </div>
            )}

            <div className={styles.cardContent}>
              <p>{card.description}</p>

              {card.rates.length > 0 && (
                <>
                  <strong>Rates:</strong>
                  <ul>
                    {card.rates.map((rate, idx) => (
                      <li key={idx}>{rate}</li>
                    ))}
                  </ul>
                </>
              )}

              {card.additionalInfo.length > 0 && (
                <>
                  <strong>Additional Inclusions:</strong>
                  <ul>
                    {card.additionalInfo.map((info, idx) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className={styles.buttons}>
              <button
                className={styles.morePhotos}
                onClick={() => openGallery(card.galleryImages || [card.image])}
              >
                More Photos
              </button>
              {index < 3 && (
                <button className={styles.bookNow} onClick={handleBookNow}>
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isGalleryOpen && (
        <div className={styles.galleryModal} onClick={closeGallery}>
          <div
            className={styles.galleryContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeGallery}>
              &times;
            </button>

            <Swiper
              navigation={{
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }}
              modules={[Navigation]}
              loop={true}
              className={styles.swiperContainer}
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className={styles.galleryImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.swiperNavigation}>
              <button className={styles.swiperButtonPrev}>&lt;</button>
              <button className={styles.swiperButtonNext}>&gt;</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardContainer;
