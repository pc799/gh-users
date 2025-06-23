import Image from "next/image";

interface CardProps {
  icon?: string;
  details: string;
}

export default function Card({ icon, details }: CardProps) {
  if (!details) {
    return null;
  }

  return (
    <div className="mb-3 overflow-hidden w-full break-words">
      {icon && (
        <Image
          src={icon}
          alt={icon}
          width={0}
          height={0}
          className="size-6 me-2 inline-block align-text-bottom"
        />
      )}
      <span title={details}>{details}</span>
    </div>
  );
}
