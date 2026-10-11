const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3.5"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gray-200" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-2.5 w-16 rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-2.5 w-14 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
          <div className="h-6 w-16 rounded-3xl bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);

export default ProductGridSkeleton;