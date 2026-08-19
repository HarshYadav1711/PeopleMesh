"use client";

import { useState } from "react";

import { UserCard } from "@/components/directory/user-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types/user";

const ALL_DEPARTMENTS = "all";

type UserDirectoryProps = {
  users: User[];
};

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function UserDirectory({ users }: UserDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(ALL_DEPARTMENTS);

  const departments = uniqueSorted(users.map((user) => user.company.department));
  const query = searchQuery.trim().toLowerCase();
  const hasActiveFilters =
    query.length > 0 || selectedDepartment !== ALL_DEPARTMENTS;

  const filteredUsers = users.filter((user) => {
    const matchesDepartment =
      selectedDepartment === ALL_DEPARTMENTS ||
      user.company.department === selectedDepartment;

    const matchesSearch =
      query.length === 0 ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query);

    return matchesDepartment && matchesSearch;
  });

  function clearFilters() {
    setSearchQuery("");
    setSelectedDepartment(ALL_DEPARTMENTS);
  }

  const departmentItems = {
    [ALL_DEPARTMENTS]: "All departments",
    ...Object.fromEntries(departments.map((department) => [department, department])),
  };

  return (
    <>
      <section aria-label="Directory summary" className="mt-8">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="People" value={users.length} />
          <Stat label="Departments" value={departments.length} />
          <Stat
            label="Locations"
            value={uniqueSorted(users.map((user) => user.address.city)).length}
          />
        </dl>
      </section>

      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label
              htmlFor="directory-search"
              className="text-sm font-medium text-foreground"
            >
              Search
            </label>
            <Input
              id="directory-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name, email, or company"
              autoComplete="off"
              className="mt-1.5"
            />
          </div>

          <div className="w-full sm:w-56">
            <label
              htmlFor="department-filter"
              className="text-sm font-medium text-foreground"
            >
              Department
            </label>
            <Select
              value={selectedDepartment}
              onValueChange={(value) => {
                if (value) {
                  setSelectedDepartment(value);
                }
              }}
              items={departmentItems}
            >
              <SelectTrigger
                id="department-filter"
                className="mt-1.5 w-full"
                aria-label="Filter by department"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} align="start">
                <SelectItem value={ALL_DEPARTMENTS}>All departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {hasActiveFilters
              ? `Showing ${filteredUsers.length} of ${users.length} people`
              : `${users.length} people`}
          </p>
          {hasActiveFilters ? (
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border px-4 py-12 text-center">
          <h2 className="text-base font-medium text-foreground">
            No matching people
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {query.length > 0
              ? `Nothing matches “${searchQuery.trim()}” with the current department filter.`
              : "There are no people in this department."}
          </p>
          {hasActiveFilters ? (
            <Button type="button" variant="outline" className="mt-4" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </dd>
    </div>
  );
}
