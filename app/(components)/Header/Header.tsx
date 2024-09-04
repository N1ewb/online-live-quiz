"use client";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = auth;
  const [isCurrentuser, setIsCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [currentUser]);
  return (
    <div className="w-full h-[80px] bg-white flex flex-row items-center justify-around text-black px-10">
      <div className="logo-container w-1/2 font-bold">
        <Link href="/">ONLINE LIVE QUIZ</Link>
      </div>
      <div className="nav-links flex flex-row justify-between w-1/2">
        <Link href="#">About</Link>
        <Link href="#">Contact Us</Link>
        {!isCurrentuser ? (
          <div className="flex flex-row justify-between gap-10">
            <Link href="/Login">Login</Link>
            <Link href="/SignUp">Sign up</Link>
          </div>
        ) : (
          <Link href="/Signout">Logout</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
