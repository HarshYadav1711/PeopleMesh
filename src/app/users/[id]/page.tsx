import { notFound } from "next/navigation";

import { BrandMark, PageShell } from "@/components/layout/page-shell";
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
    <PageShell>
      <BrandMark />
      <div className="mt-6 sm:mt-8">
        <UserProfile user={user} />
      </div>
    </PageShell>
  );
}
