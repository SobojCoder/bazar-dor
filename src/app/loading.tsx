const SkeletonCard = () => (
  <div className="h-full w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3.5 lg:p-4">
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="h-11 w-11 shrink-0 rounded-xl bg-[#E4ECE5] lg:h-12 lg:w-12" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-[#E4ECE5]" />
        <div className="h-3 w-1/2 rounded bg-[#E4ECE5]" />
      </div>
    </div>

    <div className="mt-3 flex items-end justify-between gap-2">
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-[#E4ECE5]" />
        <div className="h-5 w-20 rounded bg-[#E4ECE5]" />
      </div>
      <div className="h-6 w-14 rounded-3xl bg-[#E4ECE5] sm:w-16" />
    </div>
  </div>
);

const SectionTitle = () => (
  <div className="my-3 sm:my-4 flex items-center gap-2">
    <div className="h-6 w-6 rounded bg-[#E4ECE5] sm:h-7 sm:w-7" />
    <div className="h-6 w-36 rounded bg-[#E4ECE5] sm:h-7 sm:w-48" />
  </div>
);

const Loading = () => {
  return (
    <div
      className="w-full animate-pulse"
      role="status"
      aria-label="লোড হচ্ছে"
    >
      {/* Hero */}
      <div className="mt-4 sm:mt-6 flex flex-col-reverse items-center gap-6 rounded-3xl bg-[#FAFCFA] p-4 sm:p-8 lg:flex-row lg:justify-between lg:gap-10 lg:p-12">
        <div className="w-full space-y-3 sm:space-y-4 lg:max-w-xl">
          <div className="h-4 w-32 rounded bg-[#E4ECE5]" />
          <div className="h-8 w-full rounded bg-[#E4ECE5] sm:h-10 lg:h-12" />
          <div className="h-8 w-3/4 rounded bg-[#E4ECE5] sm:h-10 lg:h-12" />
          <div className="h-4 w-full rounded bg-[#E4ECE5]" />
          <div className="h-4 w-5/6 rounded bg-[#E4ECE5]" />
          <div className="h-11 w-full rounded-xl bg-[#E4ECE5] sm:w-44" />
        </div>
        <div className="h-44 w-full rounded-2xl bg-[#E4ECE5] sm:h-64 lg:h-72 lg:max-w-md" />
      </div>

      {/* Section A: দাম বেড়েছে */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <SectionTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

      {/* Section B: দাম কমেছে */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <SectionTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

      {/* Section C: সব পণ্য */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <div className="mb-4 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="h-6 w-28 rounded bg-[#E4ECE5] sm:h-7 sm:w-36" />
          <div className="h-4 w-48 rounded bg-[#E4ECE5]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;