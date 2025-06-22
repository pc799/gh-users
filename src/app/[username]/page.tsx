import { fetchUserData } from "@/app/lib/data";
import { Suspense } from "react";
import Profile from "@/app/ui/profile";
import Header from "@/app/ui/header";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userData = fetchUserData(username);

  return (
    <div className="bg-[url(/hexagons.svg)] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Profile userData={userData} />
        </Suspense>
      </main>
    </div>
  );
}
