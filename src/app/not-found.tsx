

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FAFCFA] px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">

        {/* Logo / Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8F5EC] text-4xl shadow-sm">
          🛒
        </div>

        {/* Spinner */}
        <div className="relative mb-6 flex h-14 w-14 items-center justify-center">
          <div className="absolute h-14 w-14 animate-spin rounded-full border-4 border-[#DCEFE2] border-t-[#05893E]" />

          <div className="h-3 w-3 rounded-full bg-[#05893E]" />
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-xl font-bold text-[#183524] sm:text-2xl">
          একটু অপেক্ষা করুন...
        </h1>

        <p className="max-w-xs text-sm leading-6 text-[#7C837D] sm:text-base">
          আপনার জন্য বাজারের সর্বশেষ তথ্য ও পণ্যের দাম
          নিয়ে আসা হচ্ছে।
        </p>

        {/* Loading dots */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E] [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E] [animation-delay:300ms]" />
        </div>

        {/* Brand */}
        <p className="mt-8 text-xs font-medium tracking-wide text-[#9AA39C]">
          বাজার দর — নিত্যপণ্যের সঠিক দামের খোঁজে
        </p>

      </div>
    </main>
  );
}