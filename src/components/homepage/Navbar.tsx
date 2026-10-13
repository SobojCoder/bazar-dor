"use client"
import { INav } from "@/Type/navItems.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
   const pathname = usePathname()
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
    <div className="border-t border-b border-[#d2d2d2] bg-[#FAFCFA] py-1">
    <div className="container mx-auto flex gap-1.5 sm:gap-3 lg:gap-4 items-center overflow-x-auto px-3 sm:px-6 xl:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>a:first-child]:ml-auto [&>a:last-child]:mr-auto">
      {data.map((item: INav ) => {
        return (
          <Link className={`shrink-0 whitespace-nowrap text-sm sm:text-base rounded-2xl px-3 py-1.5 sm:px-5 sm:py-2 transition-colors ${pathname === `/productsDetails/${item.id}` ? 'text-white bg-green-600' : 'hover:bg-[#F0F5F0]'} `} href={`/productsDetails/${item.id}`} key={item.id}>
          <div className="flex items-center gap-1.5 sm:gap-2">
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