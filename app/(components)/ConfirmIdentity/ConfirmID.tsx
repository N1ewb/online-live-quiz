import { GuestToken } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ConfirmIDProps {
  setGuestToken: React.Dispatch<React.SetStateAction<GuestToken | undefined>>;
}

const ConfirmID = ({ setGuestToken }: ConfirmIDProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");

  const handlePushRoQuizRoom = () => {
    if (firstName && LastName) {
      setGuestToken({ firstName: firstName, lastName: LastName });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-5 justify-center items-center text-black">
      <h1>Join as:</h1>
      <input
        name="First-Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        name="Last-Name"
        type="text"
        value={LastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <button
        className="bg-white px-5 py-1"
        onClick={() => handlePushRoQuizRoom()}
      >
        Continue to Quiz
      </button>
    </div>
  );
};

export default ConfirmID;
