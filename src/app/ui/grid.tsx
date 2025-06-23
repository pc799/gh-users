"use client";

import { UsersData } from "@/app/lib/definitions";
import Avatar from "@/app/ui/avatar";
import { useCallback, useRef, useState, use } from "react";
import { fetchUsersData } from "@/app/lib/data";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useResizeObserver } from "@/app/hooks/useResizeObserver";

interface GridProps {
  usersData: Promise<UsersData>;
}

export default function Grid({ usersData }: GridProps) {
  const initUsers = use(usersData);
  const [cols, setCols] = useState(1);
  const [users, setUsers] = useState(initUsers.users);
  const nextUserIdRef = useRef(initUsers.nextUserId);
  const gridRef = useRef(null);
  const sentinelRef = useRef(null);

  const updateCols = useCallback((element: Element) => {
    const style = window.getComputedStyle(element);
    const colCount = style
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    setCols(colCount);
  }, []);
  useResizeObserver(gridRef, updateCols);

  const updateUsers = useCallback(async () => {
    if (!nextUserIdRef.current) return;
    const usersData = await fetchUsersData(nextUserIdRef.current);
    setUsers((prevUsers) => [...prevUsers, ...usersData.users]);
    nextUserIdRef.current = usersData.nextUserId;
  }, []);
  useIntersectionObserver(sentinelRef, updateUsers);

  return (
    <div>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-0 ms-[-160px]"
      >
        {users.map((user, i) => {
          const isOddRow = Math.floor(i / cols) % 2 === 1;
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
