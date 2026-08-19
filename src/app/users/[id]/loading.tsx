import { BrandMark } from "@/components/layout/page-shell";
import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton() {
  return (
    <section>
      <Skeleton className="h-4 w-20" />
      <div className="mt-2 h-px bg-border" />
      <div className="mt-4 space-y-3">
        <div>
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="mt-1.5 h-4 w-40 max-w-full" />
        </div>
        <div>
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="mt-1.5 h-4 w-32 max-w-full" />
        </div>
        <div>
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="mt-1.5 h-4 w-28 max-w-full" />
        </div>
      </div>
    </section>
  );
}

export default function UserLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex min-h-dvh w-full min-w-0 max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <p className="sr-only">Loading profile</p>
      <BrandMark />
      <div className="mt-6 sm:mt-8" aria-hidden="true">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <Skeleton className="size-14 shrink-0 rounded-full sm:size-[72px]" />
            <div className="min-w-0">
              <Skeleton className="h-7 w-40 sm:h-8 sm:w-48" />
              <Skeleton className="mt-2 h-4 w-36 max-w-full" />
              <Skeleton className="mt-2 h-4 w-28 max-w-full" />
              <Skeleton className="mt-3 h-5 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-9 w-36 shrink-0" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 md:grid-cols-3">
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    </main>
  );
}
