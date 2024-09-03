import Link from "next/link";
import React from "react";

const Header = () => {
  const auth = false;

  return (
    <div className="w-full h-[80px] bg-white flex flex-row items-center justify-around text-black px-10">
      <div className="logo-container w-1/2 font-bold">
        <Link href="/">ONLINE LIVE QUIZ</Link>
      </div>
      <div className="nav-links flex flex-row justify-between w-1/2">
        <Link href="#">About</Link>
        <Link href="#">Contact Us</Link>
        {!auth && (
          <div className="flex flex-row justify-between gap-10">
            <Link href="/Login">Login</Link>
            <Link href="/SignUp">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
