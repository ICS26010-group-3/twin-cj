"use client";
import React from "react";
import Image from "next/image";
import styles from "./featureicons.module.scss";

import sdg12Image from "@/public/assets/3.png";
import sdg15Image from "@/public/assets/2.png";

const items = [
  {
    image: sdg12Image,
    label: "SDG 12: Responsible Consumption and Production",
    id: "sdg-12",
  },
  {
    image: sdg15Image,
    label: "SDG 15: Life on Land",
    id: "sdg-15",
  },
];

const FeatureIcons: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.featureIcons}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleScroll(item.id)}
          role="button"
          tabIndex={0}
        >
          <div className={styles.text}>
            <p>{item.label}</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.label}
              width={100}
              height={100}
              className={styles.image}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureIcons;
