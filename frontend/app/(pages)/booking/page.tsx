"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Header from "@/app/(pages)/booking/Header";
import Accordion from "@/app/components/Accordion";
import ScheduleSelector from "@/app/(pages)/booking/ScheduleSelector";
import BookingCard from "@/app/(pages)/booking/BookingCard";
import GuestInformation from "@/app/(pages)/booking/GuestInformation";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/loading";
import styles from "./page.module.scss";
import { options } from "@/app/api";

interface AccordionItem {
  title: string;
  content: React.JSX.Element;
  required?: boolean;
}

interface BookingCardData {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isBooked?: boolean;
}

interface BookingTypeData {
  services: BookingCardData[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Booking: React.FC = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    Option: 0 as number,
    bookingType: null as string | null,
    bookingCards: [] as BookingCardData[],
    selectedOption: null as number | null,
    checkInDate: null as Date | null,
    checkOutDate: null as Date | null,
    guestCounts: { adults: 1, children: 0 },
  });

  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [showAccordion, setShowAccordion] = useState(false);
  const [isDayTourLocked, setIsDayTourLocked] = useState(false);

  const { data, error } = useSWR<{
    status: string;
    data: Record<string, BookingTypeData>;
  }>(
    bookingData.bookingType
      ? `${options.baseURL}/api/bookings?type=${
          bookingData.bookingType
        }&checkInDate=${bookingData.checkInDate?.toISOString()}&checkOutDate=${bookingData.checkOutDate?.toISOString()}`
      : null,
    fetcher,
    {
      onSuccess: () => {
        console.log(data);
      },
    }
  );

  // Set booking type based on check-in and check-out dates
  useEffect(() => {
    // Ensure check-in and check-out dates are present
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const isSameDay =
        bookingData.checkInDate.toDateString() ===
        bookingData.checkOutDate.toDateString();

      setIsDayTourLocked(isSameDay);

      setBookingData((prev) => {
        if (isSameDay && prev.bookingType !== "day-tour") {
          return {
            ...prev,
            bookingType: "day-tour",
          };
        }

        if (!isSameDay && prev.bookingType === "day-tour") {
          return {
            ...prev,
            bookingType: "cabins",
          };
        }

        return {
          ...prev,
          bookingType: prev.bookingType || "cabins",
        };
      });
    }
  }, [bookingData.checkInDate, bookingData.checkOutDate]);

  // Filter out booked services
  useEffect(() => {
    if (data?.status === "success" && bookingData.bookingType) {
      let services = data.data[bookingData.bookingType]?.services || [];

      // Filter out services that are booked
      services = services.filter((service) => !service.isBooked);

      setBookingData((prev) => ({
        ...prev,
        bookingCards: services,
      }));
      setAvailableServices(services.map((service) => service.name));
    }
  }, [data, bookingData.bookingType]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConfirmBooking = (bookingDetails: any) => {
    const bookingPayload = {
      ...bookingData,
      guestCounts: bookingDetails.guestCounts || bookingData.guestCounts,
      contactNumber: bookingDetails.contactNumber,
      specialRequest: bookingDetails.specialRequest,
      email: bookingDetails.email,
      firstName: bookingDetails.firstName,
      lastName: bookingDetails.lastName,
      bookingCards: bookingData.bookingCards.filter(
        (card) => card.id === bookingData.selectedOption
      ),
    };
    sessionStorage.setItem("bookingData", JSON.stringify(bookingPayload));
    router.push("/payment_details");
  };

  const handleChange = (
    key: keyof typeof bookingData,
    value: (typeof bookingData)[keyof typeof bookingData]
  ) => {
    setBookingData((prev) => {
      if (prev[key] === value) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  if (error) return <Loading />;

  const accordionItems: AccordionItem[] = [
    {
      title: "Resort Schedule",
      content: (
        <ScheduleSelector
          selectedOption={bookingData.bookingType}
          handleOptionSelect={(option) => {
            if (isDayTourLocked && bookingData.bookingType === "day-tour")
              return;

            if (!isDayTourLocked && option === "day-tour") return;

            handleChange("bookingType", option);
          }}
        />
      ),
    },
    bookingData.bookingType === "day-tour"
      ? {
          title: "Day Tour Packages",
          content: (
            <div style={{ display: "grid", gap: "1rem" }}>
              <p
                style={{
                  fontSize: "1rem",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Choose one Package Type (required){" "}
                <span className={styles.required}>*</span>
              </p>
              {bookingData.bookingCards
                .filter((card) => availableServices.includes(card.name))
                .map((card) => (
                  <BookingCard
                    key={card.id}
                    title={card.name}
                    description={card.description}
                    price={`₱${card.price}`}
                    imageSrc={card.imageUrl}
                    isSelected={bookingData.selectedOption === card.id}
                    onSelect={() => handleChange("selectedOption", card.id)}
                    disabled={
                      !bookingData.bookingType ||
                      bookingData.bookingCards.length === 0
                    }
                  />
                ))}
            </div>
          ),
        }
      : null,
    bookingData.bookingType === "cabins"
      ? {
          title: "Overnight",
          content: (
            <div style={{ display: "grid", gap: "1rem" }}>
              <p
                style={{
                  fontSize: "1rem",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Choose one cabin (required){" "}
                <span className={styles.required}>*</span>
              </p>
              {bookingData.bookingCards
                .filter((card) => availableServices.includes(card.name))
                .map((card) => (
                  <BookingCard
                    key={card.id}
                    title={card.name}
                    description={card.description}
                    price={`₱${card.price}`}
                    imageSrc={card.imageUrl}
                    isSelected={bookingData.selectedOption === card.id}
                    onSelect={() => handleChange("selectedOption", card.id)}
                    disabled={
                      !bookingData.bookingType ||
                      bookingData.bookingCards.length === 0
                    }
                  />
                ))}
            </div>
          ),
        }
      : null,
    {
      title: "Booking Details",
      content: <GuestInformation onConfirmBooking={handleConfirmBooking} />,
    },
  ].filter((item): item is AccordionItem => item !== null);

  return (
    <div>
      <Header
        onCheckAvailability={(details) => {
          handleChange("checkInDate", details.checkInDate);
          handleChange("checkOutDate", details.checkOutDate);
          handleChange("guestCounts", details.guestCounts);
          setShowAccordion(true);
        }}
      />
      {showAccordion && (
        <main style={{ padding: "1rem" }} id="booking-accordion">
          <Accordion items={accordionItems} initialOpenIndex={0} />
        </main>
      )}
    </div>
  );
};

export default Booking;
