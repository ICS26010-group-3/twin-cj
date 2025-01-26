import styles from "./BookingStatusReference.module.scss";

const BookingStatusReference = () => {
    return (
        <section className={`${styles["booking-status-reference-section"]}`}>
            <div>
                <p>Please Enter Your Reference Number</p>
                <input placeholder="Enter Your Reference Number" />
                <button>CHECK STATUS</button>
            </div>
        </section>
    );
};

export default BookingStatusReference;
