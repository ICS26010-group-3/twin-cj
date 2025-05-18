import React from "react";
import Footer from "../components/footer";
import Chatbot from "../components/Chatbot";
import Navbar from "../components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Chatbot />
      <Footer />
    </>
  );
}
