import { fetchUsersData } from "@/app/lib/data";
import { Suspense } from "react";
import Grid from "@/app/ui/grid";
import Header from "@/app/ui/header";

export default function Page() {
  const usersData = fetchUsersData("0");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Grid usersData={usersData} />
        </Suspense>
      </main>
    </div>
  );
}
