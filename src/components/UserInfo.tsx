"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { BiLogOut } from "react-icons/bi";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  // Wait for the session, so the sign-in buttons don't flash
  if (isPending) {
    return <div className="h-9 w-20 animate-pulse rounded-xl bg-[#F0F5F0] sm:h-10 sm:w-24" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 whitespace-nowrap sm:gap-4 text-xs sm:text-sm lg:text-base dropdown dropdown-end group">
        <Link href="/signin">সাইন ইন</Link>
        <Link
          href="/signup"
          className="rounded-xl bg-[#05893E] px-2.5 py-1.5 text-white sm:px-4 sm:py-2"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end group">
    <div
      tabIndex={0}
      role="button"
      className="m-0.5 flex cursor-pointer items-center gap-1.5 sm:m-1 sm:gap-3"
    >
      {user.image ? (
        <Image
          className="h-9 w-9 shrink-0 rounded-2xl object-cover sm:h-11 sm:w-11"
          alt={user.name ?? "ব্যবহারকারী"}
          src={user.image}
          width={50}
          height={50}
        />
      ) : (
        <FaCircleUser className="shrink-0 text-4xl sm:text-[2.75rem]" />
      )}

      <h3 className="hidden max-w-28 truncate text-base font-bold sm:block lg:max-w-40 lg:text-lg">
        {user.name}
      </h3>

      <FaAngleDown className="shrink-0 text-xs transition-transform duration-200 group-focus-within:rotate-180" />
    </div>

      <div
        tabIndex={-1}
        className="dropdown-content z-10 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-4 shadow-lg min-[400px]:w-72 sm:w-80 sm:p-6"
      >
        <h3 className="truncate text-lg font-medium sm:text-xl">{user.name}</h3>
        <p className="truncate text-sm text-[#5F6761] sm:text-base">{user.email}</p>

        <Link
          href="/profile"
          className="flex items-center gap-2 py-3 text-base sm:text-lg"
        >
          <FaUser /> আমার প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex cursor-pointer items-center gap-2 text-sm text-red-400 disabled:opacity-60 sm:text-base"
        >
          <BiLogOut /> {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;