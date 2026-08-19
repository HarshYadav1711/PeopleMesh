import { cache } from "react";

import type { User, UserAddress, UserCompany } from "@/types/user";

const USERS_ENDPOINT = "https://dummyjson.com/users";

const DIRECTORY_FIELDS = [
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

export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function formatLocation(user: User): string {
  const { city, state, country } = user.address;
  const region = state || country;
  return region ? `${city}, ${region}` : city;
}

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

  if (typeof value.id !== "number" || !Number.isInteger(value.id)) {
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

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error("The people source returned an unreadable response.");
  }
}

export async function getUsers(): Promise<User[]> {
  let response: Response;

  try {
    response = await fetch(`${USERS_ENDPOINT}?select=${DIRECTORY_FIELDS}`, {
      cache: "no-store",
    });
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

export type UserLookupResult =
  | { status: "found"; user: User }
  | { status: "missing" };

export const getUserById = cache(async function getUserById(
  id: string
): Promise<UserLookupResult> {
  if (!/^\d+$/.test(id)) {
    return { status: "missing" };
  }

  const numericId = Number(id);

  if (numericId < 1) {
    return { status: "missing" };
  }

  let response: Response;

  try {
    response = await fetch(`${USERS_ENDPOINT}/${numericId}`, {
      cache: "no-store",
    });
  } catch {
    throw new Error("Unable to reach the people directory.");
  }

  if (response.status === 404) {
    return { status: "missing" };
  }

  if (!response.ok) {
    throw new Error(`Profile request failed (${response.status}).`);
  }

  const payload = await readJson(response);
  return { status: "found", user: parseUser(payload) };
});

export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
