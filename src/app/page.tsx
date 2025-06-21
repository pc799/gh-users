import Image from "next/image";
import { fetchUsers } from "@/app/lib/data";

export default async function Home() {
  const users = await fetchUsers();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">GitHub Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center">
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="mt-2 text-lg">{user.login}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
