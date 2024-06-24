"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status, data: session } = useSession();
  // because we are usinig the usesession hook we have to make this component a client component, because with this hook we
  //  accessing the (react) context object that is passed using the session provider

  if (status === "loading") return null;

  return (
    <nav className="flex bg-slate-200 p-3 space-x-3">
      <Link href="/users">Users</Link>

      {status === "unauthenticated" && (
        <Link className="mx-2" href="/api/auth/signin">
          Login / Signup
        </Link>
      )}

      {status === "authenticated" && (
        <>
          <div className="mx-2">{session.user?.name}</div>

          <Link href="/api/auth/signout">Sign Out</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
