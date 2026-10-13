"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const fields: {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
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
  const router = useRouter();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // ১. আগে যাচাই, তারপর সার্ভারে পাঠানো
    if (!values.name.trim()) {
      return showError("আপনার নাম লিখুন।");
    }
    if (!values.email.trim()) {
      return showError("আপনার ইমেইল লিখুন।");
    }
    if (values.password.length < 8) {
      return showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    }
    if (values.password !== values.confirm) {
      return showError("দুটি পাসওয়ার্ড মিলছে না।");
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      // ২. ব্যর্থ হলে toast ও ফর্মে বার্তা
      if (error) {
        return showError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
      }

      // ৩. সফল হলে লগইন পেজে নেওয়া
      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch {
      showError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-screen bg-emerald-50/60 px-3 py-6 sm:px-4 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-4 sm:mb-6 text-center">
          <h1 className="text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white/70 p-4 shadow-sm min-[400px]:p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
            {fields.map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className="mb-1 sm:mb-1.5 block text-sm font-medium text-gray-900"
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
                  className="block w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                />
              </div>
            ))}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 sm:my-5 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs min-[360px]:text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs min-[360px]:text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <FaGithub size={18} />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}