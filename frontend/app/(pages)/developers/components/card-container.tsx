import React from "react";
import s from "./card-container.module.scss";
import Card from "./card";

const data = [
  {
    name: "Patricia Arellano",
    description: "Crafts seamless user interfaces and brings designs to life as a passionate Front-end Developer.",
    imageUrl:
      "https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-1/460847995_8778484838836431_3668418158057715064_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFBiW0WjNFIOFscx2ejtgzNF1g3kqQ64C4XWDeSpDrgLrBh5PU5F5c2DpXVRf7eaNLnKhOolnqhDRC06Tp6U41b&_nc_ohc=UdvAX8KtfAkQ7kNvwEzKwL_&_nc_oc=Adnp0jYQb7_Awj6x9qCPuxT7yfyjbLSCsmGrgn9UVH6YLhkNE93ubh6v2TphkE6ZzNs&_nc_zt=24&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=PojC4QySw6QdjOzTA7IJzA&oh=00_AfLjPBczF5vuwMtjfmtvdqLGC4LtwqZ2Ld5fNwP030qoUA&oe=682FBDE3",
  },
  {
    name: "Winfrey De Vera",
    description: "Strategically aligns tech solutions with real-world needs as a detail-oriented System Analyst.",
    imageUrl:
      "https://scontent.fmnl17-7.fna.fbcdn.net/v/t39.30808-1/462104623_888033906597475_5155456086057738522_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFBBNlrSYuah34fORTnuBkde9vs1GUW1P572-zUZRbU_mgeYP8iCNQ2cuxbZsHiIwWMAlaUiEKgi8I79iCaEPPM&_nc_ohc=wh7XqAsKTjEQ7kNvwEqcja3&_nc_oc=Adk1VgSY-5Tj5rwfr664d-Oqm7NWbp7S5v9PJ7U3sc9Cvb2jv8qw_DLYA_VU9oP2rqU&_nc_zt=24&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=kMbJV0WT5Cgk0YUDnkAtpg&oh=00_AfL6he8gnrAGZcjJIVK48w4m2aKviuI5NPesY71mQ_Wo3Q&oe=682FDD1C",
  },
  {
    name: "Kurt Duterte",
    description: "Builds robust and scalable systems behind the scenes as an expert Back-end Developer.",
    imageUrl:
      "https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.6435-9/43042922_1965599386849432_5389609852496510976_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGB45_g6yM17xe5Lpi-9iADTkj1WZpTbwNOSPVZmlNvCZtk-O0rzTV7UFhfU2VKPu0BDGztt7ry9A7ahc61RQj&_nc_ohc=_P4qzTA0K4sQ7kNvwEl-0YE&_nc_oc=AdngWZBJZHaz-wY7SYzh12i0cMcurIUL1eoGpu7Hy2TxssnPcs4DYwInGZQRwQSgI6Q&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=8P3lbQhhl-NgOa-Y0qpl5Q&oh=00_AfL5ccvAYFoX933ZR9g68CkMQ_G4E1KTm1sxkuci6Z8pQQ&oe=68515B2A",
  },
  {
    name: "Chrizelle Feliciano",
    description: "Turns concepts into interactive experiences with a keen eye for design as a Front-end Developer.",
    imageUrl:
      "https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-1/471523237_8991718510864014_14591750132560907_n.jpg?stp=c0.350.900.900a_dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFnub9QCPjFnrsFMXsrcZwyFOlGft0cGdwU6UZ-3RwZ3Foljel1svx7rCpbJH0XPKev1Wl9rEudOmckWIcTs6j9&_nc_ohc=4uyW3nCePoIQ7kNvwEYcAf1&_nc_oc=AdkHoCk66uq21KjFCLoBfIwe5ojDfaePOUA-QsombrCONaYMF4g4ulD4zftrK7jNUZI&_nc_zt=24&_nc_ht=scontent.fmnl17-4.fna&_nc_gid=Q7RQRoEVFIfaFVH2upSmYA&oh=00_AfJMsJ4FVQBsSmuGXP2bDQR2YRTLr9xkkP0DU6hcA8PX9w&oe=682FF1E9",
  },
];


const CardContainer = () => {
  return (
    <div className={s["card-container"]}>
      {data.map((developer) => (
        <Card
          key={developer.name}
          name={developer.name}
          description={developer.description}
          imageUrl={developer.imageUrl}
        />
      ))}
    </div>
  );
};

export default CardContainer;
