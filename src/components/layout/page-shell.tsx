import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const pageShellClassName =
  "mx-auto flex min-h-dvh w-full min-w-0 max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn(pageShellClassName, className)}>{children}</main>;
}

export function BrandMark() {
  return (
    <p className="text-sm font-medium tracking-wide text-muted-foreground">
      PeopleMesh
    </p>
  );
}
