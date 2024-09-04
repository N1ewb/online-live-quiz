"use client";
import { LogoutUser } from "@/firebase/Auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { currentUser } = auth;

  useEffect(() => {
    const handleLogout = async () => {
      if (currentUser && currentUser) {
        await LogoutUser();
        router.push("/");
      }
    };
    handleLogout();
  }, [auth.currentUser]);

  return <div>Logout</div>;
};

export default Logout;
