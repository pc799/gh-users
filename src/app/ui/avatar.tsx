import Image from "next/image";
import { User } from "@/app/lib/definitions";
import Link from "next/link";

interface AvatarProps {
  user: User;
  scale: 1 | 2;
}

export default function Avatar({ user, scale }: AvatarProps) {
  const size = 200 * scale;
  const maxWidth = {
    1: "max-w-[100px]",
    2: "max-w-[200px]",
  } as const;
  const paddingBottom = {
    1: "pb-[15px]",
    2: "pb-[30px]",
  } as const;
  const marginStart = {
    1: "ms-[50px]",
    2: "ms-[100px]",
  } as const;

  return (
    <Link
      href={`/${user.login}`}
      className={`hexagon relative flex items-end overflow-hidden hover:scale-110 transition-transform duration-300 ease-out`}
    >
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={size}
        height={size}
      />
      <p
        className={`absolute bottom-0 left-0 w-full ${maxWidth[scale]} p-0 ${paddingBottom[scale]} m-0 ${marginStart[scale]} bg-black/30 backdrop-blur-xs truncate whitespace-nowrap rounded-t-xl font-bold text-center`}
      >
        {user.login}
      </p>
    </Link>
  );
}
