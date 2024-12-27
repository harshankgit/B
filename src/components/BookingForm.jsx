import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store journey details with the current time
    const journeyDetails = {
      ...formData,
      startTime: new Date().getTime(),
    };

    localStorage.setItem("journeyDetails", JSON.stringify(journeyDetails));
    navigate("/ticket"); // Redirect to the ticket page
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="source">From:</label>
        <input
          type="text"
          id="source"
          name="source"
          placeholder="Enter source"
          value={formData.source}
          onChange={handleChange}
          required
        />
        <label htmlFor="destination">To:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Enter destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
};

export default BookingForm;
