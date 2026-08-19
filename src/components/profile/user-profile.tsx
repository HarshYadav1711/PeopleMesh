import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type UserProfileProps = {
  user: User;
};

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

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

function ProfileLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "rounded-sm underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function UserProfile({ user }: UserProfileProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <article>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <Avatar className="relative size-14 shrink-0 overflow-hidden sm:size-[72px]">
            <Image
              src={user.image}
              alt={`Portrait of ${fullName}`}
              width={72}
              height={72}
              sizes="(max-width: 640px) 56px, 72px"
              className="size-full object-cover"
            />
          </Avatar>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-pretty break-words text-foreground sm:text-2xl">
              {fullName}
            </h1>
            <p className="mt-1 text-sm text-pretty break-words text-muted-foreground">
              {user.company.title}
            </p>
            <p className="mt-1 text-sm text-pretty break-words text-muted-foreground">
              {user.company.name}
            </p>
            <div className="mt-3">
              <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-fit shrink-0 min-h-9",
          )}
        >
          Back to directory
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 md:grid-cols-3 md:gap-8 lg:gap-10">
        <ProfileSection title="Contact">
          <ProfileField label="Email">
            <ProfileLink href={`mailto:${user.email}`} className="break-all">
              {user.email}
            </ProfileLink>
          </ProfileField>
          <ProfileField label="Phone">
            <ProfileLink href={toTelHref(user.phone)}>{user.phone}</ProfileLink>
          </ProfileField>
          <ProfileField label="Username">{user.username}</ProfileField>
        </ProfileSection>

        <ProfileSection title="Work">
          <ProfileField label="Department">{user.company.department}</ProfileField>
          <ProfileField label="Company">{user.company.name}</ProfileField>
          <ProfileField label="Title">{user.company.title}</ProfileField>
          <ProfileField label="University">{user.university}</ProfileField>
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
