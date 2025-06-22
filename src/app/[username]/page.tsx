import { fetchUserData } from "@/app/lib/data";
import { Suspense } from "react";
import Profile from "@/app/ui/profile";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userData = fetchUserData(username);

  return (
    <div className="bg-[url(/hexagons.svg)] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">GH Bees</h1>
        <div className="w-full max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <Profile userData={userData} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
