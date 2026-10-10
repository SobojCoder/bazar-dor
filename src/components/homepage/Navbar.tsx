import { INav } from "@/Type/navItems.type";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  "use cache";
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  console.log(data);
  return (
    <div className="border-t border-b border-[#d2d2d2] bg-[#FAFCFA] py-3">
    <div className=" container mx-auto flex gap-8 items-center justify-center ">
      {data.map((item: INav ) => {
        return (
          <Link href={`/productsDetails/${item.id}`} key={item.id}>
          <div key={item.id} className="flex gap-2">
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
