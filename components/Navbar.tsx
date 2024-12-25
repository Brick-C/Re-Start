import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-7 py-4 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <Image src="/RE-START1.png" alt="logo" width={138} height={29} />
        </Link>

        <div className="flex items-center gap-7">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut("/");
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Sign Out</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href="/user/{session?.id}">
                <Avatar className="size-8">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Log In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
