"use client";
import logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserInfo from "../UserInfo";

const Header = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      });

      setDate(today);
    };

    updateDate();

    // Check every minute
    const interval = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FAFCFA]">
      <div className="flex justify-between items-center gap-3 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-0 container mx-auto">
        <Link href="/" className="min-w-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              src={logo}
              alt="logo"
              width={60}
              height={60}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 bg-[#05893E] p-1.5 sm:p-2 rounded-lg"
            />
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-black font-extrabold truncate">
                বাজার দর
              </h2>
              <p className="text-xs sm:text-base lg:text-lg truncate">{date}</p>
            </div>
          </div>
        </Link>
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default Header;