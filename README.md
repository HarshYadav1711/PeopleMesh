# PeopleMesh

PeopleMesh is a focused people directory for finding people and understanding where they fit.

The product is intentionally small. The home page is for scanning a team quickly. A profile page is for reading a little more about one person. Search and department filters stay on the already-loaded directory so typing stays immediate.

## Capabilities

- Browse a people directory with name, title, department, company, and location
- Search locally by full name, email, and company
- Filter by department using values from the loaded data
- See directory totals for people, departments, and locations
- Open a profile with contact, work, and location details
- Handle loading, empty search results, missing profiles, and source failures

## Technologies

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- npm

## Data source

PeopleMesh reads public user records from [DummyJSON](https://dummyjson.com/users). No authentication, API key, or environment variable is required.

The directory requests a limited field set. Profiles request a single user by id. Passwords, banking details, and other unrelated fields from the source are not modeled or shown.

## Architecture

Server pages fetch data through a small access layer in `src/lib/users.ts`. Types live in `src/types/user.ts`. Directory UI lives in `src/components/directory`. Profile UI lives in `src/components/profile`.

The home page loads people on the server. Only the search and filter controls are client state. Filtered results are derived from the loaded users plus that UI state. The profile route stays server-rendered.

## Search and filters

Search does not call the network on each keystroke. Department options come from the returned records. Search and department filters combine. An empty match is an empty state, not an error.

## Loading, errors, and missing pages

Home and profile routes use layout-aware skeletons while data loads. Network and HTTP failures reach the route error UI with a retry action. Invalid or unknown user ids use not-found handling, which is separate from an API failure.

## Responsive design

The directory uses one card column on small screens, two when there is room, and three on wide screens. Search and department controls stack on narrow viewports. Profile sections become a single readable column. Long names and emails wrap or truncate instead of forcing horizontal scroll.

## Accessibility

Pages use semantic headings, lists, and labels. Profile navigation uses links. Retry uses a button. Result counts update through `aria-live`. Portraits have descriptive alt text. Focus styles stay visible.

## Trade-offs

- The directory uses DummyJSON's default page of people rather than loading the full remote catalog. That keeps the dataset small enough for local filtering.
- There is no app-owned API, database, or cache layer. The public source is enough for this product.
- Client state stays in the directory view. A global store would add movement without helping this size of UI.
- Directory and profile pages fetch at request time so a missing source becomes a recoverable error instead of a failed production build.

## Local setup

Use a current Node.js LTS release (Node 22 or 24). Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Later improvements

- Remember search and department in the URL so a view can be shared
- Add a clearer location format if the source data becomes more consistent
- Introduce an owned backend only if the product needs data that DummyJSON cannot provide
