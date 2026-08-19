"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RouteErrorProps = {
  description: string;
  reset: () => void;
  showDirectoryLink?: boolean;
};

export function RouteError({
  description,
  reset,
  showDirectoryLink = false,
}: RouteErrorProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        PeopleMesh
      </p>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        {showDirectoryLink ? (
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to directory
          </Link>
        ) : null}
      </div>
    </main>
  );
}
