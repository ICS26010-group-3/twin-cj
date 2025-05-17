"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./cardcontainer.module.scss";
import "swiper/css";
import "swiper/css/navigation";

interface CardProps {
  title: string;
  image: StaticImageData;
  description: string;
  rates: string[];
  additionalInfo: string[];
  galleryImages?: StaticImageData[];
}

const CardContainer: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  return (
    <>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            {card.image && (
              <div className={styles.cardImage}>
                <Image
                  src={card.image}
                  alt={card.description}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}

            <div className={styles.cardContent}>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardContainer;
