"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

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
    if (values.password !== values.confirm) {
      return setError("দুটি পাসওয়ার্ড মিলছে না।");
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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {fields.map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  value={values[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                />
              </div>
            ))}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
            onClick={handleGoogleSignIn}
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </button>
            <button
            onClick={handleGithubSignIn}
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
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
