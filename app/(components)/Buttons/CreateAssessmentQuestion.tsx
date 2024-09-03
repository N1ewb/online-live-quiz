import { createAssessmentQuestions } from "@/firebase/firebase";
import React from "react";

const CreateAssessmentQuestion = () => {
  const handleCreateQuestion = async () => {
    await createAssessmentQuestions();
  };

  return (
    <div>
      <button onClick={() => handleCreateQuestion()}>Create Questions</button>
    </div>
  );
};

export default CreateAssessmentQuestion;
