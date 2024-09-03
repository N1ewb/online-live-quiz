import AssessmentQuestionCard from "@/app/(components)/AssessmentQuestionCard/AssessmentQuestionCard";
import ConfirmID from "@/app/(components)/ConfirmIdentity/ConfirmID";
import { getAssessmentQuestions } from "@/firebase/firebase";
import { AssessmentQuestion, GuestToken } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const QuizPage = () => {
  const searchParams = useSearchParams();
  const roomID = searchParams.get("RoomID");
  const [guestToken, setGuestToken] = useState<GuestToken>();
  const [assessmentQuestions, setAssessmentQuestions] =
    useState<AssessmentQuestion[]>();

  const handleGetAssessmentQuestions = async (id: string) => {
    const questions = await getAssessmentQuestions(id);
    setAssessmentQuestions(questions);
  };

  useEffect(() => {
    if (guestToken && roomID) {
      console.log(roomID);
      handleGetAssessmentQuestions(roomID);
    }
  }, [guestToken, roomID]);

  return (
    <div className="h-screen w-full">
      <h1>QuizPage</h1>
      <div className="div">
        {!guestToken && <ConfirmID setGuestToken={setGuestToken} />}
        {guestToken && (
          <div className="flex flex-col items-center">
            <h1>Joining Quiz As:</h1>
            <p className="capitalize font-semibold text-2xl">
              {guestToken.firstName} {guestToken.lastName}
            </p>
            <div className="div">
              {assessmentQuestions && assessmentQuestions.length !== 0 ? (
                assessmentQuestions.map((question) => (
                  <AssessmentQuestionCard
                    key={question.id}
                    assessmentQuestion={question}
                  />
                ))
              ) : (
                <p>No questions available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
