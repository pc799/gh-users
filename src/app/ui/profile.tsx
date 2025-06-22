import Avatar from "@/app/ui/avatar";
import Card from "@/app/ui/card";
import { UserData } from "@/app/lib/definitions";
import { use } from "react";

interface ProfileProps {
  userData: Promise<UserData | null>;
}

export default function Profile({ userData }: ProfileProps) {
  let user = use(userData);

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div>
      <div className="flex justify-center w-full">
        <Avatar user={user} scale={2} />
      </div>

      <div className="mt-3 text-center">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl font-bold hover:text-yellow-500 hover:underline"
        >
          <Card details={user.name} />
        </a>

        <Card icon="/pencil.svg" details={user.bio} />
        <Card
          icon="/code-bracket-square.svg"
          details={`${user.public_repos} repositories · ${user.public_gists} gists`}
        />
        <Card
          icon="/user-group.svg"
          details={`${user.followers} followers · ${user.following} following`}
        />
        <Card icon="/building-office.svg" details={user.company} />
        <Card icon="/map-pin.svg" details={user.location} />
        <Card icon="/link.svg" details={user.blog} />
        <Card icon="x-mark.svg" details={user.twitter_username} />
        <Card
          icon="/calendar-days.svg"
          details={`joined ${new Date(user.created_at).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
            },
          )}`}
        />
      </div>
    </div>
  );
}
