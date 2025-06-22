import Image from "next/image";
import { User } from "@/app/lib/definitions";

interface AvatarProps {
  user: User;
  size: number;
}

export default function Avatar({ user, size }: AvatarProps) {
  return (
    <div
      className={`relative w-[${size}px] h-[${size}px] flex items-end overflow-hidden`}
    >
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={size}
        height={size}
        className="hexagon"
      />
      <p
        className={`absolute bottom-0 left-0 w-full max-w-[${size * 0.6}px] px-2 text-center text-white text-base m-0 ms-${size * 0.05} bg-black bg-opacity-60 truncate whitespace-nowrap pointer-events-none`}
      >
        {user.login}
      </p>
    </div>
  );
}
