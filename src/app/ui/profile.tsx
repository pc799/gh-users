import Image from "next/image";
import { User } from "@/app/lib/definitions";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="relative w-[200px] h-[200px] flex items-end overflow-hidden">
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={200}
        height={200}
        className="hexagon"
      />
      <p className="absolute bottom-0 left-0 w-full max-w-[120px] px-2 text-center text-white text-base m-0 ms-10 bg-black bg-opacity-60 truncate whitespace-nowrap pointer-events-none">
        {user.login}
      </p>
    </div>
  );
}
