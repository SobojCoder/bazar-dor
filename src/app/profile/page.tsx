"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Update the input when the user data becomes available
  const currentName = user?.name ?? "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === currentName) {
      toast.info("আপনার নামে কোনো পরিবর্তন হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      if (data) {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        // Refresh session-dependent UI if needed
        await authClient.getSession();
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

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

  if (isPending) {
    return (
      <div className="mt-6 sm:mt-12 lg:mt-18 px-4 sm:px-0 text-sm sm:text-base text-gray-600">
        প্রোফাইল লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-6 sm:mt-12 lg:mt-18 rounded-2xl bg-[#FAFCFA] p-4 sm:p-6">
        <h2 className="text-lg min-[400px]:text-xl sm:text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-600">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 sm:mt-5 w-full sm:w-auto rounded-lg bg-[#05893E] px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#047832]"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-12 lg:mt-18">
      <h2 className="py-1 sm:py-2 text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-gray-900">
        আমার প্রোফাইল
      </h2>

      <p className="mb-5 sm:mb-9 text-xs sm:text-sm lg:text-base text-[#69706B]">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      {/* Profile Card */}
      <div className="flex flex-col justify-between gap-3.5 sm:gap-5 rounded-2xl bg-[#FAFCFA] p-3.5 min-[400px]:p-4 sm:p-6 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            {user.image ? (
              <Image
                className="h-12 w-12 min-[400px]:h-14 min-[400px]:w-14 sm:h-[70px] sm:w-[70px] rounded-2xl object-cover"
                alt="Profile avatar"
                src={user.image}
                width={70}
                height={70}
              />
            ) : (
              <FaCircleUser className="text-5xl sm:text-[60px] text-gray-400" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-base min-[400px]:text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">
              {user.name || "নাম দেওয়া হয়নি"}
            </h3>

            <p className="break-all text-xs sm:text-sm text-[#69706B]">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-400 px-4 py-2 text-sm sm:text-base text-red-500 transition hover:bg-red-50 disabled:opacity-60 sm:self-auto"
        >
          <BiLogOut size={20} />
          {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
        </button>
      </div>

      {/* Profile Information */}
      <div className="mt-3.5 sm:mt-5 rounded-2xl bg-[#FAFCFA] p-3.5 min-[400px]:p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
          তথ্য
        </h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 pt-3 sm:p-6 lg:max-w-2xl lg:p-9"
        >
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
              onChange={(e) => setName(e.target.value)}
              placeholder={currentName || "আপনার নাম লিখুন"}
              autoComplete="name"
              required
              className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
            />
          </div>


          <button
            type="submit"
            disabled={loading || name.trim() === currentName}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#05893E] px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:bg-[#047832] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;