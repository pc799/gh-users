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
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res.json();
  const nextUserId = getNextUserId(res.headers.get("link"));

  return {
    users,
    nextUserId,
  };
}

function getNextUserId(linkHeader: string | null): string | undefined {
  if (linkHeader && linkHeader.includes(`rel=\"next\"`)) {
    const nextUrl = linkHeader.match(nextPattern)?.[0];
    if (nextUrl) {
      const url = new URL(nextUrl);
      return url.searchParams.get("since") ?? undefined;
    }
  }
}
