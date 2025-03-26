"use client";

import React from "react";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Loading } from "@/app/components/loading";
import styles from "./page.module.scss";
import EditDayTour from "./form";
import { IoArrowBack } from "react-icons/io5";
import useSWR from "swr";
import { getDayTour } from "@/app/lib/api";
import ConfirmModal from "@/app/components/confirm_modal";

export default function EditDayTourPage() {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { data: dayTourData, isLoading } = useSWR(id, getDayTour);

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

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.page_container}>
      <div className={styles.page_header}>
        <div className={styles.back_arrow} onClick={handleBackClick}>
          <IoArrowBack />
        </div>
        <h1 className={styles.title}>Edit Day Tour Activity</h1>
      </div>
      <EditDayTour
        id={id}
        defaultValues={dayTourData ? dayTourData.data.dayTour : null}
        setIsFormChanged={setIsFormChanged}
      />
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
