"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";

const fields = [
  {
    name: "name",
    label: "নাম",
    type: "text",
    placeholder: "যেমন: রহিম উদ্দিন",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "ইমেইল",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "পাসওয়ার্ড",
    type: "password",
    placeholder: "কমপক্ষে ৮ অক্ষর",
    autoComplete: "new-password",
  },
  {
    name: "confirm",
    label: "পাসওয়ার্ড নিশ্চিত করুন",
    type: "password",
    placeholder: "আবার লিখুন",
    autoComplete: "new-password",
  },
];

export default function SignUpForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {name:string, email:string, password:string}

    const {data, error} = await authClient.signUp.email({
        ...user,
        callbackURL: "/"
    })

    if(data){
        console.log(data);
        redirect('/')
    }
    if(error){

        console.log(error);
    }

    setError("");

    if (values.password.length < 8) {
      return setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    }

    setLoading(true);
    try {
      // TODO: call your register API here
      // await fetch("/api/register", { method: "POST", body: JSON.stringify(values) });
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-50/60 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm sm:p-8">
          
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold text-red-700">সাইন ইন</h2>
       <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#26352b]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-3 text-sm text-[#26352b] outline-none transition placeholder:text-gray-500 focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#26352b]"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-3 pr-11 text-sm text-[#26352b] outline-none transition placeholder:text-gray-500 focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/10"
              />

              <button
                type="button"
                aria-label="পাসওয়ার্ড দেখুন"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#05893e]"
              >
                {/* {showPassword ? (
                  <FiEyeOff size={19} />
                ) : (
                  <BsEye size={19} />
                )} */}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-[#05893e] hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#05893e] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_0_#046b31] transition hover:bg-[#047833] active:translate-y-0.5 active:shadow-none"
          >
            সাইন ইন
          </button>
        </form>

      {/* <button onClick={handleGoogleSignIn} className="btn ">Sign In With Google</button>
      <button onClick={handleGithubSignIn} className="btn ">Sign In With Github</button> */}
    </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <FaGithub size={18} />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}
