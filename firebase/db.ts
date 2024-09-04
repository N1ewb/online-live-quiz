import { Assessment, AssessmentQuestion } from "@/lib/types";

import toast from "react-hot-toast";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  doc,
  getDoc,
  Query,
} from "firebase/firestore";

export const toastMessage = (message: string) => toast(message);
const assessmentCollectionRef = collection(db, "Assessment");

export async function createAssessment(
  assessmentTitle: string,
  AssesmentType: string
) {
  const Assessment = {
    AssesmentType,
    assessmentTitle,
    createdAt: serverTimestamp(),
    status: "Not Started",
    currentQuestionNumber: 0,
  };

  try {
    await addDoc(assessmentCollectionRef, Assessment);
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}

export async function getAssessments(): Promise<Assessment[] | undefined> {
  try {
    const q = query(assessmentCollectionRef);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const assessmentData: Assessment[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Assessment[];

      return assessmentData;
    } else {
      toastMessage(
        `Error: Could not retreive assessments, or there are no assessments yet`
      );
      return undefined;
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in fetching Assessments: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}

export async function getAssessmentByID(id: string) {
  try {
    const assessmentRef = doc(assessmentCollectionRef, id);
    const docSnapshot = await getDoc(assessmentRef);

    if (docSnapshot.exists()) {
      const assessmentData = { id: docSnapshot.id, ...docSnapshot.data() };
      toastMessage(`Welcome to Room: ${id}`);
      return assessmentData;
    } else {
      toastMessage(`Error: Could not find Room ID: ${id}`);
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toastMessage(`Error: ${error.message}`);
    } else {
      toastMessage("Unknown Error");
    }
  }
}

export async function createAssessmentQuestions(
  question: string,
  answer: string,
  choices: { label: string; text: string }[],
  id: string
) {
  try {
    const assessment = await getAssessments();
    if (assessment && id) {
      const assessmentRef = doc(db, "Assessment", id);
      const assessmentQuestionRef = collection(
        assessmentRef,
        "Assessment Questions"
      );

      const assessmentQuestion = {
        questionNumber: 1,
        question,
        answer,
        choices,
      };

      await addDoc(assessmentQuestionRef, assessmentQuestion);
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}

export async function getAssessmentQuestions(
  id: string
): Promise<AssessmentQuestion[] | undefined> {
  try {
    const assessmentRef = doc(assessmentCollectionRef, id);
    const assessmentQuestionRef = collection(
      assessmentRef,
      "Assessment Questions"
    );

    const q = query(assessmentQuestionRef);

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const questions: AssessmentQuestion[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AssessmentQuestion[];

      return questions;
    } else {
      toastMessage(`Error: Could not find questions for ID: ${id}`);
      return undefined;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unknown Error");
    }
    return undefined;
  }
}

export const subscribeToAssessmentChanges = (
  callback: (assessmentsData: Assessment[]) => void
): (() => void) => {
  try {
    const q = query(assessmentCollectionRef) as Query;

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const assessmentData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Assessment)
        );

        callback(assessmentData);
      }
    );

    return unsubscribe;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error subscribing to assessment changes: ${error.message}`
      );
    } else {
      console.error("Error: Unknown error occurred");
      toastMessage(`Error: Unknown error occurred`);
    }

    return () => {};
  }
};
