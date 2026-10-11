"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
 const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {name:string, email:string, password:string}
console.log(user);
    const {data, error} = await authClient.signIn.email({
        ...user,
        callbackURL: "/"
    })

    if(data){
        toast.success("Login successfully")
        console.log(data);
    }
    if(error){
        toast.error(error.message)
        console.log(error);
    }

    


    setError("");

    if (!values.email || !values.password) {
      return setError("ইমেইল ও পাসওয়ার্ড দুটোই দিন।");
    }

    setLoading(true);
    try {
      // TODO: call your sign-in logic here
      // e.g. await signIn("credentials", { ...values, redirect: false });
    } catch {
      setError("ইমেইল বা পাসওয়ার্ড ঠিক নয়।");
    } finally {
      setLoading(false);
    }
  };
const handleGoogleSignIn = async() =>{
        const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
    }
const handleGithubSignIn = async() =>{
        const data = await authClient.signIn.social({
    provider: "github",
  });
  console.log(data);
    }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20";

  const socialClass =
    "flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50";

  return (
    <main className="min-h-screen bg-emerald-50/60 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-900">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-900">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button onClick={handleGoogleSignIn} type="button" className=" cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </button>
            <button onClick={handleGithubSignIn} type="button" className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
              <FaGithub size={18} />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-medium text-green-700 hover:underline">
              সাইন আপ করুন
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