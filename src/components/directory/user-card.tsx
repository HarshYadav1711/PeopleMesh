import Image from "next/image";
import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const location = `${user.address.city}, ${user.address.country}`;

  return (
    <Card size="sm" className="h-full overflow-visible transition-colors hover:bg-muted/40">
      <CardContent className="flex h-full min-w-0 flex-col">
        <div className="flex items-start gap-3">
          <Avatar className="relative size-12 overflow-hidden">
            <Image
              src={user.image}
              alt={`Portrait of ${fullName}`}
              width={48}
              height={48}
              sizes="48px"
              className="size-full object-cover"
            />
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-medium leading-snug text-foreground" title={fullName}>
              {fullName}
            </h2>
            <p
              className="mt-0.5 truncate text-sm text-muted-foreground"
              title={user.company.title}
            >
              {user.company.title}
            </p>
          </div>
        </div>

        <div className="mt-4 min-w-0 space-y-1.5 text-sm">
          <div className="max-w-full min-w-0 overflow-hidden">
            <Badge variant="secondary">{user.company.department}</Badge>
          </div>
          <p className="truncate text-muted-foreground" title={user.company.name}>
            {user.company.name}
          </p>
          <p className="truncate text-muted-foreground" title={location}>
            {location}
          </p>
        </div>

        <Link
          href={`/users/${user.id}`}
          className={cn(buttonVariants({ variant: "outline" }), "mt-auto w-fit min-h-9 pt-5")}
        >
          View profile
          <span className="sr-only"> for {fullName}</span>
        </Link>
      </CardContent>
    </Card>
  );
}
