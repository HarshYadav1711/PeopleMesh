import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_DEPARTMENTS = "all";

type DirectoryToolbarProps = {
  searchQuery: string;
  selectedDepartment: string;
  departments: string[];
  resultCount: number;
  totalCount: number;
  onSearchQueryChange: (value: string) => void;
  onSelectedDepartmentChange: (value: string) => void;
};

export function DirectoryToolbar({
  searchQuery,
  selectedDepartment,
  departments,
  resultCount,
  totalCount,
  onSearchQueryChange,
  onSelectedDepartmentChange,
}: DirectoryToolbarProps) {
  const departmentItems = {
    [ALL_DEPARTMENTS]: "All departments",
    ...Object.fromEntries(departments.map((department) => [department, department])),
  };

  return (
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
            onChange={(event) => onSearchQueryChange(event.target.value)}
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
                onSelectedDepartmentChange(value);
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

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {resultCount} of {totalCount} {totalCount === 1 ? "person" : "people"}
      </p>
    </div>
  );
}
