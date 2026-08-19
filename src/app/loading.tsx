import { UserCardSkeleton } from "@/components/directory/user-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          PeopleMesh
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find people and understand where they fit.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          A focused people directory for finding people and understanding where
          they fit.
        </p>
      </header>

      <section aria-label="Loading directory summary" className="mt-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Skeleton className="h-[72px] rounded-xl" />
          <Skeleton className="h-[72px] rounded-xl" />
          <Skeleton className="h-[72px] rounded-xl" />
        </div>
      </section>

      <div className="mt-8 space-y-3">
        <Skeleton className="h-8 w-full sm:w-80" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
