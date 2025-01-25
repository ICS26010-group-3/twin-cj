// import styles from "./page.module.scss";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <h1>Test Page</h1>
//     </div>
//   );
// }

/* to be transferred to booking_status/page.tsx */

import BookingStatusForm from "./components/BookingStatusForm";
import BookingStatusIntro from "./components/BookingStatusIntro";
import HeroImage from "./components/HeroImage";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroImage imageURL="View Booking Status Hero.png" />
      <BookingStatusIntro />
      <BookingStatusForm />
    </div>
  );
}
