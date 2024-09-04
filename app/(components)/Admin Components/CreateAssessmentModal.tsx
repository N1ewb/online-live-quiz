import { createAssessment } from "@/firebase/db";
import React, { useState } from "react";

interface createAssessmentProps {
  handleSetShowAssessmentModal: () => void;
}

const CreateAssessmentModal = ({
  handleSetShowAssessmentModal,
}: createAssessmentProps) => {
  const [assessmentTitle, setAssessmentTitle] = useState<string>("");
  const [assessmentType, setAssessmentType] = useState<string>("");

  const handleCrateAssessment = async () => {
    if (assessmentTitle && assessmentType) {
      await createAssessment(assessmentTitle, assessmentType);
    }
  };

  return (
    <div className="absolute h-[60vh] w-[50%] top-0 left-0flex flex-col gap-3 bg-[#323232] text-white p-20">
      <div className="flex flex-row w-full justify-between">
        <h1>Create Assessment</h1>
        <button onClick={handleSetShowAssessmentModal}>X</button>
      </div>
      <div className="form text-black flex flex-col gap-3">
        <input
          name="assessment-title"
          type="text"
          value={assessmentTitle}
          onChange={(e) => setAssessmentTitle(e.target.value)}
        />
        <select onChange={(e) => setAssessmentType(e.target.value)}>
          <option value="">Select Assessment Type</option>
          <option value="Quiz">Quiz</option>
          <option value="Exam">Exam</option>
          <option value="Essay">Essay</option>
        </select>
        <button onClick={() => handleCrateAssessment()}>
          Create Assessment
        </button>
      </div>
    </div>
  );
};

export default CreateAssessmentModal;
