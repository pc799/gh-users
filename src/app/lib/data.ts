"use server";

import { UsersData, User, UserData } from "@/app/lib/definitions";

const NEXT_PATTERN = /(?<=<)([\S]*)(?=>; rel="Next")/i;
const PER_PAGE = "100";

export async function fetchUsersData(since: string): Promise<UsersData> {
  const res = await fetch(
    `${process.env.GITHUB_API}/users?per_page=${PER_PAGE}&since=${since}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": `${process.env.GITHUB_API_VERSION}`,
      },
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch:", res.status, res.statusText);
    return {
      users: [],
    };
  }

  const users: User[] = getUsers(await res.json());
  const nextUserId = getNextUserId(res.headers.get("link"));

  return {
    users,
    nextUserId,
  };
}

export async function fetchUserData(
  username: string,
): Promise<UserData | null> {
  const res = await fetch(`${process.env.GITHUB_API}/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": `${process.env.GITHUB_API_VERSION}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error("Failed to fetch:", res.status, res.statusText);
    return null;
  }

  const user = getUser(await res.json());
  return user;
}

function getUsers(data: unknown): User[] {
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
      if ((item as any).type !== "User") {
        return null;
      }
      return item as User;
    })
    .filter((user): user is User => user !== null);
}

function getNextUserId(linkHeader: string | null): string | undefined {
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

function getUser(data: unknown): UserData | null {
  if (typeof data !== "object" || data === null) {
    console.error("Invalid data format:", data);
    return null;
  }
  if ((data as any).type !== "User") {
    return null;
  }
  return data as UserData;
}
