"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  // এই পেজে থাকা অবস্থায় ব্যবহারকারী লগইন ছিল কিনা
  const wasLoggedIn = useRef(false);

  useEffect(() => {
    // সেশন যাচাই চলছে
    if (isPending) return;

    if (user) {
      wasLoggedIn.current = true;
      return;
    }

    // এই পেজে থেকেই সাইন আউট করেছে: redirect ও toast সাইন আউটের কোডই সামলায়
    if (wasLoggedIn.current) return;

    // শুরু থেকেই লগইন নেই
    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "login-required" });
    router.replace("/signin");
  }, [isPending, user, router]);

  // যাচাই বা redirect চলার সময় পেজের বদলে skeleton
  if (isPending || !user) {
    return (
      <div
        className="mt-6 sm:mt-8 lg:mt-10 w-full animate-pulse"
        role="status"
        aria-label="লোড হচ্ছে"
      >
        <div className="my-3 sm:my-5 h-4 w-48 rounded bg-[#E4ECE5]" />
        <div className="h-24 sm:h-28 w-full rounded-2xl bg-[#E4ECE5]" />
        <div className="mt-3 sm:mt-6 h-64 sm:h-72 w-full rounded-2xl bg-[#E4ECE5]" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;