import React from "react";
import styles from "./tips.module.scss";
import Image from "next/image";

import tip1 from "@/public/assets/5.png";
import tip2 from "@/public/assets/6.png";
import tip3 from "@/public/assets/7.png";
import tip4 from "@/public/assets/8.png";

const tips = [
  {
    img: tip1,
    title: "Pack Reusables",
    subtext: "Carry water bottles and bags to reduce plastic waste.",
  },
  {
    img: tip2,
    title: "Bring Your Own",
    subtext:
      "Use reusable utensils, plates, and mugs to avoid single-use plastics.",
  },
  {
    img: tip3,
    title: "Save Energy",
    subtext: "Turn off lights and use natural lighting when possible.",
  },
  {
    img: tip4,
    title: "Sort Waste",
    subtext: "Dispose responsibly by sorting recyclables and compostables.",
  },
];

const Tips: React.FC = () => {
  return (
    <div className={styles.tips}>
      {tips.map(({ img, title, subtext }, index) => (
        <div key={index} className={styles.tipBox}>
          <Image
            src={img}
            alt={title}
            width={100}
            height={100}
            className={styles.tipImage}
          />
          <h4>{title}</h4>
          <p>{subtext}</p>
        </div>
      ))}
    </div>
  );
};

export default Tips;
