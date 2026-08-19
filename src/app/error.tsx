"use client";

import { Button } from "@/components/ui/button";

export default function HomeError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          PeopleMesh
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find people and understand where they fit.
        </h1>
      </header>

      <section className="mt-10 max-w-lg rounded-xl border border-border px-4 py-6">
        <h2 className="text-base font-medium text-foreground">
          Couldn&apos;t load the directory
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          PeopleMesh couldn&apos;t reach the people source right now. Check
          your connection and try again.
        </p>
        <Button type="button" className="mt-4" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
