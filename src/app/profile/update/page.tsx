"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UpdateProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // null মানে ব্যবহারকারী এখনো কিছু লেখেনি; তখন বর্তমান নাম দেখানো হয়
  const [typedName, setTypedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentName = user?.name ?? "";
  const name = typedName ?? currentName;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === currentName) {
      toast("আপনার নামে কোনো পরিবর্তন হয়নি।", {
        icon: "ℹ️",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({ name: updatedName });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div
        className="mx-auto mt-6 sm:mt-12 lg:mt-18 w-full max-w-md animate-pulse rounded-2xl bg-[#FAFCFA] p-4 sm:p-6"
        role="status"
        aria-label="লোড হচ্ছে"
      >
        <div className="h-6 w-40 rounded bg-[#E4ECE5]" />
        <div className="mt-5 h-4 w-24 rounded bg-[#E4ECE5]" />
        <div className="mt-2 h-11 w-full rounded-lg bg-[#E4ECE5]" />
        <div className="mt-5 h-11 w-full rounded-lg bg-[#E4ECE5]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto mt-6 sm:mt-12 lg:mt-18 w-full max-w-md rounded-2xl bg-[#FAFCFA] p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          তথ্য আপডেট করতে প্রথমে সাইন ইন করুন।
        </p>
        <Link
          href="/signin"
          className="mt-4 sm:mt-5 block w-full sm:w-auto rounded-lg bg-[#05893E] px-5 py-2.5 sm:py-3 text-center text-sm sm:text-base font-semibold text-white hover:bg-[#047832]"
        >
          সাইন ইন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 sm:mt-12 lg:mt-18 w-full max-w-md">
      <h2 className="py-1 sm:py-2 text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-gray-900">
        তথ্য আপডেট করুন
      </h2>

      <p className="mb-5 sm:mb-8 text-xs sm:text-sm lg:text-base text-[#69706B]">
        আপনার নাম বদলাতে নিচের ফর্মটি ব্যবহার করুন।
      </p>

      <div className="rounded-2xl bg-[#FAFCFA] p-3.5 min-[400px]:p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 sm:mb-2 block text-sm font-semibold text-gray-700"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              required
              className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
            />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <button
              type="submit"
              disabled={loading || name.trim() === currentName}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#05893E] px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:bg-[#047832] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>

            <Link
              href="/profile"
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 sm:py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;