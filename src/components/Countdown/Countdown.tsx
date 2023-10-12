"use client";

import React, { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2023-11-08T00:00:00Z").getTime();
    const currentDate = new Date().getTime();
    const difference = targetDate - currentDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <p className="text-lg text-blue-600 font-semibold sm:text-xl">{`${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Minutes ${timeLeft.seconds} Seconds`}</p>
  );
};

export default Countdown;
