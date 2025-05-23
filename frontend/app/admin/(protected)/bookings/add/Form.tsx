"use client";

import { walkinSchema } from "@/app/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./form.module.scss";
import CustomButton from "@/app/components/custom_button";
import ConfirmModal from "@/app/components/confirm_modal";
import NotificationModal from "@/app/components/notification_modal";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useSWRMutation from "swr/mutation";
import { getAvailableServices } from "@/app/lib/api";
import { options } from "@/app/api";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  packageType: "day-tour" | "cabins";
  selectedPackageId: string;
  selectedPackageName: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  proofOfPayment?: File;
  totalPax: string;
  amount: string;
};

interface GetAvailableServicesParams {
  packageType: string;
  checkInDate: string;
  checkOutDate: string;
}

interface Service {
  id: number;
  serviceCategoryId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

type FormData = z.infer<typeof walkinSchema>;

export default function WalkInForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(walkinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      packageType: undefined,
      selectedPackageId: "",
      selectedPackageName: "",
      checkInDate: "",
      checkOutDate: "",
      paymentMethod: "",
      totalPax: "",
      amount: "",
    },

    mode: "onBlur",
  });

  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(
    () => () => {}
  );
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<
    number | null
  >(null);

  const packageType = watch("packageType");
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const getNextDay = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const minCheckOutDate = checkInDate ? getNextDay(checkInDate) : minDate;

  const {
    data,
    trigger: fetchAvailableService,
    isMutating,
  } = useSWRMutation(
    "edit",
    (key, { arg }: { arg: GetAvailableServicesParams }) =>
      getAvailableServices(arg),
    {
      onSuccess: () => {
        console.log(data);

        const selectedPackage = availablePackages.find(
          (pkg) => pkg.id.toString() === watch("selectedPackageId")
        );

        if (selectedPackage) {
          if (packageType === "day-tour") {
            const halfPrice = selectedPackage.price / 2;
            setSelectedPackagePrice(halfPrice);
            setValue("amount", halfPrice.toString());
          } else if (packageType === "cabins") {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const duration = checkOut.getTime() - checkIn.getTime();
            const numberOfNights = Math.ceil(duration / (1000 * 60 * 60 * 24));

            if (numberOfNights > 1) {
              const additionalCardPrice =
                (selectedPackage.price + 500) * (numberOfNights - 1);
              const finalPrice =
                (selectedPackage.price + additionalCardPrice) / 2;
              setSelectedPackagePrice(finalPrice);
              setValue("amount", finalPrice.toString());
            } else {
              const halfPrice = selectedPackage.price / 2;
              setSelectedPackagePrice(halfPrice);
              setValue("amount", halfPrice.toString());
            }
          }
        } else {
          setSelectedPackagePrice(null);
          setValue("amount", "");
        }
      },
    }
  );

  const handleBookingDetailChange = () => {
    if (checkInDate !== "" && checkOutDate !== "") {
      console.log("fetching....");
      fetchAvailableService({ packageType, checkInDate, checkOutDate });
    }
    if (packageType === "day-tour") {
      setValue("checkOutDate", watch("checkInDate"));
      trigger("checkOutDate");
    }
  };

  const availablePackages: Service[] =
    data?.data?.[packageType]?.services || [];

  const onSubmit = async (formData: FormFields) => {
    setConfirmMessage(
      "Are you sure you want to add this booking? Any unsaved progress will be lost."
    );

    setConfirmAction(() => async () => {
      if (formData.packageType === "day-tour") {
        formData.checkOutDate = formData.checkInDate;
      }

      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "proofOfPayment" && value instanceof File) {
            formDataToSend.append("proofOfPayment", value);
          } else {
            formDataToSend.append(key, String(value));
          }
        });

        formDataToSend.append("selectedPackage", formData.selectedPackageId);
        formDataToSend.append("packageType", formData.packageType);

        const response = await fetch(
          `${options.baseURL}/api/bookings/walk-in`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }

        setNotificationMessage("Your booking has been successfully added.");
        setNotificationType("success");
        setIsNotificationModalOpen(true);

        setTimeout(() => {
          router.push("/admin/bookings");
        }, 1500);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error submitting booking:", error);
        setNotificationMessage("Error submitting booking: " + error.message);
        setNotificationType("error");
        setIsNotificationModalOpen(true);
      }
    });

    setIsConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmMessage(
      "Are you sure you want to cancel? Any unsaved progress will be lost."
    );
    setConfirmAction(() => () => router.push("/admin/bookings"));
    setIsConfirmModalOpen(true);
  };

  const handleClear = () => {
    setConfirmMessage("Are you sure you want to clear the form? ");
    setConfirmAction(() => () => {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        packageType: undefined,
        selectedPackageId: "",
        selectedPackageName: "",
        checkInDate: "",
        checkOutDate: "",
        paymentMethod: "",
        totalPax: "",
        amount: "",
      });
    });
    setIsConfirmModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Guest Details Section */}
      <h2 className={styles.section_title}>Guest Details</h2>
      <div className={styles.form_group_container}>
        <div className={styles.left_column}>
          <div className={styles.form_group}>
            <label>
              First Name <span className={styles.required}>*</span>
            </label>
            <input
              {...register("firstName")}
              type="text"
              onBlur={() => trigger("firstName")}
            />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName?.message}</p>
            )}
          </div>

          <div className={styles.form_group}>
            <label>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              onBlur={() => trigger("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email?.message}</p>
            )}
          </div>
        </div>

        <div className={styles.right_column}>
          <div className={styles.form_group}>
            <label>
              Last Name <span className={styles.required}>*</span>
            </label>
            <input
              {...register("lastName")}
              type="text"
              onBlur={() => trigger("lastName")}
            />
            {errors.lastName && (
              <p className={styles.error}>{errors.lastName?.message}</p>
            )}
          </div>

          <div className={styles.form_group}>
            <label>
              Contact Number <span className={styles.required}>*</span>
            </label>
            <input
              {...register("contactNumber")}
              type="text"
              maxLength={11}
              onBlur={() => trigger("contactNumber")}
            />
            {errors.contactNumber && (
              <p className={styles.error}>{errors.contactNumber?.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Section */}
      <h2
        className={`${styles.section_title} ${styles.section_title_with_margin}`}
      >
        Booking Details
      </h2>
      <div className={styles.form_group_container}>
        <div className={styles.left_column}>
          <div className={styles.form_group}>
            <label>
              Resort Schedule <span className={styles.required}>*</span>
            </label>
            <select
              {...register("packageType")}
              defaultValue=""
              onBlur={() => trigger("packageType")}
            >
              <option value="" disabled>
                Select Package Type
              </option>
              <option value="day-tour">Day Tour</option>
              <option value="cabins">Overnight</option>
            </select>
          </div>

          <div className={styles.form_group}>
            {packageType && (
              <>
                <label>
                  Check-in Date <span className={styles.required}>*</span>
                </label>
                <DatePicker
                  selected={checkInDate ? new Date(checkInDate) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const formattedDate = format(date, "yyyy-MM-dd");
                      setValue("checkInDate", formattedDate);
                      trigger("checkInDate");
                    }
                    handleBookingDetailChange();
                  }}
                  minDate={new Date(minDate)}
                  dateFormat="MM/dd/yyyy"
                  onBlur={() => trigger("checkInDate")}
                  placeholderText="mm/dd/yyyy"
                />
                {errors.checkInDate && (
                  <p className={styles.error}>{errors.checkInDate?.message}</p>
                )}
              </>
            )}
          </div>
          {packageType && (
            <div className={styles.form_group}>
              <label>
                {packageType === "day-tour"
                  ? "Day Tour Package"
                  : "Cabin Selection"}
                :
              </label>
              <select
                defaultValue=""
                onBlur={() => trigger("selectedPackageId")}
                onFocus={() => {
                  if (checkInDate !== "" && checkOutDate !== "") {
                    console.log("fetching....");
                    fetchAvailableService({
                      packageType,
                      checkInDate,
                      checkOutDate,
                    });
                  }
                }}
                onChange={(e) => {
                  const selectedOption = availablePackages.find(
                    (pkg) => pkg.id.toString() === e.target.value
                  );
                  if (selectedOption) {
                    reset({
                      ...watch(),
                      selectedPackageId: selectedOption.id.toString(),
                      selectedPackageName: selectedOption.name,
                    });
                  }
                  handleBookingDetailChange();
                }}
              >
                {isMutating ? (
                  <option value="" disabled>
                    Loading options...
                  </option>
                ) : (
                  <>
                    <option value="" disabled>
                      Select an Option
                    </option>
                    {availablePackages.length > 0 ? (
                      availablePackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No options available!
                      </option>
                    )}
                  </>
                )}
              </select>
              {errors.selectedPackageId && (
                <p className={styles.error}>
                  {errors.selectedPackageId?.message}
                </p>
              )}
            </div>
          )}
        </div>

        <div className={styles.right_column}>
          <div className={styles.form_group}>
            <label>
              Total Guests <span className={styles.required}>*</span>
            </label>
            <input
              {...register("totalPax")}
              type="number"
              min={1}
              onBlur={() => trigger("totalPax")}
            />
            {errors.totalPax && (
              <p className={styles.error}>{errors.totalPax?.message}</p>
            )}
          </div>

          {packageType === "cabins" && (
            <div className={styles.form_group}>
              <label>
                Check-out Date <span className={styles.required}>*</span>
              </label>
              <DatePicker
                selected={checkOutDate ? new Date(checkOutDate) : null}
                {...register("checkOutDate")}
                onChange={(date: Date | null) => {
                  if (date) {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    setValue("checkOutDate", formattedDate);
                    trigger("checkOutDate");
                  }
                  handleBookingDetailChange();
                }}
                minDate={new Date(minCheckOutDate)}
                dateFormat="MM/dd/yyyy"
                onBlur={() => trigger("checkOutDate")}
                placeholderText="mm/dd/yyyy"
              />
              {errors.checkOutDate && (
                <p className={styles.error}>{errors.checkOutDate.message}</p>
              )}
            </div>
          )}

          <div className={styles.form_group}>
            {packageType && (
              <>
                <label>
                  Amount <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("amount")}
                  type="number"
                  min={1}
                  value={
                    (packageType === "cabins" && watch("checkOutDate")) ||
                    (packageType === "day-tour" && watch("checkInDate"))
                      ? selectedPackagePrice ?? ""
                      : ""
                  }
                  readOnly
                />
                {errors.amount && (
                  <p className={styles.error}>{errors.amount?.message}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <h2
        className={`${styles.section_title} ${styles.section_title_with_margin}`}
      >
        Payment Details
      </h2>
      <div className={styles.form_group_container}>
        <div className={styles.left_column}>
          <div className={styles.form_group}>
            <label>
              Payment Method <span className={styles.required}>*</span>
            </label>
            <select
              {...register("paymentMethod")}
              defaultValue=""
              onBlur={() => trigger("paymentMethod")}
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="Gcash">Gcash</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            {errors.paymentMethod && (
              <p className={styles.error}>{errors.paymentMethod?.message}</p>
            )}
          </div>
        </div>

        <div className={styles.right_column}>
          <div className={styles.form_group}>
            <label>
              Proof of Payment <span className={styles.required}>*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("proofOfPayment", file);
                  trigger("proofOfPayment");
                }
              }}
            />
            {errors.proofOfPayment && (
              <p className={styles.error}>{errors.proofOfPayment?.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.full_width}>
        <div className={styles.button_container}>
          <CustomButton type="submit" label="Add Booking" />
          <CustomButton
            type="button"
            label="Clear"
            variant="secondary"
            onClick={handleClear}
          />
          <CustomButton
            type="button"
            label="Cancel"
            variant="danger"
            onClick={handleCancel}
          />
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          confirmAction();
          setIsConfirmModalOpen(false);
        }}
        title={confirmMessage}
        confirmText="Yes"
        cancelText="No"
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        message={notificationMessage}
        type={notificationType}
      />
    </form>
  );
}
