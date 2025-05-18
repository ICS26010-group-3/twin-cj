import Chatbot from "../components/Chatbot";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Chatbot />
      <Footer />
    </>
  );
}
