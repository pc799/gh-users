import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Link
      href="/"
      className="text-4xl font-bold hover:text-yellow-500 transition-colors duration-300 ease-out"
    >
      <Image
        src="/bees-logo.webp"
        alt="GitHub Bees Logo"
        width={50}
        height={50}
        className="inline-block align-text-center me-2"
      />
      <span>GitHub Bees</span>
    </Link>
  );
}
