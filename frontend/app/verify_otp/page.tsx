"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { options } from "@/app/api";
import styles from "./page.module.scss";
import NotificationModal from "@/app/components/notification_modal";

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 characters" }),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyOtp: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otpValid, setOtpValid] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState<number>(120);
  const [isResending, setIsResending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    register("otp");
  }, [register]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    setValue("otp", otpValue, { shouldValidate: true });

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || resendCooldown > 0 || isResending) return;

    try {
      setIsResending(true);
      const response = await fetch(`${options.baseURL}/api/bookings/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to resend OTP");

      if (response.ok) {
        setModalMessage("A new OTP has been sent to your email.");
        setModalType("success");
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
        setResendCooldown(120);
        setOtp(Array(6).fill(""));
        setValue("otp", "");
        localStorage.setItem("resendCooldown", (120).toString());
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: "Incorrect OTP. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire("Error", "Something went wrong while resending OTP.", "error");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prevCooldown) => {
          const newCooldown = prevCooldown - 1;

          localStorage.setItem("resendCooldown", newCooldown.toString());
          return newCooldown;
        });
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem("resendCooldown");
    }
  }, [resendCooldown]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);

    if (/^[0-9]+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
      setValue("otp", newOtp.join(""), { shouldValidate: true });

      if (pasteData.length < 6) {
        otpInputRefs.current[pasteData.length]?.focus();
      }
    }
  };

  if (!email) {
    return <p>Missing Email</p>;
  }

  const handleVerifyOtp = async (data: OtpFormData) => {
    const { otp } = data;

    try {
      const response = await fetch(
        `${options.baseURL}/api/bookings/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!response.ok) throw new Error("Failed to verify OTP");

      const result = await response.json();
      if (result.success) {
        setOtpValid(true);
        Swal.fire({
          title: "OTP Verified!",
          text: "Your email has been successfully verified.",
          icon: "success",
          confirmButtonText: "Email Verified",
        }).then(() => {
          localStorage.removeItem("resendCooldown");

          if (window.opener) {
            window.opener.postMessage({ action: "enablePaymentButton" }, "*");
          }

          window.close();
        });
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: "Incorrect OTP. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to verify OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Verify Your Email</h2>
        <p className={styles.subtitle}>
          We&apos;ve sent a 6-digit code to{" "}
          <span className={styles.email}>{email}</span>
        </p>

        <form onSubmit={handleSubmit(handleVerifyOtp)} className={styles.form}>
          <div className={styles.otpContainer}>
            <label className={styles.otpLabel}>Enter OTP Code</label>
            <div className={styles.otpInputs}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    otpInputRefs.current[index] = el;
                  }}
                  className={`${styles.otpInput} ${
                    errors.otp ? styles.error : ""
                  }`}
                  disabled={otpValid}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {errors.otp && (
              <p className={styles.errorText}>{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={otpValid}
            className={styles.submitButton}
          >
            {otpValid ? "Verified!" : "Verify OTP"}
          </button>

          {/* RESEND OTP SECTION */}

          <p className={styles.resendText}>
            Didn&apos;t receive your code?{" "}
            <a
              href="#"
              className={`${styles.resendLink} ${
                resendCooldown > 0 || isResending ? styles.disabled : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleResendOtp(e);
              }}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </a>
          </p>
        </form>
      </div>
      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default VerifyOtp;
