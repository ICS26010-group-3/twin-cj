"use client";
import { useState, useEffect } from "react";
import styles from "./send_email.module.scss";
import { useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import twinCJLogo from "@/public/assets/twin-cj-logo.png";

export default function SendEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const [seconds, setSeconds] = useState(300); 
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [seconds]);

  const handleResendClick = () => {
    setSeconds(300); 
    setIsResendDisabled(true); 
  };

  return (
    <div className={styles["login-form-container"]}>
      <div className={styles["login-form-wrapper"]}>
        <div className={styles["form-title"]}>
          <Image
            src={twinCJLogo}
            alt="Twin CJ Logo"
            className={styles["login-logo"]}
            objectFit="contain"
          />
          <p className={styles["success-message"]}>
            A password reset email has been sent to {email}.
          </p>
        </div>
        <p className={styles["resend-timer"]}>
          Resend in {`0${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`}
        </p>
        <button
          className={styles["login-button"]}
          disabled={isResendDisabled}
          onClick={handleResendClick}
        >
          Resend link
        </button>
        <Link href="/signin" className={styles["signin-link"]}>
          <IoArrowBack size={20} />
          Sign in
        </Link>
      </div>
    </div>
  );
}
