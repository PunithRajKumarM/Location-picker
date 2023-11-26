import React, { useEffect, useState } from "react";

function ProgressBar({ timer }) {
  const [remainingTime, setReminingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval");
      setReminingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });

  return <progress value={remainingTime} max={timer}></progress>;
}

export default ProgressBar;
