import clsx from "clsx";
import { fetchUsers } from "@/app/lib/data";
import Profile from "@/app/ui/profile";

export default async function Home() {
  const users = await fetchUsers();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">GitHub Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-0">
          {users.map((user, i) => {
            // TODO: responsive
            const isOddRow = Math.floor(i / 3) % 2 === 1;
            return (
              <div
                key={user.id}
                className={clsx("-mb-[100px]", {
                  "translate-x-[160px]": isOddRow,
                })}
              >
                <Profile user={user} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
