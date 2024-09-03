import { AssessmentQuestion, Choices } from "@/lib/types";
import React from "react";

interface AssessmentQuestionCard {
  assessmentQuestion: AssessmentQuestion;
}

const AssessmentQuestionCard = ({
  assessmentQuestion,
}: AssessmentQuestionCard) => {
  return (
    <div className="">
      <p>{assessmentQuestion.questionNumber}</p>
      <h3>{assessmentQuestion.question}</h3>
      {assessmentQuestion && assessmentQuestion.choices
        ? assessmentQuestion.choices.map((choice: Choices) => (
            <div key={choice.letter} className="flex flex-row gap-2">
              <p>{choice.letter}</p>
              <input
                type="radio"
                name="choice"
                value={choice.choice}
                typeof="text"
              />
              <label htmlFor={choice.letter}>{choice.choice}</label>
            </div>
          ))
        : ""}
    </div>
  );
};

export default AssessmentQuestionCard;
