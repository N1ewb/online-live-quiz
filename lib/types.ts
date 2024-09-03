export interface Assessment {
  id: string;
  createdAt: Date | string;
  assessmentType: "Quiz" | "Exam" | "Essay";
  assessmentTitle: string;
  status: "Not Started" | "In Progress" | "Completed";
  currentQuestionNumber: number;
}

export interface AssessmentQuestion {
  id: string;
  answer: string;
  choices: Choices[];
  question: string;
  questionNumber: number;
}

export interface Choices {
  letter: string;
  choice: string;
}

export interface GuestToken {
  firstName: string;
  lastName: string;
}
