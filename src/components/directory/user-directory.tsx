import { UserCard } from "@/components/directory/user-card";
import type { User } from "@/types/user";

type UserDirectoryProps = {
  users: User[];
};

export function UserDirectory({ users }: UserDirectoryProps) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <li key={user.id} className="min-w-0">
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
