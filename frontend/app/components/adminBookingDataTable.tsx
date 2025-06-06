import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { downloadExcel } from "react-export-table-to-excel";
import styles from "./adminBookingDataTable.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CustomButton from "@/app/components/custom_button";
import { options } from "../api";
import { mutate } from "swr";
import ConfirmModal from "@/app/components/confirm_modal";
import NotificationModal from "@/app/components/notification_modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

type ServiceCategory = {
  id: number;
  categoryId: number;
};

type Service = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  serviceCategoryId: number;
  serviceCategory: ServiceCategory;
};

type BookingService = {
  service: Service;
};

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};

type Transaction = {
  id: string;
  proofOfPaymentImageUrl: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

type BookingResponse = {
  id: number;
  referenceCode: string;
  checkIn: string;
  checkOut: string;
  totalPax: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  services: BookingService[];
  customer: Customer;
  bookingStatus: string;
  transaction: Transaction;
};

interface BookingTableProps {
  bookings: BookingResponse[] | undefined;
}

const ITEMS_PER_PAGE = 5;

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    serviceFilter: "all",
    startDateFilter: "",
    endDateFilter: "",
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingResponse | null>(
    null
  );
  const [newStatus, setNewStatus] = useState<string>("");

  const [userMessage, setUserMessage] = useState<string>("");

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, string>
  >(
    () =>
      bookings?.reduce((acc, booking: BookingResponse) => {
        acc[booking.referenceCode] = booking.bookingStatus;
        return acc;
      }, {} as Record<string, string>) || {}
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const openModalForStatusUpdate = (
    booking: BookingResponse,
    status: string
  ) => {
    setCurrentBooking(booking);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const getModalMessage = (status: string) => {
    if (status === "Cancelled" || status === "Rescheduled") {
      return (
        <>
          <label className={styles.messageLabel}>
            Are you sure you want to update the status of this booking to &quot;
            {status}&quot;? <br />
          </label>
          <textarea
            id="userMessage"
            name="userMessage"
            value={userMessage}
            onChange={handleMessageChange}
            className={styles.messageTextarea}
            placeholder="State your reason for cancellation/rescheduling here"
            required
          />
        </>
      );
    }
    return `Are you sure you want to update the status of this booking to "${status}"?`;
  };

  const handleEditStatus = async (userMessage: string) => {
    if (!currentBooking) return;

    if (
      (newStatus === "Cancelled" || newStatus === "Rescheduled") &&
      !userMessage.trim()
    ) {
      setNotificationMessage(
        "Please provide a reason for cancellation or rescheduling."
      );
      setNotificationType("error");
      setIsNotificationOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${options.baseURL}/api/bookings/status/${currentBooking.referenceCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus: newStatus,
            message: userMessage.trim() ? userMessage : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      mutate(
        `${options.baseURL}/api/bookings/status/${currentBooking.referenceCode}`
      );

      // Show success notification
      setNotificationMessage("Booking status updated successfully.");
      setNotificationType("success");
      setIsNotificationOpen(true);

      setIsModalOpen(false);
      setUserMessage("");
    } catch (error) {
      console.error("Error updating booking status:", error);

      // Show error notification
      setNotificationMessage(
        "Failed to update booking status. Please try again."
      );
      setNotificationType("error");
      setIsNotificationOpen(true);
    }
  };

  const calculateDuration = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const duration = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    );
    return duration;
  };

  const originalDuration = calculateDuration(
    currentBooking?.checkIn ?? "",
    currentBooking?.checkOut ?? ""
  );

  const handleEditDate = async () => {
    const { checkIn: newCheckIn, checkOut: newCheckOut } = editedDates;

    const newDuration = calculateDuration(newCheckIn, newCheckOut);

    if (originalDuration !== newDuration) {
      setNotificationMessage(
        `Please select a date range that is ${originalDuration} day/s long.`
      );
      setNotificationType("error");
      setIsNotificationOpen(true);
      return;
    }

    if (
      newCheckIn &&
      currentBooking?.checkIn &&
      new Date(newCheckIn).getTime() ===
        new Date(currentBooking.checkIn).getTime() &&
      newCheckOut &&
      currentBooking?.checkOut &&
      new Date(newCheckOut).getTime() ===
        new Date(currentBooking.checkOut).getTime()
    ) {
      setNotificationMessage("No changes made to the dates.");
      setNotificationType("error");
      setIsNotificationOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${options.baseURL}/api/bookings/dates/${currentBooking?.referenceCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referenceCode: currentBooking?.referenceCode,
            newCheckIn,
            newCheckOut,
          }),
        }
      );

      const result = await response.json();

      // Handle response
      if (response.ok) {
        setNotificationMessage("Schedule has been updated.");
        setNotificationType("success");
        setIsNotificationOpen(true);
        setExpandedRef(null);
        window.location.reload();
      } else {
        if (result.unavailableServices) {
          alert(
            `The following services are unavailable for the selected dates: ${result.unavailableServices
              .map((s: Service) => s.name)
              .join(", ")}`
          );
        } else {
          alert(
            result.message || "Failed to submit new dates. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting new dates:", error);
    }
  };

  const handleCancelModal = () => {
    if (currentBooking) {
      setSelectedStatuses((prev) => ({
        ...prev,
        [currentBooking.referenceCode]: currentBooking.bookingStatus,
      }));
    }

    setIsModalOpen(false);
    setUserMessage("");
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };
  const formatDateToStartOfDay = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = bookings?.filter((booking: BookingResponse) => {
    const searchLower = filters.searchTerm.toLowerCase();

    const matchesSearchTerm =
      booking.referenceCode.toLowerCase().includes(searchLower) ||
      booking.customer.firstName.toLowerCase().includes(searchLower) ||
      booking.customer.email.toLowerCase().includes(searchLower);

    const matchesStatus =
      filters.statusFilter === "all" ||
      booking.bookingStatus.toLowerCase() ===
        filters.statusFilter.toLowerCase();

    const matchesService =
      filters.serviceFilter === "all" ||
      booking.bookingStatus.toLowerCase() ===
        filters.serviceFilter.toLowerCase();

    const startDate = filters.startDateFilter
      ? formatDateToStartOfDay(new Date(filters.startDateFilter))
      : null;
    const endDate = filters.endDateFilter
      ? formatDateToStartOfDay(new Date(filters.endDateFilter))
      : null;

    const matchesDateRange =
      (!startDate ||
        formatDateToStartOfDay(new Date(booking.checkIn)) >= startDate) &&
      (!endDate ||
        formatDateToStartOfDay(new Date(booking.checkIn)) <= endDate);

    return (
      matchesSearchTerm && matchesStatus && matchesService && matchesDateRange
    );
  });

  const totalPages = Math.ceil(
    (filteredBookings?.length || 0) / ITEMS_PER_PAGE
  );

  const paginatedBookings = (filteredBookings || []).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [editedDates, setEditedDates] = useState<{
    checkIn: string;
    checkOut: string;
  }>({ checkIn: "", checkOut: "" });

  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const addDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const header = [
    "Reference No.",
    "Service",
    "Check-in",
    "Check-out",
    "Down Payment",
    "Customer Name",
    "Email",
    "Status",
  ];

  const body = bookings?.map((booking) => ({
    referenceNo: booking.referenceCode,
    service: booking.services.map((service) => service.service.name)[0],
    checkIn: formatDate(booking.checkIn),
    checkOut: formatDate(booking.checkOut),
    downPayment: booking.transaction.amount,
    customerName: `${booking.customer.firstName} ${booking.customer.lastName}`,
    email: booking.customer.email,
    status: booking.bookingStatus,
  }));

  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: "Twin CJ Riverside Glamping Resort Bookings",
      sheet: "bookings",
      tablePayload: {
        header,
        body: body || [],
      },
    });
  };
  const router = useRouter();

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table_wrapper}>
        <div className={styles.headerContainer}>
          <h2 className={styles.tableTitle}>Bookings & Transactions</h2>
          <div className={styles.buttonGroup}>
            <button
              className={styles.exportButton}
              onClick={() => router.push("/admin/bookings/add")}
            >
              <i className="fas fa-plus"></i> Add
            </button>
            <button
              className={styles.exportButton}
              onClick={handleDownloadExcel}
            >
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>

        <div className={styles.topContainer}>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <div className={styles.leftGroup}>
              <label className={styles.searchLabel}>Search</label>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search by Reference No., Name, Email, or Service"
                className={styles.searchInput}
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className={styles.rightGroup}>
            {/* Date Filter */}
            <div className={styles.filterForm}>
              <label htmlFor="startDateFilter" className={styles.filterLabel}>
                Start Date:
              </label>
              <input
                type="date"
                id="startDateFilter"
                name="startDateFilter"
                value={filters.startDateFilter}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              />
            </div>

            <div className={styles.filterForm}>
              <label htmlFor="endDateFilter" className={styles.filterLabel}>
                End Date:
              </label>
              <input
                type="date"
                id="endDateFilter"
                name="endDateFilter"
                value={filters.endDateFilter}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              />
            </div>

            <div className={styles.filterForm}>
              <label htmlFor="statusFilter" className={styles.filterLabel}>
                Filter by Status:
              </label>
              <select
                id="statusFilter"
                name="statusFilter"
                value={filters.statusFilter}
                onChange={handleFilterChange}
                className={styles.filterSelect}
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.scrollableTableWrapper}>
          {filteredBookings?.length === 0 ? (
            <div className={styles.noBookingsMessage}>
              There are currently no bookings available
            </div>
          ) : (
            <table ref={tableRef} className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Reference No.</th>
                  <th>Service</th>
                  <th>Proof of Payment</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Down Payment</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings?.map(
                  (booking: BookingResponse, index: number) => {
                    const isExpanded = expandedRef === booking.referenceCode;

                  return (
                    <React.Fragment key={index}>
                      <tr className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          <button
                            className={styles.referenceLink}
                            onClick={() => {
                              const isOpen =
                                expandedRef === booking.referenceCode;
                              setExpandedRef(
                                isOpen ? null : booking.referenceCode
                              );
                              if (!isOpen) {
                                setCurrentBooking(booking);
                                setEditedDates({
                                  checkIn: formatDate(booking.checkIn),
                                  checkOut: formatDate(booking.checkOut),
                                });
                              } else {
                                setCurrentBooking(null);
                              }
                            }}
                          >
                            {booking.referenceCode}
                          </button>
                        </td>
                        <td className={styles.tableCell}>
                          {
                            booking.services.map(
                              (service) => service.service.name
                            )[0]
                          }
                        </td>
                        <td className={styles.tableCell}>
                          {booking.transaction?.proofOfPaymentImageUrl && (
                            <Image
                              src={`${
                                options.baseURL
                              }/uploads/${booking.transaction.proofOfPaymentImageUrl
                                .split(/[\\/]/)
                                .pop()}`}
                              alt="Proof of Payment"
                              className={styles.thumbnailImage}
                              width={500}
                              height={500}
                              onClick={() => {
                                const fileName =
                                  booking.transaction.proofOfPaymentImageUrl
                                    .split(/[\\/]/)
                                    .pop();
                                openImageModal(
                                  `${options.baseURL}/uploads/${fileName}`
                                );
                              }}
                            />
                          )}
                        </td>
                        <td className={styles.tableCell}>
                          {formatDate(booking.checkIn)}
                        </td>
                        <td className={styles.tableCell}>
                          {formatDate(booking.checkOut)}
                        </td>
                        <td className={styles.tableCell}>
                          ₱
                          {booking.transaction.amount.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                        <td className={styles.tableCell}>
                          {`${booking.customer.firstName} ${booking.customer.lastName}`}
                        </td>
                        <td className={styles.tableCell}>
                          {booking.customer.email}
                        </td>
                        <td
                          className={`${styles.tableCell} ${
                            booking.bookingStatus === "Pending"
                              ? styles.statusPending
                              : booking.bookingStatus === "Cancelled"
                              ? styles.statusCancel
                              : booking.bookingStatus === "Approved"
                              ? styles.statusApproved
                              : ""
                          }`}
                        >
                          <span className={styles.hiddenStatus}>
                            {booking.bookingStatus}
                          </span>
                          <select
                            value={
                              selectedStatuses[booking.referenceCode] ||
                              booking.bookingStatus
                            }
                            onChange={(e) => {
                              const selectedStatus = e.target.value;

                                // Save the temporary selection in state
                                setSelectedStatuses((prev) => ({
                                  ...prev,
                                  [booking.referenceCode]: selectedStatus,
                                }));

                                openModalForStatusUpdate(
                                  booking,
                                  selectedStatus
                                );
                              }}
                              disabled={
                                booking.bookingStatus.toLowerCase() ===
                                "completed"
                              }
                            >
                              <option value={booking.bookingStatus} disabled>
                                {booking.bookingStatus}
                              </option>
                              <option value="Approved">Approved</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Rescheduled">Rescheduled</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>

                      {isExpanded && (
                        <tr className={styles.accordionRow}>
                          <td colSpan={8} className={styles.accordionContent}>
                            <div className={styles.dateEditor}>
                              <label>
                                Check-In:
                                <DatePicker
                                  selected={
                                    editedDates.checkIn
                                      ? new Date(editedDates.checkIn)
                                      : null
                                  }
                                  onChange={(date: Date | null) => {
                                    if (date) {
                                      const formattedDate = date
                                        .toISOString()
                                        .split("T")[0];
                                      setEditedDates((prev) => ({
                                        ...prev,
                                        checkIn: formattedDate,
                                      }));
                                    }
                                  }}
                                  minDate={
                                    editedDates.checkOut
                                      ? new Date(editedDates.checkOut)
                                      : undefined
                                  }
                                  disabled={
                                    booking.bookingStatus.toLowerCase() ===
                                    "completed"
                                  }
                                  dayClassName={() =>
                                    booking.bookingStatus.toLowerCase() ===
                                    "completed"
                                      ? ""
                                      : "bold-date"
                                  }
                                  dateFormat="yyyy-MM-dd"
                                />
                              </label>
                              <label>
                                Check-Out:
                                <DatePicker
                                  selected={
                                    editedDates.checkOut
                                      ? new Date(editedDates.checkOut)
                                      : undefined
                                  }
                                  onChange={(date: Date | null) => {
                                    const formattedDate = date
                                      ? date.toISOString().split("T")[0]
                                      : ""; // Format as "YYYY-MM-DD"
                                    setEditedDates((prev) => ({
                                      ...prev,
                                      checkOut: formattedDate,
                                    }));
                                  }}
                                  minDate={
                                    editedDates.checkIn
                                      ? new Date(editedDates.checkIn)
                                      : undefined
                                  }
                                  maxDate={
                                    editedDates.checkIn
                                      ? new Date(
                                          addDays(
                                            new Date(editedDates.checkIn)
                                              .toISOString()
                                              .split("T")[0],
                                            originalDuration
                                          )
                                        )
                                      : undefined
                                  }
                                  disabled={
                                    booking.bookingStatus.toLowerCase() ===
                                    "completed"
                                  }
                                  dayClassName={() =>
                                    booking.bookingStatus.toLowerCase() ===
                                    "completed"
                                      ? ""
                                      : "bold-date"
                                  }
                                  dateFormat="yyyy-MM-dd"
                                />
                              </label>
                              <div className={styles.dateEditorButtons}>
                                {booking.bookingStatus.toLowerCase() !==
                                  "completed" && (
                                  <CustomButton
                                    type="button"
                                    label="Save Changes"
                                    onClick={handleEditDate}
                                  />
                                )}

                                  <CustomButton
                                    type="button"
                                    label="Cancel"
                                    variant="danger"
                                    onClick={() => setExpandedRef(null)}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </div>
        {(filteredBookings?.length ?? 0) > 0 && (
          <div className={styles.paginationContainer}>
            <button
              className={`${styles.paginationButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className={styles.pageNumber}>
              {currentPage} / {totalPages}
            </span>

            <button
              className={`${styles.paginationButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {isImageModalOpen && modalImageUrl && (
        <div className={styles.imageModal}>
          <div className={styles.imageModalContent}>
            <span className={styles.closeButton} onClick={closeImageModal}>
              &times;
            </span>

            <div className={styles.imageWrapper}>
              <Image
                src={modalImageUrl}
                width={500}
                height={500}
                alt="Service"
                className={styles.modalImage}
              />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCancelModal}
          onConfirm={() => handleEditStatus(userMessage || "")}
          title="Confirm Status Update"
          confirmText="Update"
          cancelText="Cancel"
        >
          {getModalMessage(newStatus)}
        </ConfirmModal>
      )}

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        message={notificationMessage}
        type={notificationType}
      />
    </div>
  );
};

export default BookingTable;
