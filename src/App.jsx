import { useState } from "react";
import "./index.css";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const goToQuote = () => setCurrentPage("quote");
  const goToHome = () => setCurrentPage("home");

  return currentPage === "home" ? (
    <HomePage onStart={goToQuote} />
  ) : (
    <QuotePage onBackHome={goToHome} />
  );
}