import { useUser } from "@supabase/auth-helpers-react";
import Link from 'next/link'
import HomeIcon from "../icons/home";
import AddIcon from "../icons/add";
import UserIcon from "../icons/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const {user} = useUser();
  const [route, setRoute] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRoute(router.pathname);
  }, [router.pathname]);

  if (!user) {
    return <h1>NO USER</h1>;
  }

  return (
    <div className="fixed bottom-0 left-0 h-max w-screen bg-white drop-shadow-up-lg">
      <nav>
        <ul className="flex items-center justify-between py-4 px-8">
          <li className="flex flex-col items-center">
            <div
              className={`rounded-lg px-4 py-0.5 text-2xl ${
                route === "/" ? "bg-pink-400" : ""
              }`}
            >
              <HomeIcon className="text-2xl" />
            </div>
            <Link href="/">
              <span className="text-sm">Home</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <div
              className={`rounded-lg px-4 py-0.5 text-2xl ${
                route === "/list/new" ? "bg-pink-400" : ""
              }`}
            >
              <AddIcon className="text-2xl" />
            </div>
            <Link href="/list/new">
              <span className="text-sm">Create List</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <div
              className={`rounded-lg px-4 py-0.5 text-2xl ${
                route === "/profile" ? "bg-pink-400" : ""
              }`}
            >
              <UserIcon className="text-2xl" />
            </div>
            <Link href="/profile">
              <span className="text-sm">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
