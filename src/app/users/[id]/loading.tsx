import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton() {
  return (
    <section>
      <Skeleton className="h-4 w-20" />
      <div className="mt-2 h-px bg-border" />
      <div className="mt-4 space-y-3">
        <div>
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="mt-1.5 h-4 w-40" />
        </div>
        <div>
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="mt-1.5 h-4 w-32" />
        </div>
        <div>
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="mt-1.5 h-4 w-28" />
        </div>
      </div>
    </section>
  );
}

export default function UserLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8"
    >
      <p className="sr-only">Loading profile</p>
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        PeopleMesh
      </p>
      <div className="mt-8" aria-hidden="true">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <Skeleton className="size-[72px] shrink-0 rounded-full" />
            <div className="min-w-0">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-36" />
              <Skeleton className="mt-2 h-4 w-28" />
              <Skeleton className="mt-3 h-5 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-36 shrink-0" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    </main>
  );
}
