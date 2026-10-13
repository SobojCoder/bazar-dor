const SkeletonCard = () => (
  <div className="h-full w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3.5 sm:p-3.5 lg:p-4">
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

const Loading = () => {
  return (
    <div
      className="mt-6 sm:mt-8 lg:mt-10 w-full animate-pulse"
      role="status"
      aria-label="লোড হচ্ছে"
    >
      {/* Breadcrumb */}
      <div className="my-3 sm:my-5 flex items-center gap-2">
        <div className="h-4 w-10 rounded bg-[#E4ECE5]" />
        <div className="h-4 w-3 rounded bg-[#E4ECE5]" />
        <div className="h-4 w-24 rounded bg-[#E4ECE5]" />
      </div>

      {/* Category header */}
      <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-[#FAFCFA] py-3 sm:py-4 px-3.5 sm:px-6">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#E4ECE5] sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-32 rounded bg-[#E4ECE5] sm:h-6 sm:w-40" />
          <div className="h-3 w-48 max-w-full rounded bg-[#E4ECE5] sm:h-4 sm:w-64" />
        </div>
      </div>

      {/* Sort box */}
      <div className="mt-3 sm:mt-6 flex justify-end rounded-2xl bg-[#FAFCFA] py-2.5 sm:py-4 px-3.5 sm:px-6">
        <div className="h-9 w-40 rounded-xl bg-[#E4ECE5] sm:h-10 sm:w-52" />
      </div>

      {/* Total count text */}
      <div className="mt-3 h-4 w-44 rounded bg-[#E4ECE5]" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;