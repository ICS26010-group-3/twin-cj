// import styles from "./page.module.scss";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <h1>Test Page</h1>
//     </div>
//   );
// }

/* to be transferred to booking_status/page.tsx */

import BookingStatusDetails from "./components/BookingStatusDetails";
import BookingStatusIntro from "./components/BookingStatusIntro";
import BookingStatusPrintButton from "./components/BookingStatusPrintButton";
import BookingStatusReference from "./components/BookingStatusReference";
import BookingStatusDetailsReupload from "./components/BookingStatusReupload";
import HeroImage from "./components/HeroImage";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroImage imageURL="View Booking Status Hero.png" />
      <BookingStatusIntro />
      <BookingStatusReference />
      <BookingStatusDetails headingTitle="Oops! There was an issue with your Booking :(" headingDescription="Unfortunately, your booking request has been rejected due to an issue with the payment verification process." status="Re-upload Payment Screenshot" statusColor="red" />
      <BookingStatusPrintButton />
      <BookingStatusDetailsReupload />
    </div>
  );
}
