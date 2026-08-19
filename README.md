# PeopleMesh

Finding someone in an organization should not feel like querying a database. PeopleMesh is a small people directory that presents colleagues as people first: a scannable list on one side, a full profile on the other.

The home page is a compact directory with counts, search, and a department filter. Selecting someone opens a dedicated profile that separates identity from contact, work, and location details.

## Live Demo

https://people-mesh.vercel.app/

## Overview

PeopleMesh is a Next.js App Router frontend. It reads a public demo dataset, validates it in a thin data layer, and renders two screens:

- `/` — directory of people
- `/users/[id]` — individual profile

There is no authentication, no application database, and no custom backend. The app is intentionally small so the interface, loading states, and failure cases stay easy to follow.

## What PeopleMesh Does

On the directory, each card shows a portrait, name, job title, department, company, and city/country, with a link to the profile. Summary counts cover people, distinct departments, and distinct cities in the loaded set.

Search matches name, email, or company. The department control filters the same list. Filtering happens in the browser against the people already fetched for the page.

A profile shows:

- Identity: name, title, company, role
- Contact: email (`mailto`), phone (`tel`), username
- Work: department, company, title, university
- Location: city, state, country

Invalid or unknown profile IDs show a not-found page. Failed network or HTTP requests show a retryable error page, not a fake person.

## Technology

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (Base UI primitives)

The package manager is npm.

## Data Source

