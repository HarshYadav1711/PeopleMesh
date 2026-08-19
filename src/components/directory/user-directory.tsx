"use client";

import { useState } from "react";

import { DirectoryStats } from "@/components/directory/directory-stats";
import { DirectoryToolbar } from "@/components/directory/directory-toolbar";
import { EmptyState } from "@/components/directory/empty-state";
import { UserCard } from "@/components/directory/user-card";
import type { User } from "@/types/user";

const ALL_DEPARTMENTS = "all";

type UserDirectoryProps = {
  users: User[];
};

function uniqueDepartments(users: User[]): string[] {
  return [...new Set(users.map((user) => user.company.department))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function UserDirectory({ users }: UserDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(ALL_DEPARTMENTS);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const matchesDepartment =
      selectedDepartment === ALL_DEPARTMENTS ||
      user.company.department === selectedDepartment;

    const matchesSearch =
      normalizedQuery.length === 0 ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery) ||
      user.company.name.toLowerCase().includes(normalizedQuery);

    return matchesDepartment && matchesSearch;
  });

  return (
    <>
      <DirectoryStats users={users} />
      <DirectoryToolbar
        searchQuery={searchQuery}
        selectedDepartment={selectedDepartment}
        departments={uniqueDepartments(users)}
        resultCount={filteredUsers.length}
        totalCount={users.length}
        onSearchQueryChange={setSearchQuery}
        onSelectedDepartmentChange={setSelectedDepartment}
      />

      {filteredUsers.length === 0 ? (
        <div className="mt-6">
          <EmptyState query={normalizedQuery.length > 0} />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <li key={user.id} className="min-w-0">
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
