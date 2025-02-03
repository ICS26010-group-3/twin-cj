import BookingStatusDetails from "../components/BookingStatusDetails";
import BookingStatusIntro from "../components/BookingStatusIntro";
import BookingStatusPrintButton from "../components/BookingStatusPrintButton";
import BookingStatusReference from "../components/BookingStatusReference";
import BookingStatusDetailsReupload from "../components/BookingStatusReupload";
import HeroImage from "../components/HeroImage";
import styles from "../page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroImage imageURL="View Booking Status Hero.png" />
      <BookingStatusIntro />
      <BookingStatusReference />
      <BookingStatusDetails status="Approved" />
      <BookingStatusPrintButton />
      <BookingStatusDetailsReupload />
    </div>
  );
}
