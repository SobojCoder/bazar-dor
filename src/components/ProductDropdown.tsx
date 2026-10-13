"use client";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low", label: "দাম: কম থেকে বেশি" },
  { value: "high", label: "দাম: বেশি থেকে কম" },
];

const SortDropdown = ({ current }: { current: string }) => {
  const [open, setOpen] = useState(false);

  const selected =
    sortOptions.find((option) => option.value === current) ?? sortOptions[0];

  return (
    <div className="relative flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base">
      <span className="shrink-0 text-[#727A74]">সাজান:</span>

      <div className="relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-xl border border-[#DCE5DE] bg-[#FAFCFA] px-2.5 py-1.5 text-[#26332A] sm:px-4 sm:py-2"
        >
          {selected.label}
          <FaAngleDown
            className={`shrink-0 text-xs transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />

            {/* Menu */}
            <ul className="absolute right-0 sm:left-0 sm:right-auto z-20 mt-2 min-w-full max-w-[calc(100vw-1.5rem)] whitespace-nowrap overflow-hidden rounded-xl border border-[#DCE5DE] bg-[#FAFCFA] shadow-md">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <Link
                    href={`?sort=${option.value}`}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 sm:px-4 sm:py-2 hover:bg-[#F0F5F0] ${
                      current === option.value
                        ? "bg-[#F0F5F0] font-semibold text-[#05893E]"
                        : "text-[#26332A]"
                    }`}
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;