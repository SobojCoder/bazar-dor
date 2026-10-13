type Props = {
  count?: number;
  // "three": বেড়েছে/কমেছে সেকশন (সর্বোচ্চ ৩ কলাম)
  // "four": সব পণ্য ও ক্যাটাগরি পেজ (সর্বোচ্চ ৪ কলাম)
  columns?: "three" | "four";
};

const gridClasses = {
  three: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  four: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const ProductGridSkeleton = ({ count = 6, columns = "three" }: Props) => (
  <div
    className={`grid ${gridClasses[columns]} gap-3 sm:gap-4 lg:gap-5 animate-pulse`}
    role="status"
    aria-label="লোড হচ্ছে"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-full w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3.5 lg:p-4"
      >
        {/* আইকন + নাম + ইউনিট */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-11 w-11 shrink-0 rounded-xl bg-[#E4ECE5] lg:h-12 lg:w-12" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-[#E4ECE5]" />
            <div className="h-3 w-1/2 rounded bg-[#E4ECE5]" />
          </div>
        </div>

        {/* দাম + ব্যাজ */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="space-y-2">
            <div className="h-3 w-14 rounded bg-[#E4ECE5]" />
            <div className="h-5 w-20 rounded bg-[#E4ECE5] lg:h-6" />
          </div>
          <div className="h-6 w-14 shrink-0 rounded-3xl bg-[#E4ECE5] sm:h-7 sm:w-16" />
        </div>
      </div>
    ))}
  </div>
);

export default ProductGridSkeleton;