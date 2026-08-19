"use client";

import { RouteError } from "@/components/states/route-error";

export default function HomeError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      description="We couldn't load the directory right now. Try again."
      reset={reset}
    />
  );
}
