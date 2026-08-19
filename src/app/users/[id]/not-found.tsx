import Link from "next/link";

import { BrandMark, PageShell } from "@/components/layout/page-shell";

export default function UserNotFound() {
  return (
    <PageShell>
      <BrandMark />
      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
        User not found
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        The profile you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mt-6 text-sm">
        <Link
          href="/"
          className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          PeopleMesh
        </Link>
      </p>
    </PageShell>
  );
}
