"use client";

import React, { useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import Image from "next/image";
import MediaBanner from "@/app/components/mediaBanner";
import FeatureIcons from "./featureIcons";
import CardContainer from "./cardContainer";
import styles from "./page.module.scss";
import Tips from "./tips";
import reusableImage from "@/public/assets/reusable.jpg";
import kitchenImage from "@/public/assets/kitchen.jpg";
import rivertentImage from "@/public/assets/rivertent.jpg";
import owntentImage from "@/public/assets/owntent.jpg";
import foodImage from "@/public/assets/food.png";
import bonfireImage from "@/public/assets/bonfire1.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const sdg15Images = [
  "/assets/sdg15-1.jpg",
  "/assets/sdg15-2.jpg",
  "/assets/sdg15-3.jpg",
  "/assets/sdg15-4.jpg",
  "/assets/sdg15-5.jpg",
];

const SmallCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [progress, setProgress] = useState(0);

  return (
    <div className={styles.smallCarousel}>
      <Swiper
        key={images.join(",")}
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        loop
        onSlideChange={(swiper) => {
          setProgress(((swiper.realIndex + 1) / images.length) * 100);
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className={styles.imageWrapperSmall}>
              <Image
                src={img}
                alt={`SDG 15 Image ${i + 1}`}
                fill
                sizes="500px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles.prev}>&#10094;</button>
      <button className={styles.next}>&#10095;</button>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className={styles.header}>
    <Image
      src={"/assets/sdg15-2.jpg"}
      alt="Header"
      fill
      className={styles.image}
    />
  </header>
);

export default function EcoTourism() {
  const EcoCards = [
    {
      title: "Reusable Utensils & Cookware",
      image: reusableImage,
      description:
        "Reusable utensils, plates, cookware, and mugs are provided in all common areas — helping eliminate single-use plastics and promote responsible dining.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
    {
      title: "Common Kitchen",
      image: kitchenImage,
      description:
        "Guests prepare meals in our communal kitchen, minimizing packaging waste and encouraging shared sustainable practices.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
    {
      title: "Riverside Eco-Tents",
      image: rivertentImage,
      description:
        "Eco-tents by the river are made using natural, biodegradable materials — including wood frames, abaca or nipa roofs, and stone foundations that blend with nature.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
    {
      title: "Bring Your Own Tent",
      image: owntentImage,
      description:
        "Visitors are welcome to bring their own tents, reducing the need for new materials and encouraging low-impact camping experiences.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
    {
      title: "Cooking with Charcoal ('Uling')",
      image: foodImage,
      description:
        "Many guests choose traditional, low-energy charcoal (uling) cooking — a practical and resource-conscious method aligned with local culture.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
    {
      title: "Bonfire with Natural Materials",
      image: bonfireImage,
      description:
        "Campfires are built using sustainably gathered firewood (fallen branches only) and river rocks — preserving the ecosystem and using natural materials already present on-site.",
      rates: [],
      additionalInfo: [],
      galleryImages: [],
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <SectionHeader title="ECO-TOURISM PRACTICES" />
        <MediaBanner
          mediaSrc="/assets/home_cover.mp4"
          mediaType="video"
          altText="Eco-Tourism Banner Video"
        />
        <section className={styles.beInvolvedSection}>
          <Tips />
        </section>
        <section className={styles.amenitiesSection}>
          <div className={styles.commitmentBackgroundFullWidth}>
            <div className="container">
              <SectionHeader title="Our Commitment to Sustainable Tourism" />
              <p className={styles.description}>
                Twin CJ Riverside Glamping Resort is more than just a getaway,
                it’s a promise to protect the environment, empower local
                communities, and promote mindful travel. We proudly support the
                UN Sustainable Development Goals (SDGs), SDG 12: Responsible
                Consumption and Production, and SDG 15: Life on Land.
              </p>

              <FeatureIcons />
            </div>
          </div>

          {/* SDG 12 Section */}
          <section id="sdg-12" className={styles.sdgSection}>
            <div className={styles.sdgInfo}>
              <h3>
                ♻️{" "}
                <span className={styles.sdgTag}>
                  SDG 12: RESPONSIBLE CONSUMPTION AND PRODUCTION
                </span>
              </h3>
              <p>
                Creating a resort experience that reduces waste, supports local
                resources, and promotes sustainable living.
              </p>
            </div>
            <CardContainer cards={EcoCards} />
          </section>

          {/* SDG 15 Section */}
          <div id="sdg-15" className={styles.sdgSection}>
            <div className={styles.sdgInfo}>
              <h3>
                🌳 <span className={styles.sdgTag}>SDG 15: LIFE ON LAND</span>
              </h3>
              <p>
                Preserving ecosystems and encouraging appreciation of the
                natural environment.
              </p>
            </div>
            <section className={styles.sdgSectionRow}>
              <SmallCarousel images={sdg15Images} />
              <div className={styles.sdgInfoRight}>
                <ul className={styles.bulletList}>
                  <li>
                    🌳 <strong>Eco-Conscious Infrastructure</strong>
                    <ul>
                      <li>
                        Tents are spaced to minimize land disruption and soil
                        compaction
                      </li>
                      <li>Minimal concrete or permanent construction</li>
                      <li>
                        Elevated walkways or natural trails help avoid erosion
                      </li>
                    </ul>
                  </li>
                  <li>
                    🚣 <strong>Nature-Based Activities</strong>
                    <ul>
                      <li>
                        Kayaking experience on the river introduces guests to
                        local biodiversity and the importance of freshwater
                        ecosystems
                      </li>
                    </ul>
                  </li>
                  <li>
                    🌱 <strong>Habitat-Friendly Practices</strong>
                    <ul>
                      <li>
                        Natural construction materials (abaca roofs, bamboo,
                        stones) help reduce carbon footprint and blend with the
                        environment
                      </li>
                      <li>
                        No cutting of live trees for resort purposes — dead wood
                        only used for campfires
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
