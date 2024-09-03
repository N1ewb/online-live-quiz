"use client";

import { getAssessmentByID, toastMessage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LandingPage = () => {
  const router = useRouter();
  const [roomID, setRoomID] = useState<string>("");

  const handleJoinRoom = async (id: string) => {
    if (roomID && roomID.length !== 0) {
      try {
        const assessmentRoom = await getAssessmentByID(id);
        if (assessmentRoom) {
          router.push(
            `/QuizPage?RoomID=${encodeURIComponent(roomID.toString())}`
          );
        }
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          toastMessage(`Error in: ${error.message}`);
        } else {
          toastMessage("Unkown Error");
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-3 ">
        <h1 className="text-white"> Join Room</h1>
        <input
          className="h-[30px] rounded-[4px] border-solid border-[1px] border-red-200 text-black"
          name="room-id"
          type="text"
          placeholder="Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button onClick={() => handleJoinRoom(roomID)}>Submit</button>
      </div>
    </div>
  );
};

export default LandingPage;
