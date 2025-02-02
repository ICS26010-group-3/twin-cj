import styles from "./BookingStatusDetails.module.scss";

const BookingStatusDetails = (props: any) => {
    return (
        <section className={`${styles["booking-status-details-section"]}`}>
            <div className={`${styles["booking-status-details-container"]}`}>
                <div className={`${styles["booking-status-details-container-heading"]}`}>
                    <h3>{props.headingTitle}</h3>
                    <h4>{props.headingDescription}</h4>
                </div>
                <hr />
                <div className={`${styles["booking-status-details-container-sub"]}`}>
                    <div className={`${styles["booking-status-details-left"]}`}>
                        <p><b>Status:&nbsp;</b><span style={{ color: props.statusColor, fontStyle: "italic" }}>{props.status}</span></p>
                        { props.status === "Re-upload Payment Screenshot" ? (
                            <>
                                <p><b>Reason for Rejection:&nbsp;</b></p>
                                <p>The payment screenshot provided is unclear, incomplete, or incorrect.</p>
                            </>
                        ) : (
                            <>
                                <p><b>Reference Number:&nbsp;</b><span>000000000</span></p>
                                <p><b>Package:&nbsp;</b><span>Overnight</span></p>
                                <p><b>Cabin:&nbsp;</b><span>Maxi Cabin</span></p>
                                <p><b>No. of Guests:&nbsp;</b><span>6</span></p>
                                <p><b>Check-In:&nbsp;</b><span>2:00 PM</span></p>
                                <p><b>Check-Out:&nbsp;</b><span>10:00 AM</span></p>
                            </>
                        )}
                    </div>
                    <div className={`${styles["booking-status-details-container-divider"]}`}></div>
                    <div className={`${styles["booking-status-details-right"]}`}>
                        { props.status === "Re-upload Payment Screenshot" ? (
                            <>
                                <p><b>What You Can Do Next:</b></p>
                                <p><b>Double-check Your Payment Details</b></p>
                                <ol>
                                    <li>Ensure that the screenshot clearly shows the transaction ID, amount paid, and the payment date.</li>
                                </ol>
                                <p><b>Re-upload the Correct Screenshot</b></p>
                                <ol>
                                    <li>Use the button below to upload a new payment proof for verification.</li>
                                </ol>
                                <p><b>Contact Us</b></p>
                                <ol>
                                    <li>If you believe this was a mistake, reach out to us for assistance.</li>
                                </ol>
                            </>
                        ) : (
                            <>
                                <p><b>Important Reminders</b></p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at neque egestas turpis varius pellentesque vitae sed est.</p>
                                <ol>
                                    <li>Duis cursus nisi vitae enim pellentesque fringilla.</li>
                                    <li>Nam eget dolor et enim fringilla semper.</li>
                                    <li>Nullam lectus lorem, facilisis quis aliquam sollicitudin, facilisis eu ipsum. Sed eget viverra purus.</li>
                                </ol>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingStatusDetails;
