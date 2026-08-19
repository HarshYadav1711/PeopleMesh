"use client";

import { RouteError } from "@/components/states/route-error";

export default function UserError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      description="We couldn't load this profile right now. Try again."
      reset={reset}
      showDirectoryLink
    />
  );
}
