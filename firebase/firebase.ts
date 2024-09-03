// Import the functions you need from the SDKs you need

import { Assessment, AssessmentQuestion } from "@/lib/types";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore/lite";
import toast from "react-hot-toast";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM53z3gv53kq1IZQ791oJh2sQAzbX7w6g",
  authDomain: "online-live-quiz.firebaseapp.com",
  projectId: "online-live-quiz",
  storageBucket: "online-live-quiz.appspot.com",
  messagingSenderId: "138890121383",
  appId: "1:138890121383:web:872334d3a16cf415eb0b82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// collection: quiz, subcollections: questions, participants, results

const assessmentCollectionRef = collection(db, "Assessment");
export const toastMessage = (message: string) => toast(message);

export async function createAssessment() {
  const Assessment = {
    createdAt: serverTimestamp(),
    AssesmentType: "Quiz",
    assessmentTitle: "First Quiz",
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

export async function getAssessments() {
  try {
    const q = query(assessmentCollectionRef);
    const querySnapshot = await getDocs(q);
    const assessmentData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return assessmentData;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
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

export async function createAssessmentQuestions() {
  try {
    const assessment = await getAssessments();
    if (assessment) {
      const assessmentRef = doc(db, "Assessment", assessment[0].id);
      const assessmentQuestionRef = collection(
        assessmentRef,
        "Assessment Questions"
      );

      const assessmentQuestion = {
        questionNumber: 1,
        question: "Does your mother know your gay?",
        answer: "Yes",
        choices: [
          { letter: "a", choice: "Yes" },
          { letter: "b", choice: "No" },
          { letter: "c", choice: "Maybe" },
          { letter: "a", choice: "Definitely" },
        ],
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
