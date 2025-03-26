"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { getCabin } from "@/app/lib/api";
import CabinForm from "./form";
import { Loading } from "@/app/components/loading";
import { IoArrowBack } from "react-icons/io5";
import styles from "./page.module.scss";
import ConfirmModal from "@/app/components/confirm_modal";

export default function UpdateCabin() {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useSWR(id, getCabin, {
    onSuccess: () => {
      console.log(data);
    },
  });

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
        <h1 className={styles.title}>Edit Cabin</h1>
      </div>
      <CabinForm
        defaultValues={data ? data.data.cabin : null}
        id={id}
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
