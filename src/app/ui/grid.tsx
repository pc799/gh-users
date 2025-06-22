"use client";

import clsx from "clsx";
import { UsersData } from "@/app/lib/definitions";
import Avatar from "@/app/ui/avatar";
import { use, useEffect, useRef, useState } from "react";
import { fetchUsersData } from "@/app/lib/data";

interface GridProps {
  usersData: Promise<UsersData>;
}

export default function Grid({ usersData }: GridProps) {
  let { users: initUsers, nextUserId } = use(usersData);
  const sentinelRef = useRef(null);
  const [users, setUsers] = useState(initUsers);

  const fetchMoreUsers = async () => {
    if (!nextUserId) return;
    const usersData = await fetchUsersData(nextUserId);
    setUsers((prevUsers) => [...prevUsers, ...usersData.users]);
    nextUserId = usersData.nextUserId;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreUsers();
        }
      },
      { threshold: 1 },
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div>
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
              <Avatar user={user} scale={1} />
            </div>
          );
        })}
      </div>

      <div ref={sentinelRef}></div>
    </div>
  );
}
