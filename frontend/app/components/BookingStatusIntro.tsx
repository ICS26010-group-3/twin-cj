import styles from "./BookingStatusIntro.module.scss";

const BookingStatusIntro = () => {
    return (
        <section className={`${styles["booking-status-intro-section"]}`}>
            <h2>VIEW YOUR BOOKING STATUS HERE</h2>
            <hr />
            <p>We are delighted to host you a memorable stay experience at Twin CJ Riverside Glamping Resort.</p>
            <p>We look forward to creating an unforgettable experience for you.</p>
        </section>
    );
};

export default BookingStatusIntro;
