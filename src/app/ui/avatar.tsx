import Image from "next/image";
import { User } from "@/app/lib/definitions";

interface AvatarProps {
  user: User;
  scale: number;
}

export default function Avatar({ user, scale }: AvatarProps) {
  const size = 200 * scale;

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
        className={`absolute bottom-0 left-0 w-full max-w-[${size / 2}px] p-0 text-center m-0 ms-[${size / 4}px] bg-black/30 backdrop-blur-xs truncate whitespace-nowrap`}
      >
        {user.login}
      </p>
    </div>
  );
}
