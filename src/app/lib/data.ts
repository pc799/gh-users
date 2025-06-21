import { UsersData, User } from "@/app/lib/definitions";

const defaultUrl = `${process.env.GITHUB_API}/users?per_page=100`;
const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

export async function fetchUsersData(
  url: string = defaultUrl,
): Promise<UsersData> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res.json();
  const nextUrl = parseLinkHeader(res.headers.get("link"));

  return {
    users,
    nextUrl,
  };
}

function parseLinkHeader(linkHeader: string | null): string | undefined {
  if (linkHeader && linkHeader.includes(`rel=\"next\"`)) {
    return linkHeader.match(nextPattern)?.[0] ?? "";
  }
}
