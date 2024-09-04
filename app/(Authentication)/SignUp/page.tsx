"use client";
import { CreateUser } from "@/firebase/Auth";
import { toastMessage } from "@/firebase/db";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassowrd] = useState<string>();
  const [confirmPassword, setConfirmPassowrd] = useState<string>();

  const handleSignup = async () => {
    if (email && password && confirmPassword) {
      const createUser = await CreateUser(email, password, confirmPassword);
      if (createUser) {
        router.push("/Login");
      }
    } else {
      toastMessage("Please fill in fields");
    }
  };

  return (
    <div className="w-full h-screen">
      SignUp{" "}
      <div className="flex flex-col justify-center items-center gap-3 text-black">
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email ? email : undefined}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password ? password : undefined}
          onChange={(e) => setPassowrd(e.target.value)}
        />
        <input
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword ? confirmPassword : undefined}
          onChange={(e) => setConfirmPassowrd(e.target.value)}
        />
        <button className="bg-white" onClick={() => handleSignup()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
