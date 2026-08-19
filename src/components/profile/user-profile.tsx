import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFullName, toTelHref } from "@/lib/users";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type UserProfileProps = {
  user: User;
};

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0">
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      <Separator className="mt-2" />
      <dl className="mt-4 space-y-3">{children}</dl>
    </section>
  );
}

function ProfileField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 break-words text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function UserProfile({ user }: UserProfileProps) {
  const fullName = getFullName(user);

  return (
    <article>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <Image
            src={user.image}
            alt={`Portrait of ${fullName}`}
            width={72}
            height={72}
            className="size-[72px] shrink-0 rounded-full bg-muted object-cover"
          />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {fullName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {user.company.title}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{user.company.department}</Badge>
              <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "w-fit shrink-0")}
        >
          Back to directory
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProfileSection title="Profile">
          <ProfileField label="Name">{fullName}</ProfileField>
          <ProfileField label="Role">{user.role}</ProfileField>
          <ProfileField label="Title">{user.company.title}</ProfileField>
          <ProfileField label="University">{user.university}</ProfileField>
        </ProfileSection>

        <ProfileSection title="Contact">
          <ProfileField label="Email">
            <a
              href={`mailto:${user.email}`}
              className="underline-offset-4 hover:underline"
            >
              {user.email}
            </a>
          </ProfileField>
          <ProfileField label="Phone">
            <a
              href={toTelHref(user.phone)}
              className="underline-offset-4 hover:underline"
            >
              {user.phone}
            </a>
          </ProfileField>
          <ProfileField label="Username">{user.username}</ProfileField>
        </ProfileSection>

        <ProfileSection title="Work">
          <ProfileField label="Company">{user.company.name}</ProfileField>
          <ProfileField label="Department">{user.company.department}</ProfileField>
          <ProfileField label="Title">{user.company.title}</ProfileField>
        </ProfileSection>

        <ProfileSection title="Location">
          <ProfileField label="City">{user.address.city}</ProfileField>
          <ProfileField label="State">{user.address.state}</ProfileField>
          <ProfileField label="Country">{user.address.country}</ProfileField>
        </ProfileSection>
      </div>
    </article>
  );
}
