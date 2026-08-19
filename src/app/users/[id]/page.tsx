import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import { UserProfile } from "@/components/profile/user-profile";
import { getFullName, getUserById } from "@/lib/users";

export async function generateMetadata({
  params,
}: PageProps<"/users/[id]">): Promise<Metadata> {
  await connection();
  const { id } = await params;
  const result = await getUserById(id);

  if (result.status === "missing") {
    return { title: "Person not found" };
  }

  return { title: getFullName(result.user) };
}

export default async function UserDetailsPage({
  params,
}: PageProps<"/users/[id]">) {
  await connection();
  const { id } = await params;
  const result = await getUserById(id);

  if (result.status === "missing") {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          PeopleMesh
        </Link>
      </p>
      <div className="mt-8">
        <UserProfile user={result.user} />
      </div>
    </main>
  );
}
