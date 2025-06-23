import { User, UserData } from "@/app/lib/definitions";

const NEXT_PATTERN = /(?<=<)([\S]*)(?=>; rel="Next")/i;

export function getUsers(data: unknown): User[] {
  if (!Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return [];
  }
  return data
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        console.error("Invalid data format:", item);
        return null;
      }
      if ((item as { type: string }).type !== "User") {
        return null;
      }
      return item as User;
    })
    .filter((user): user is User => user !== null);
}

export function getNextUserId(linkHeader: string | null): string | undefined {
  if (!linkHeader || !linkHeader.includes(`rel="next"`)) {
    return undefined;
  }
  const nextUrl = linkHeader.match(NEXT_PATTERN)?.[0];
  if (!nextUrl) {
    return undefined;
  }
  const url = new URL(nextUrl);
  return url.searchParams.get("since") ?? undefined;
}

export function getUser(data: unknown): UserData | null {
  if (typeof data !== "object" || data === null) {
    console.error("Invalid data format:", data);
    return null;
  }
  if ((data as { type: string }).type !== "User") {
    return null;
  }
  return data as UserData;
}
