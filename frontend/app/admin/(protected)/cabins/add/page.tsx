"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CabinForm from "./form";
import { IoArrowBack } from "react-icons/io5";
import styles from "./page.module.scss";
import ConfirmModal from "@/app/components/confirm_modal";

export default function CreateCabin() {
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

  return (
    <div className={styles.page_container}>
      <div className={styles.page_header}>
        <div className={styles.back_arrow} onClick={handleBackClick}>
          <IoArrowBack />
        </div>
        <h1 className={styles.title}>Add New Cabin</h1>
      </div>
      <CabinForm setIsFormChanged={setIsFormChanged} />

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
