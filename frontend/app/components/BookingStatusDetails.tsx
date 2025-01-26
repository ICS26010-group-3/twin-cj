import styles from "./BookingStatusDetails.module.scss";

const BookingStatusDetails = () => {
    return (
        <section className={`${styles["booking-status-details-section"]}`}>
            <div className={`${styles["booking-status-details-container"]}`}>
                <div className={`${styles["booking-status-details-container-heading"]}`}>
                    <h3>You’re Officially Booked!</h3>
                    <h4>Thank you for choosing us for your stay! Below are your booking details:</h4>
                </div>
                <hr />
                <div className={`${styles["booking-status-details-container-sub"]}`}>
                    <div className={`${styles["booking-status-details-left"]}`}>
                        <p><b>Status:&nbsp;</b><span style={{ color: "green" }}>Approved Downpayment</span></p>
                        <p><b>Reference Number:&nbsp;</b><span>000000000</span></p>
                        <p><b>Package:&nbsp;</b><span>Overnight</span></p>
                        <p><b>Cabin:&nbsp;</b><span>Maxi Cabin</span></p>
                        <p><b>No. of Guests:&nbsp;</b><span>6</span></p>
                        <p><b>Check-In:&nbsp;</b><span>2:00 PM</span></p>
                        <p><b>Check-Out:&nbsp;</b><span>10:00 AM</span></p>
                    </div>
                    <div className={`${styles["booking-status-details-container-divider"]}`}></div>
                    <div className={`${styles["booking-status-details-right"]}`}>
                        <p><b>Important Reminders</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at neque egestas turpis varius pellentesque vitae sed est.</p>
                        <ol>
                            <li>Duis cursus nisi vitae enim pellentesque fringilla.</li>
                            <li>Nam eget dolor et enim fringilla semper.</li>
                            <li>Nullam lectus lorem, facilisis quis aliquam sollicitudin, facilisis eu ipsum. Sed eget viverra purus.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingStatusDetails;
