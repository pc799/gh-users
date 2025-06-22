import { fetchUserData } from "@/app/lib/data";
import { Suspense } from "react";
import Avatar from "@/app/ui/avatar";
import Card from "@/app/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userData = await fetchUserData(username);

  if (!userData) {
    return <div>User not found!</div>;
  }

  return (
    <div className="bg-[url(/hexagons.svg)] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">GH Bees</h1>
        <div className="w-full max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-center w-full">
              <Avatar user={userData} size={400} />
            </div>

            <div className="mt-3 text-center">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl font-bold hover:text-yellow-500 hover:underline"
              >
                <Card details={userData.name} />
              </a>

              <Card icon="/pencil.svg" details={userData.bio} />
              <Card
                icon="/code-bracket-square.svg"
                details={`${userData.public_repos} repositories · ${userData.public_gists} gists`}
              />
              <Card
                icon="/user-group.svg"
                details={`${userData.followers} followers · ${userData.following} following`}
              />
              <Card icon="/building-office.svg" details={userData.company} />
              <Card icon="/map-pin.svg" details={userData.location} />
              <Card icon="/link.svg" details={userData.blog} />
              <Card icon="x-mark.svg" details={userData.twitter_username} />
              <Card
                icon="/calendar-days.svg"
                details={`joined ${new Date(
                  userData.created_at,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}`}
              />
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
