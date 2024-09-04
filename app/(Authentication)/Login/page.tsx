"use client";
import { LoginUser } from "@/firebase/Auth";
import { toastMessage } from "@/firebase/db";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassowrd] = useState<string>("");

  const handleLogin = async () => {
    if (email.length !== 0 && password.length !== 0) {
      const loggingin = await LoginUser(email, password);
      if (loggingin) {
        router.push("/Dashboard");
      }
    } else {
      toastMessage("Please fill in fields");
    }
  };

  return (
    <div className="w-full h-screen">
      Login{" "}
      <div className="flex flex-col justify-center items-center gap-3 text-black">
        <input
          name="email"
          type="email"
          placeholder="Email"
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
        <button className="bg-white" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
