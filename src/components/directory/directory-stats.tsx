import type { User } from "@/types/user";

type DirectoryStatsProps = {
  users: User[];
};

function uniqueCount(values: string[]): number {
  return new Set(values).size;
}

export function DirectoryStats({ users }: DirectoryStatsProps) {
  const totalPeople = users.length;
  const uniqueDepartments = uniqueCount(
    users.map((user) => user.company.department)
  );
  const uniqueLocations = uniqueCount(
    users.map((user) => `${user.address.city}, ${user.address.country}`)
  );

  const items = [
    { label: "People", value: totalPeople },
    { label: "Departments", value: uniqueDepartments },
    { label: "Locations", value: uniqueLocations },
  ];

  return (
    <section aria-label="Directory summary" className="mt-8">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border px-4 py-3"
          >
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
