import { User } from "@/app/lib/definitions";

export async function fetchUsers() {
  const res = await fetch(`${process.env.GITHUB_API}/users`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json() as Promise<User[]>;
}
