"use client";

import clsx from "clsx";
import { UsersData } from "@/app/lib/definitions";
import Profile from "@/app/ui/profile";
import { use } from "react";

interface GridProps {
  usersData: Promise<UsersData>;
}

export default function Grid({ usersData }: GridProps) {
  const { users, nextUrl } = use(usersData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-0 ms-[-160px]">
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
  );
}
