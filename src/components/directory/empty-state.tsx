export function EmptyState({ query }: { query: boolean }) {
  return (
    <div className="rounded-xl border border-border px-4 py-12 text-center">
      <h2 className="text-base font-medium text-foreground">No people match</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {query
          ? "Nothing in the current directory matches this search and department filter. Try a different name, email, company, or department."
          : "There are no people to show for this department."}
      </p>
    </div>
  );
}
