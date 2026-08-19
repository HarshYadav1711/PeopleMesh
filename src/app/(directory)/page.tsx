import { UserDirectory } from "@/components/directory/user-directory";
import { BrandMark, PageShell } from "@/components/layout/page-shell";
import { getUsers } from "@/lib/users";

export default async function Home() {
  const users = await getUsers();

  return (
    <PageShell>
      <header className="border-b border-border pb-5 sm:pb-6">
        <BrandMark />
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-pretty text-foreground sm:text-2xl lg:text-3xl">
          Find people and understand where they fit.
        </h1>
      </header>

      <UserDirectory users={users} />
    </PageShell>
  );
}
