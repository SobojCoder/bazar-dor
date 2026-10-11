"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="flex gap-3 items-center text-center cursor-pointer m-1"
            >
              {
                user?.image ? <Image
                className="rounded-2xl"
                alt="Tailwind-CSS-Avatar-component"
                src={user?.image as string}
                width={50}
                height={50}
              />: <FaCircleUser className="text-2xl " />
              }
              
              <h3 className="font-bold text-xl">{user?.name}</h3>
            </div>
            <div
              tabIndex={-1}
              className="dropdown-content shadow-lg shadow-[#5F6761 menu bg-[#FAFCFA] rounded-box z-1 w-89 p-7 rounded-2xl shadow-sm"
            >
              <h3 className="text-2xl font-medium">{user?.name}</h3>
              <p className="text-[#5F6761] text-[18px]">{user?.email}</p>
              <Link href='/profile'>
              <p className="flex gap-2 items-center text-[19px] font-normal py-3">
                <FaUser /> আমার প্রোফাইল
              </p>
              </Link>
              <p onClick={handleSignOut} className="cursor-pointer flex gap-2 items-center text-red-400 text-[17px] pb-4">
                <BiLogOut /> সাইন আউট
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/signin">সাইন ইন</Link>
          <Link
            href="/signup"
            className="py-2 px-4 bg-[#05893E] text-[#ffffff] rounded-xl"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
