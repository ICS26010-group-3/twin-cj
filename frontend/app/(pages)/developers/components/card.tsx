import s from "./card.module.scss";
import Image from "next/image";

type CardProps = {
  name: string;
  description: string;
  imageUrl: string;
};

const Card = ({ name, description, imageUrl }: CardProps) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className="">
          <div className={s["image-wrapper"]}>
            <Image
              src={imageUrl}
              fill
              alt="dev image"
            />
          </div>
        </div>
        <div className="">
          <h2 className={s['card-title']}>{name}</h2>
          <p className={s['card-description']}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
