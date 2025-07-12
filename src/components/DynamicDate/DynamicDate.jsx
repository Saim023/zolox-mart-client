import { useState, useEffect } from "react";
import { format } from "date-fns";

const DynamicDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString();
  //   const formattedTime = currentDate.toLocaleTimeString();
  // const formattedDate = format(currentDate, "PPPpp");

  return (
    <div>
      <div>{currentDate.toString()}</div>
    </div>
  );
};

export default DynamicDate;
