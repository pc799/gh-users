"use client";

import { UsersData } from "@/app/lib/definitions";
import Avatar from "@/app/ui/avatar";
import { use, useRef, useState } from "react";
import { fetchUsersData } from "@/app/lib/data";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

interface GridProps {
  usersData: Promise<UsersData>;
}

export default function Grid({ usersData }: GridProps) {
  let { users: initUsers, nextUserId } = use(usersData);
  const sentinelRef = useRef(null);
  const [users, setUsers] = useState(initUsers);

  const fetchMoreUsersCallback = async () => {
    if (!nextUserId) return;
    const usersData = await fetchUsersData(nextUserId);
    setUsers((prevUsers) => [...prevUsers, ...usersData.users]);
    nextUserId = usersData.nextUserId;
  };

  useIntersectionObserver(sentinelRef, fetchMoreUsersCallback);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-0 ms-[-160px]">
        {users.map((user, i) => {
          // TODO: responsive
          const isOddRow = Math.floor(i / 3) % 2 === 1;
          return (
            <div
              key={user.id}
              className={`-mb-[100px] ${isOddRow ? "translate-x-[160px]" : ""}`}
            >
              <Avatar user={user} scale={1} />
            </div>
          );
        })}
      </div>

      <div ref={sentinelRef}></div>
    </div>
  );
}
