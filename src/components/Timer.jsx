import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Store the time remaining
  const [timerEnded, setTimerEnded] = useState(false); // Flag to check if the timer has ended

  // Function to update the remaining time
  const calculateTimeLeft = () => {
    const bookingTime = localStorage.getItem("bookingTime");
    if (!bookingTime) return;

    const currentTime = new Date().getTime();
    const bookingStartTime = new Date(bookingTime).getTime();
    const timeElapsed = currentTime - bookingStartTime;
    const timeRemaining = 3 * 60 * 60 * 1000 - timeElapsed; // 3 hours in milliseconds

    if (timeRemaining <= 0) {
      setTimeLeft(0);
      setTimerEnded(true);
    } else {
      setTimeLeft(timeRemaining);
    }
  };

  useEffect(() => {
    // Calculate time every second
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // On first load, calculate the time left
    calculateTimeLeft();
  }, []);

  // Function to convert time (milliseconds) to HH:MM:SS
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {!timerEnded ? (
        <div>
          <h2>Time Left: {formatTime(timeLeft)}</h2>
        </div>
      ) : (
        <div>
          <h2>Time's Up!</h2>
        </div>
      )}
    </div>
  );
};

export default Timer;
