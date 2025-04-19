import React, { memo } from "react";
import Image from "next/image";
import styles from "./bookingcard.module.scss";

interface BookingCardProps {
  title: string;
  description: string;
  price: string;
  // additionalPrice: string;
  imageSrc: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  description,
  price,
  imageSrc,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`${styles.bookingCard} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <input
        type="radio"
        className={styles.radio}
        checked={isSelected}
        onChange={onSelect}
      />
      <div className={styles.cardContent}>
        <div className={styles.textContent}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.priceDetails}>
            <span className={styles.price}>{price}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            height={300}
            width={300}
            src={imageSrc}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(BookingCard);