People come from [DummyJSON](https://dummyjson.com/users), a public demo API. The directory requests 30 users and asks only for the fields the UI needs. Responses are revalidated about once an hour (`next.revalidate: 3600`) so the listing is not fetched on every request.

`src/lib/users.ts` is the only place that knows the DummyJSON URL. It parses JSON, checks required strings and nested address/company objects, and maps the result onto `src/types/user.ts`. A malformed payload throws. A profile `404` from DummyJSON is treated as a missing person. Other non-OK statuses and network failures throw and surface as request errors.

Portrait URLs are hosted on `dummyjson.com`. `next.config.ts` allows Next.js Image for `https://dummyjson.com/icon/**` only.

## Application Structure

```
src/app/
  layout.tsx                 Root document, metadata, font
  (directory)/               Home route group (URL stays /)
    page.tsx
    loading.tsx
    error.tsx
  users/[id]/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx
src/components/
  directory/                 Cards and the client directory UI
  profile/                   Profile layout
  layout/                    Shared page width and brand line
  states/                    Shared request-error UI
  ui/                        shadcn components
src/lib/users.ts             Fetch and validation
src/types/user.ts            User types
```

The `(directory)` group exists so home loading and error UI do not wrap profile routes.

## Server and Client Responsibilities

Server Components load data and render pages.

- `getUsers()` runs in the home page.
- `getUserById()` runs in the profile page. Non-numeric IDs, IDs below 1, and DummyJSON `404` responses call `notFound()`.

Client Components are used where the browser must hold UI state or handle a Next.js error boundary:

- `UserDirectory` — search query, selected department, derived filtered list
- `error.tsx` files and `RouteError` — `reset()` to retry the route
- Interactive shadcn pieces such as Select and Avatar

Profile presentation (`UserProfile`) and directory cards (`UserCard`) are not marked `"use client"`. Cards render inside the client directory because that is where the filtered list lives.

## Search and Filtering

Search and department filtering are React state in `UserDirectory`. The visible list is derived with `filter` on each render. There is no `useEffect` to sync filters, no URL query string, and no global store.

Search is case-insensitive and matches:

- first + last name
- email
- company name

Department options are the unique department names in the loaded users, sorted alphabetically, plus “All departments”.

When filters exclude everyone, the UI shows **No matching people** and a way to clear filters. That is an empty result, not a failed request.

## User Profiles

Routes look like `/users/1`. IDs must be positive integers; `abc` or `0` never hit DummyJSON and render the same not-found experience as a missing record.

The profile keeps the directory as a `Back to directory` link. Email and phone are ordinary links. Long values wrap instead of overflowing the layout.

## Loading Behaviour

Each route has a `loading.tsx` skeleton that follows the finished layout: directory header, stat placeholders, toolbar, and cards on home; avatar, identity lines, and section blocks on a profile. These are CSS pulse placeholders, not a full-screen spinner.

Home loading lives in the directory route group so navigating to a profile does not flash the directory skeleton.

## Error Handling

The app distinguishes three unsuccessful outcomes:

| Situation | What happens |
| --- | --- |
| Request error | Fetch fails, DummyJSON returns a non-404 error, or the payload cannot be parsed. The route `error.tsx` shows “Something went wrong”, a short explanation, and **Try again** (`reset`). Profile errors also link back to the directory. Exception stacks are not shown in the UI. |
| Missing user | Unknown or invalid id. `not-found.tsx` shows “User not found” and a link to PeopleMesh. This is not treated as an outage. |
| Empty filtering result | The API succeeded; client filters matched nobody. The directory stays on screen with empty-state copy. |

Failed requests do not invent fallback users.

## Responsive Design

Pages use a shared `max-w-5xl` shell so a wide desktop does not stretch the content to the viewport edge.

- Narrow viewports: stacked search and department controls, single-column cards, compact three-column stats
- Medium: two-column cards, search and filter on one row
- Large: three-column cards; profile contact, work, and location in three columns

Cards truncate long titles and company names. Profiles wrap those strings. Horizontal overflow is avoided with `min-w-0` and `overflow-x-clip` on the body.

## Accessibility Considerations

- One `h1` per page; people and profile sections use `h2`
- Search and department have visible labels tied to their controls
- Directory actions that navigate are links; retry and clear filters are buttons
- “View profile” includes a visually hidden “for [name]” so links are distinguishable
- Portraits use `alt` text of the form “Portrait of [name]”
- Filter result counts update in an `aria-live` region
- Text links expose a focus ring; primary controls use a larger tap target (`min-h-9`)

The app does not add ARIA where a native label or heading already describes the control.

## Design Approach

The visual system is a light layout, restrained borders, and type hierarchy. There is no marketing hero, logo illustration, gradient backdrop, or dark-mode theme. Motion is limited to CSS hover, focus, and skeleton pulse.

The aim is a directory that stays readable under real strings (long emails, department names, company names) and stays maintainable without extra animation libraries.

## Why There Is No Global State Library

The only interactive state is the current search string and department on the home page. That state is local, discarded on leave, and cheap to derive from the `users` array the server already passed in.

A global store would not share data between `/` and `/users/[id]`; each route fetches on the server. Adding Redux, Zustand, or similar would be ceremony around two `useState` calls.

## Why There Is No Internal API Proxy

DummyJSON is already an HTTP JSON API. Next.js Server Components can `fetch` it directly. A local `/api/users` route would repeat the same URL, status checks, and JSON shape without adding auth, aggregation, or hiding credentials.

The data layer is the boundary that matters: one module owns the endpoint, field selection, caching hint, and runtime validation. UI code imports `getUsers` / `getUserById` and never mentions DummyJSON.

## Getting Started

Use a current Node.js LTS release (Next.js 16 expects Node 20.9 or later). Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

`npm start` serves the production build.

## Development Philosophy

Keep server work on the server: data loading, validation, and not-found. Keep the client for filters and error retry. Prefer derived lists over effects. Fail in a way the user can classify (retry vs. missing vs. no matches). Prefer a stable layout over decorative motion.

## Possible Next Steps

These are not implemented:

- Server-side search and pagination if the dataset grows past a single page of 30
- Sorting controls
- Search and department reflected in the URL
- Authentication and a real org directory instead of DummyJSON
- Automated tests (unit tests for parsing/filtering, a few route-level checks)

## Final Note

PeopleMesh is a focused frontend: two routes, a validated public data source, and explicit empty, missing, and error states. Extra infrastructure was left out until a real product constraint requires it.
