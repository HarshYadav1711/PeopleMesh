import Link from "next/link";

export default function UserNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        PeopleMesh
      </p>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
        User not found
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        The profile you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mt-6 text-sm">
        <Link
          href="/"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          PeopleMesh
        </Link>
      </p>
    </main>
  );
}
