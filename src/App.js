import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import TicketPage from "./components/TicketPage";

import "./styles.css";
import TicketViewPage from "./components/TicketViewPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/ticket-view" element={<TicketViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
