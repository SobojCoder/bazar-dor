import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-6 text-center sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F5F0] text-3xl sm:h-20 sm:w-20 sm:text-4xl">
          🥬
        </div>

        <h1 className="mt-4 text-5xl font-extrabold text-[#05893E] sm:text-6xl">
          ৪০৪
        </h1>

        <h2 className="mt-2 text-lg font-bold text-[#26332A] sm:text-xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা লিংকটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-[#05893E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#047334] sm:text-base"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFound;