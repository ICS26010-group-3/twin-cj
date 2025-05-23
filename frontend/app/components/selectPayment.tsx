import React from "react";
import styles from "./selectPayment.module.scss";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface SelectPaymentProps {
  className?: string;
  register: UseFormRegister<{
    paymentMethod: string;
    proofOfPayment: File;
  }>;
  errors: FieldErrors<{
    paymentMethod: string;
    proofOfPayment: File;
  }>;
  setValue: UseFormSetValue<{
    paymentMethod: string;
    proofOfPayment: File;
  }>;
}

const SelectPayment: React.FC<SelectPaymentProps> = ({
  className,
  register,
  errors,
  setValue,
}) => {
  return (
    <div className={`${styles.paymentContainer} ${className}`}>
      <h2 className={styles.heading}>
        Select Payment Method <span className={styles.required}>*</span>
      </h2>
      <select
        className={styles.paymentOptions}
        {...register("paymentMethod", {
          required: "Payment method is required",
        })}
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        <option value="GCash">GCash</option>
        <option value="CreditCard">Credit Card</option>
      </select>
      {errors.paymentMethod && (
        <p className={styles.error}>{errors.paymentMethod.message}</p>
      )}
      <h3 className={styles.subheading}>
        Please upload your proof of payment here{" "}
        <span className={styles.required}>*</span>
      </h3>

      <label
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${styles.labelFile}`}
        htmlFor="file"
      >
        Upload file
      </label>
      <input
        className={styles.file}
        id="file"
        type="file"
        accept=".jpg,.jpeg,.png,.heic,.webp"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setValue("proofOfPayment", e.target.files[0]); // Manually set value
          }
        }}
      ></input>
      {errors.proofOfPayment ? (
        <p className={styles.error}>{errors.proofOfPayment.message}</p>
      ) : (
        <h5 className={styles.uploadSubtext}>
          Max file size accepted is 1 MB.
        </h5>
      )}
    </div>
  );
};

export default SelectPayment;
