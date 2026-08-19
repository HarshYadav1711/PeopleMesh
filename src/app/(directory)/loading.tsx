import { Card, CardContent } from "@/components/ui/card";
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
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-3.5 w-28" />
        </div>
        <Skeleton className="mt-5 h-8 w-24" />
      </CardContent>
    </Card>
  );
}

export default function HomeLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8"
    >
      <p className="sr-only">Loading directory</p>
      <header className="border-b border-border pb-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          PeopleMesh
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find people and understand where they fit.
        </h1>
      </header>

      <section aria-hidden="true" className="mt-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border px-4 py-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-8 w-10" />
            </div>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="mt-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="mt-1.5 h-8 w-full" />
          </div>
          <div className="w-full sm:w-56">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1.5 h-8 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-28" />
      </div>

      <ul
        aria-hidden="true"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
