import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const [details, setDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem("journeyDetails"));
    if (storedDetails) {
      setDetails(storedDetails);
      const journeyStartTime = storedDetails.startTime;
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - journeyStartTime;
      const remainingTime = Math.max(3 * 60 * 60 * 1000 - timeElapsed, 0); // 3 hours in ms
      setTimeLeft(remainingTime);
    } else {
      navigate("/"); // If no details found, redirect to booking page
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1000); // Decrease by 1 second (1000 ms)
      }, 1000);
      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [timeLeft]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleViewTicketClick = () => {
    navigate("/ticket-view", { state: { details, timeLeft } });
  };

  if (!details) return null;

  return (
    <div className="big-box">
      <div className="circle-logo">
        <img src="https://janmarg.in/images/ajl.jpg" alt="Logo in Circle" />
      </div>

      <p className="main-text">
        <span className="start-truncate">{details.source}</span>
        <span className="arrow"> → </span>
        <span className="end-truncate">{details.destination}</span>
      </p>

      <p className="sub-text">AC</p>
      <p className="sub-text">1 Adult Ticket</p>

      <div className="small-box">
        <div className="person">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4042/4042171.png"
            alt="Person"
          />
          <span>
            {" "}
            <b>1</b>{" "}
          </span>
        </div>
      </div>

      <div className="price">
        <span className="size">
          <p>
            <b>₹</b>
          </p>
          <span>20</span>
        </span>
        <img
          src="https://app.thefluentlife.com/public/static/website/payment_page/Paid%20icon.png"
          alt="Paytm Icon"
        />
      </div>

      <h3 className="success-text">TICKET BOOKED SUCCESSFULLY</h3>
      <p className="date-text">
        {new Date(details.startTime).toLocaleString()}
      </p>

      <hr />

      <div className="white-box">
        <p>Your ticket is valid for:</p>
        <p id="countdown" className="timer">
          {formatTime(timeLeft)}
        </p>
        <button className="view-ticket" onClick={handleViewTicketClick}>
          View Your Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketPage;
