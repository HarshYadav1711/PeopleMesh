import { Card, CardContent } from "@/components/ui/card";
import { BrandMark } from "@/components/layout/page-shell";
import { Skeleton } from "@/components/ui/skeleton";

function DirectoryCardSkeleton() {
  return (
    <Card size="sm" className="h-full">
      <CardContent className="flex h-full min-w-0 flex-col">
        <div className="flex items-start gap-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3.5 w-24" />
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3.5 w-40 max-w-full" />
          <Skeleton className="h-3.5 w-28" />
        </div>
        <Skeleton className="mt-5 h-9 w-24" />
      </CardContent>
    </Card>
  );
}

export default function HomeLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex min-h-dvh w-full min-w-0 max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <p className="sr-only">Loading directory</p>
      <header className="border-b border-border pb-5 sm:pb-6">
        <BrandMark />
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-pretty text-foreground sm:text-2xl lg:text-3xl">
          Find people and understand where they fit.
        </h1>
      </header>

      <section aria-hidden="true" className="mt-6 sm:mt-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="min-w-0 rounded-xl border border-border px-2 py-2.5 sm:px-4 sm:py-3"
            >
              <Skeleton className="h-3 w-14 sm:h-4 sm:w-24" />
              <Skeleton className="mt-2 h-6 w-8 sm:h-8 sm:w-10" />
            </div>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="mt-1.5 h-9 w-full" />
          </div>
          <div className="w-full min-w-0 md:w-60 lg:w-64">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1.5 h-9 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-28" />
      </div>

      <ul
        aria-hidden="true"
        className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="min-w-0">
            <DirectoryCardSkeleton />
          </li>
        ))}
      </ul>
    </main>
  );
}
