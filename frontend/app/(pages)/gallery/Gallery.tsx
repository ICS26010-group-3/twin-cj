import React from "react";
import Image from "next/image";
import styles from "./gallery.module.scss";

interface GalleryProps {
  images: {
    src: string;
    type: "square" | "landscape" | "portrait";
    name: string;
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.imageContainer} ${styles[image.type]}`}
          >
            <Image
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />

            <div className={styles.overlay}>
              <span className={styles.imageName}>{image.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
