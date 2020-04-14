import React from 'react';

export default function Countdown() {
  const [remainingTime, setRemainingTime] = React.useState(10000);
  const end = React.useRef(new Date().getTime() + remainingTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = end.current - new Date().getTime();
      if (newRemainingTime <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h4>The Final Countdown: </h4>
      <h3>{remainingTime}</h3>
    </div>
  );
}
