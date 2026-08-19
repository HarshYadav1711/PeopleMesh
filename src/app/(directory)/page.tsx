import { UserDirectory } from "@/components/directory/user-directory";
import { getUsers } from "@/lib/users";

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          PeopleMesh
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find people and understand where they fit.
        </h1>
      </header>

      <UserDirectory users={users} />
    </main>
  );
}
