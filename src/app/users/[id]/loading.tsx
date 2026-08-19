import Link from "next/link";

import { ProfileSkeleton } from "@/components/profile/profile-skeleton";

export default function UserDetailsLoading() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          PeopleMesh
        </Link>
      </p>
      <div className="mt-8">
        <ProfileSkeleton />
      </div>
    </main>
  );
}
