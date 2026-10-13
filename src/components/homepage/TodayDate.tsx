"use client";
import { useEffect, useState } from "react";

const formatDate = () =>
  new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

const TodayDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      setDate(formatDate());
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      timeout = setTimeout(schedule, nextMidnight.getTime() - now.getTime() + 1000);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <p className="text-xs sm:text-sm lg:text-base leading-tight truncate min-h-4 sm:min-h-5 lg:min-h-6">
      {date || "\u00A0"}
    </p>
  );
};

export default TodayDate;