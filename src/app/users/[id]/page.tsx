import { notFound } from "next/navigation";

import { UserProfile } from "@/components/profile/user-profile";
import { getUserById } from "@/lib/users";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (user === null) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        PeopleMesh
      </p>
      <div className="mt-8">
        <UserProfile user={user} />
      </div>
    </main>
  );
}
