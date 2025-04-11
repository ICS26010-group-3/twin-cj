import React from "react";
import styles from "./page.module.scss";
import SectionHeader from "../../components/SectionHeader";
import Image from "next/image";
import Accordion from "../../components/Accordion";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Image
        src={"/assets/home_river.jpg"}
        alt="Resort View"
        fill
        className={styles.image}
      />
    </header>
  );
};

export default function faqs() {
  return (
    <>
      <Header />
      <section className={styles["inquiry-form"]}>
        <div className={`${styles[""]} container`}>
          <SectionHeader title="FREQUENTLY ASKED QUESTIONS" />
        </div>
      </section>
      <Accordion
        items={[
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                What are the required files in uploading a payment screenshot?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  We accept JPG, JPEG, PNG, and HEIC file formats for image uploads.
                </p>
              </div>
            ),
          },
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                What are the payment methods? Do you accept full cash?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  We require 50% initial payment through online wallets like
                  GCash or PayMaya. The remaining balance can be settled in cash
                  upon arrival.
                </p>
              </div>
            ),
          },
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                What is your data retention policy?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  Our system retains all reservation records and user data indefinitely, which ensures full historical traceability that will also support our auditing, customer service, and business analysis for all of the transactions that are made in the system.
                </p>
              </div>
            ),
          },          
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                What time is your check in and check out?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  Check-in time is at 4:00 PM and Check-out is at 12:00 NN.
                </p>
              </div>
            ),
          },
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                Are pets allowed during our stay in your resort?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  Yes, pets are allowed but owners must be responsible for
                  cleaning up after them.
                </p>
              </div>
            ),
          },
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                Are there any restrictions on bringing outside food and drinks?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  There are no restrictions on bringing outside food and drinks.
                </p>
              </div>
            ),
          },
          {
            title: (
              <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                Does the resort offer Wi-Fi? Is it free or are there any additional fees?
              </span>
            ),
            content: (
              <div style={{ padding: "1rem 0 1rem 1.5rem" }}>
                <p
                  style={{
                    marginBottom: "1rem",
                    position: "relative",
                    paddingLeft: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      lineHeight: "1.5rem",
                      color: "#d9ad7c",
                    }}
                  >
                    •
                  </span>
                  Yes, we offer free WiFi for guests who have completed their
                  booking, though coverage may be limited in some areas.
                </p>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
