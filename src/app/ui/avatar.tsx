import Image from "next/image";
import { User } from "@/app/lib/definitions";
import Link from "next/link";

interface AvatarProps {
  user: User;
  scale: 1 | 2;
}

export default function Avatar({ user, scale }: AvatarProps) {
  const size = 200 * scale;
  const maxWidth = 100 * scale;
  const paddingBottom = 15 * scale;
  const marginStart = 50 * scale;

  return (
    <Link
      href={`/${user.login}`}
      className={`hexagon relative w-[${size}px] h-[${size}px] flex items-end overflow-hidden hover:scale-110 transition-transform duration-300 ease-out`}
    >
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={size}
        height={size}
      />
      <p
        className={`absolute bottom-0 left-0 w-full max-w-[${maxWidth}px] p-0 pb-[${paddingBottom}px] m-0 ms-[${marginStart}px] bg-black/30 backdrop-blur-xs truncate whitespace-nowrap rounded-t-xl font-bold text-center`}
      >
        {user.login}
      </p>
    </Link>
  );
}
