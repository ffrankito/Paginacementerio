import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import QuotePage from "./pages/QuotePage";

export default function App() {
  const goToHome = () => window.open("https://www.airesdepaz.com/", "_blank");

  return (
    <>
      <Header />
      <QuotePage onBackHome={goToHome} />
    </>
  );
}