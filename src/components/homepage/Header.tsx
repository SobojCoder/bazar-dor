"use client";
import logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import {  useEffect, useState } from "react";
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
    <div className="flex justify-between items-center  py-5 container mx-auto">
      <Link href='/'>
      <div className="flex gap-4 bg-">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          className="w-14 h-14 bg-[#05893E] p-2 rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-extrabold">বাজার দর</h2>
          <p className="text-lg text">{date}</p>
        </div>
      </div>
      </Link>
      <div className="flex items-center gap-4">
        <Link href='#'>সাইন ইন</Link>
        <Link href='#' className="py-2 px-4 bg-[#05893E] text-[#ffffff] rounded-xl">সাইন আপ</Link>
      </div>
    </div>
    </div>
  );
};

export default Header;
