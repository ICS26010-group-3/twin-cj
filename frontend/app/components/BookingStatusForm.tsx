import styles from "./BookingStatusForm.module.scss";

const BookingStatusForm = () => {
    return (
        <section className={`${styles["booking-status-form-section"]}`}>
            <div>
                <p>Please Enter Your Reference Number</p>
                <input placeholder="Enter Your Reference Number" />
                <button>CHECK STATUS</button>
            </div>
        </section>
    );
};

export default BookingStatusForm;
