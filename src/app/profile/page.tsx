"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <div>
      <h2>আমার প্রোফাইল</h2>
      <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <div className="flex justify-between bg-[#FAFCFA] p-6 rounded-2xl items-center">
        <div className="flex gap-3 items-center">
          <div>
            {user?.image ? (
              <Image
                className="rounded-2xl"
                alt="Tailwind-CSS-Avatar-component"
                src={user?.image as string}
                width={70}
                height={70}
              />
            ) : (
              <FaCircleUser className="text-2xl text-[60px]" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-medium">{user?.name}</h3>
            <p className="text-[#69706B]">{user?.email}</p>
          </div>
        </div>
        <div>
            <button className="btn border border-red-400 text-red-400"><BiLogOut /> সাইন আউট</button>
        </div>
      </div>
      <div>
        <h3>তথ্য</h3>
        
      </div>
    </div>
  );
};

export default ProfilePage;
