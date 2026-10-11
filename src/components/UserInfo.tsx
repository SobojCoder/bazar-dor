"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

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
          <button
            onClick={handleSignOut}
            className="btn bg-green-300 py-2 px-4 rounded-2xl"
          >
            Sign Out
          </button>
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
