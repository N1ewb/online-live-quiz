"use client";
import AssessmentsCard from "@/app/(components)/Admin Components/AssessmentsCard";
import CreateAssessmentModal from "@/app/(components)/Admin Components/CreateAssessmentModal";
import {
  getAssessments,
  subscribeToAssessmentChanges,
  toastMessage,
} from "@/firebase/db";
import { auth, db } from "@/firebase/firebase";
import { Assessment } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { currentUser } = auth;
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showAssessmentModal, setShowAssessmentModal] =
    useState<boolean>(false);

  const handleShowAssessmentModal = () => {
    setShowAssessmentModal(!showAssessmentModal);
  };

  useEffect(() => {
    const handleGetAssessments = async () => {
      try {
        const assessments = await getAssessments();
        if (assessments) {
          setAssessments(assessments);
        }
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          toastMessage("Something went wrong");
        } else {
          toastMessage("Unknown Error");
        }
      }
    };
    handleGetAssessments();
  }, []);

  if (currentUser && !currentUser) {
    router.push("/");
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeToAssessmentChanges(setAssessments);
    } catch (error) {
      if (typeof error === "string") {
        toastMessage(error);
      } else if (error instanceof Error) {
        toastMessage(`Error: ${error.message}`);
      } else {
        toastMessage("An unknown error occurred");
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center gap-10">
      <div className="div flex">
        <h1>Dashboard</h1>
        <p>Welcome {currentUser && currentUser.email}</p>
      </div>
      <div className="div flex flex-row gap-5 [&_button]:bg-white [&_button]:text-black [&_button]:px-6 [&_button]:py-1">
        <button onClick={() => handleShowAssessmentModal()}>
          Create Assessment
        </button>
        <button>Start an Assessment</button>
        {showAssessmentModal && (
          <CreateAssessmentModal
            handleSetShowAssessmentModal={handleShowAssessmentModal}
          />
        )}
      </div>
      <div className="assessments-list-container flex flex-row  flex-wrap gap-4">
        {assessments.length !== 0 &&
          assessments.map((assessment: Assessment) => (
            <AssessmentsCard key={assessment.id} assessment={assessment} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
