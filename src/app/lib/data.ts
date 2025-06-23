"use server";

import { UsersData, User, UserData } from "@/app/lib/definitions";
import { getUsers, getNextUserId, getUser } from "@/app/utils/parseData";

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
