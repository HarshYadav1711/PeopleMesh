"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UserDetailsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          PeopleMesh
        </Link>
      </p>

      <section className="mt-10 max-w-lg rounded-xl border border-border px-4 py-6">
        <h1 className="text-base font-medium text-foreground">
          Couldn&apos;t load this profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          PeopleMesh couldn&apos;t reach the people source right now. Check
          your connection and try again.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to directory
          </Link>
        </div>
      </section>
    </main>
  );
}
