import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-7 py-4 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={138} height={29} />
        </Link>

        <div className="flex items-center gap-7">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut("/");
                }}
              >
                <button type="submit">Sign Out</button>
              </form>

              <Link href="/user/{session?.id}">
                <span>{session?.user?.name}</span>
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
