import { fetchUserData } from "@/app/lib/data";
import { Suspense } from "react";
import Profile from "@/app/ui/profile";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userData = await fetchUserData(username);

  if (!userData) {
    return <div className="text-red-500">User not found</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">GH Bees</h1>
        <div className="w-full max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <Profile user={userData} />
            <div className="hexagon-rotated bg-white text-black px-10 py-40 text-center">
              <h1 className="text-4xl font-bold mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <span title={userData.name}>{userData.name ?? "..."}</span>
              </h1>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/pencil.svg"
                  alt="Pencil Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span title={userData.bio}>{userData.bio ?? "..."}</span>
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/code-bracket-square.svg"
                  alt="Code Bracket Square Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span>{userData.public_repos} </span>
                repositories · <span>{userData.public_gists} </span>
                gists
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/user-group.svg"
                  alt="User Group Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span>{userData.followers} </span>
                followers · <span>{userData.following} </span>
                following
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/building-office.svg"
                  alt="Building Office Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span title={userData.company}>
                  {userData.company ?? "..."}
                </span>
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/map-pin.svg"
                  alt="Map Pin Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span title={userData.location}>
                  {userData.location ?? "..."}
                </span>
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/link.svg"
                  alt="Link Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span title={userData.blog}>{userData.blog ?? "..."}</span>
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/x-mark.svg"
                  alt="X Mark Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                <span title={userData.twitter_username}>
                  {userData.twitter_username ?? "..."}
                </span>
              </div>

              <div className="mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                <Image
                  src="/calendar-days.svg"
                  alt="Calendar Days Icon"
                  width={0}
                  height={0}
                  className="size-6 me-2 inline-block align-text-bottom"
                />
                joined{" "}
                <span>
                  {new Date(userData.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
