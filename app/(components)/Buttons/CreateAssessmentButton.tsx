import { createAssessment } from "@/firebase/firebase";
import React from "react";

const CreateAssessmentButton = () => {
  async function handleCreateAssessment() {
    await createAssessment();
  }

  return (
    <div>
      <button onClick={() => handleCreateAssessment()}>
        Create Assessment
      </button>
    </div>
  );
};

export default CreateAssessmentButton;
