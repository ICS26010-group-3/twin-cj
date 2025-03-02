import BookingStatusDetails from "../components/BookingStatusDetails";
import BookingStatusPrintButton from "../components/BookingStatusPrintButton";
import BookingStatusReference from "../components/BookingStatusReference";
import BookingStatusDetailsReupload from "../components/BookingStatusReupload";
import Hero from "../components/Hero";
import styles from "../page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero
        imageURL="/view-booking-status-hero.png"
        height="335px"
        marginBottom="65px"
      ></Hero>
      <BookingStatusReference />
      <BookingStatusDetails status="Approved" />
      <BookingStatusPrintButton />
      <BookingStatusDetailsReupload />
    </div>
  );
}
