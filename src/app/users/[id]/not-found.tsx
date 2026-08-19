import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UserNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          PeopleMesh
        </Link>
      </p>

      <header className="mt-8 border-b border-border pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Person not found
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          This profile is not in the directory, or the link is no longer valid.
        </p>
      </header>

      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8 w-fit")}>
        Back to directory
      </Link>
    </main>
  );
}
