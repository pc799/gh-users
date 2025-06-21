"use server";

import { UsersData, User } from "@/app/lib/definitions";

const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

export async function fetchUsersData(since: string): Promise<UsersData> {
  const res = await fetch(
    `${process.env.GITHUB_API}/users?per_page=100&since=${since}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch users:", res.status, res.statusText);
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

function getUsers(data: unknown): User[] {
  if (!Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return [];
  }
  return data
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        console.error("Invalid user item:", item);
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
  const nextUrl = linkHeader.match(nextPattern)?.[0];
  if (!nextUrl) {
    return undefined;
  }
  const url = new URL(nextUrl);
  return url.searchParams.get("since") ?? undefined;
}
