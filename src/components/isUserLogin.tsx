"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // Checking is finished and there is no user
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  // While checking, or while redirecting, show a loader instead of the page
  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[#5C655E]">
        লোড হচ্ছে...
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;