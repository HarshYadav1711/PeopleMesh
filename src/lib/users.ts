import type { User, UserAddress, UserCompany } from "@/types/user";

const USERS_ENDPOINT = "https://dummyjson.com/users";
const DIRECTORY_LIMIT = 30;

// DummyJSON is a small public demo dataset. Revalidate hourly so the
// directory stays reasonably fresh without fetching on every request.
const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 3600 },
};

const DIRECTORY_SELECT = [
  "id",
  "firstName",
  "lastName",
  "email",
  "phone",
  "username",
  "image",
  "role",
  "university",
  "address",
  "company",
].join(",");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Invalid user field: ${field}.`);
  }

  return value;
}

function parseAddress(value: unknown): UserAddress {
  if (!isRecord(value)) {
    throw new Error("Invalid user address.");
  }

  return {
    city: requiredString(value.city, "address.city"),
    state: requiredString(value.state, "address.state"),
    country: requiredString(value.country, "address.country"),
  };
}

function parseCompany(value: unknown): UserCompany {
  if (!isRecord(value)) {
    throw new Error("Invalid user company.");
  }

  return {
    department: requiredString(value.department, "company.department"),
    name: requiredString(value.name, "company.name"),
    title: requiredString(value.title, "company.title"),
  };
}

function parseUser(value: unknown): User {
  if (!isRecord(value)) {
    throw new Error("Invalid user record.");
  }

  if (typeof value.id !== "number" || !Number.isInteger(value.id) || value.id < 1) {
    throw new Error("Invalid user id.");
  }

  return {
    id: value.id,
    firstName: requiredString(value.firstName, "firstName"),
    lastName: requiredString(value.lastName, "lastName"),
    email: requiredString(value.email, "email"),
    phone: requiredString(value.phone, "phone"),
    username: requiredString(value.username, "username"),
    image: requiredString(value.image, "image"),
    role: requiredString(value.role, "role"),
    university: requiredString(value.university, "university"),
    address: parseAddress(value.address),
    company: parseCompany(value.company),
  };
}

function parseRouteId(id: string): number | null {
  const normalized = id.trim();

  if (!/^\d+$/.test(normalized)) {
    return null;
  }

  const numericId = Number(normalized);

  if (!Number.isInteger(numericId) || numericId < 1) {
    return null;
  }

  return numericId;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error("The people source returned an unreadable response.");
  }
}

export async function getUsers(): Promise<User[]> {
  const url = `${USERS_ENDPOINT}?limit=${DIRECTORY_LIMIT}&select=${DIRECTORY_SELECT}`;

  let response: Response;

  try {
    response = await fetch(url, FETCH_OPTIONS);
  } catch {
    throw new Error("Unable to reach the people directory.");
  }

  if (!response.ok) {
    throw new Error(`Directory request failed (${response.status}).`);
  }

  const payload = await readJson(response);

  if (!isRecord(payload) || !Array.isArray(payload.users)) {
    throw new Error("Directory response was missing a user list.");
  }

  return payload.users.map(parseUser);
}

export async function getUserById(id: string): Promise<User | null> {
  const numericId = parseRouteId(id);

  if (numericId === null) {
    return null;
  }

  let response: Response;

  try {
    response = await fetch(`${USERS_ENDPOINT}/${numericId}`, FETCH_OPTIONS);
  } catch {
    throw new Error("Unable to reach the people directory.");
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Profile request failed (${response.status}).`);
  }

  return parseUser(await readJson(response));
}
