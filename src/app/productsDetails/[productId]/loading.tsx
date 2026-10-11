import ProductGridSkeleton from "@/components/skeleton/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="h-16 animate-pulse rounded-2xl bg-gray-200 mb-6" />
      <ProductGridSkeleton />
    </div>
  );
}