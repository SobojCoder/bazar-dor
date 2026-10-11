"use client";
import { INav } from "@/Type/navItems.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [data, setData] = useState<INav[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((categories: INav[]) => {
        if (isMounted) setData(categories);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="border-t border-b border-[#d2d2d2] bg-[#FAFCFA] py-2 sm:py-3">
      <div className="container mx-auto flex gap-3 sm:gap-5 lg:gap-8 items-center justify-start lg:justify-center overflow-x-auto px-4 sm:px-6 lg:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {data.map((item: INav) => {
          return (
            <Link
              className={`shrink-0 whitespace-nowrap text-sm sm:text-base ${pathname === `/productsDetails/${item.id}` ? "text-black border-0 rounded-2xl bg-green-200 px-3 py-1.5 sm:px-5 sm:py-2" : ""} `}
              href={`/productsDetails/${item.id}`}
              key={item.id}
            >
              <div className="flex gap-2">
                {" "}
                <span>{item.icon}</span>
                <p>{item.nameBn}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
