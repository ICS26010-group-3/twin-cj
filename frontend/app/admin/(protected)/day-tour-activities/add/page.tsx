"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { IoArrowBack } from "react-icons/io5";
import DayTourForm from "./form";
import { options } from "@/app/api";
import { Loading } from "@/app/components/loading";
import styles from "./page.module.scss";
import NotificationModal from "@/app/components/notification_modal";
import ConfirmModal from "@/app/components/confirm_modal";

export default function CreateDayTour() {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleBackClick = () => {
    if (isFormChanged) {
      setIsConfirmModalOpen(true);
    } else {
      router.back();
    }
  };

  const confirmBackNavigation = () => {
    setIsConfirmModalOpen(false);
    router.back();
  };

  const [notification, setNotification] = React.useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const { trigger, isMutating } = useSWRMutation(
    `${options.baseURL}/api/services/day-tours/`,
    async (key, { arg }: { arg: FormData }) => {
      const response = await fetch(key, {
        method: "POST",
        body: arg,
      });

      if (response.ok) {
        setNotification({
          isOpen: true,
          message: "Day tour created successfully!",
          type: "success",
        });

        router.push("/admin/day-tour-activities");
      } else {
        setNotification({
          isOpen: true,
          message: "Error creating day tour.",
          type: "error",
        });
        throw new Error("Error creating day tour");
      }
    }
  );

  return (
    <div className={styles.page_container}>
      <div className={styles.page_header}>
        <div className={styles.back_arrow} onClick={handleBackClick}>
          <IoArrowBack />
        </div>
        <h1 className={styles.title}>Add New Day Tour</h1>
      </div>
      <div className={styles.form_container}>
        {isMutating ? (
          <Loading />
        ) : (
          <DayTourForm setIsFormChanged={setIsFormChanged} />
        )}
      </div>

      {notification.isOpen && (
        <NotificationModal
          isOpen={notification.isOpen}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, isOpen: false })}
        />
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmBackNavigation}
        title="Are you sure you want to go back?"
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}
