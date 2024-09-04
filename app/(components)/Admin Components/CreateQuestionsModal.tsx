import { createAssessmentQuestions, toastMessage } from "@/firebase/db";
import { Assessment } from "@/lib/types";
import React, { useRef, useState } from "react";

interface CreateAssessmentModalProps {
  assessment: Assessment;
  handleShowQuestionModal: () => void;
}

function CreateQuestionsModal({
  assessment,
  handleShowQuestionModal,
}: CreateAssessmentModalProps) {
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const [choices, setChoices] = useState<{ label: string; text: string }[]>([]);
  const [tempOptionLabel, setTempOptionLabel] = useState<string>("");
  const [tempOption, setTempOption] = useState<string>("");
  const [showChoiceDialog, setShowChoiceDialog] = useState<boolean>(false);

  const handleCreateQuestion = async () => {
    try {
      const question = questionRef.current?.value;
      const answer = answerRef.current?.value;

      if (!question || !answer) {
        toastMessage("Please provide both question and answer.");
        return;
      }

      if (assessment.id) {
        await createAssessmentQuestions(
          question,
          answer,
          choices,
          assessment.id
        );
        console.log(assessment.id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastMessage(`Error: ${error.message}`);
      } else {
        toastMessage("Unknown Error");
      }
    }
  };

  const handleAddChoice = () => {
    setShowChoiceDialog(!showChoiceDialog);
  };

  const handleConfirmChoice = () => {
    if (!tempOptionLabel || !tempOption) {
      toastMessage("Please provide both the choice label and text.");
      return;
    }

    setChoices([...choices, { label: tempOptionLabel, text: tempOption }]);

    setTempOptionLabel("");
    setTempOption("");
    setShowChoiceDialog(false);
  };

  return (
    <div className="modal absolute h-[60vh] w-[50%] -translate-x-[25%] flex flex-col gap-3 bg-[#323232] text-white p-20">
      <div className="flex flex-row w-full justify-between">
        <h2>Create New Question</h2>
        <h2>For Assessment {assessment.assessmentTitle}</h2>
        <button onClick={handleShowQuestionModal}>X</button>
      </div>
      <div className="form text-black flex flex-col gap-3">
        <input ref={questionRef} placeholder="Enter your question" />

        <input ref={answerRef} placeholder="Enter the correct answer" />

        <h2>Choices</h2>
        <button onClick={handleAddChoice}>Add Choice</button>

        {showChoiceDialog && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Choice Label (e.g., A, B, C, D)"
              value={tempOptionLabel}
              onChange={(e) => setTempOptionLabel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Choice Text"
              value={tempOption}
              onChange={(e) => setTempOption(e.target.value)}
            />
            <button onClick={handleConfirmChoice}>Confirm Choice</button>
          </div>
        )}

        <ul>
          {choices.map((choice, index) => (
            <li key={index}>
              {choice.label}: {choice.text}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleCreateQuestion}>Create Question</button>
    </div>
  );
}

export default CreateQuestionsModal;
