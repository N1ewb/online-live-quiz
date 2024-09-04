import { Assessment } from "@/lib/types";
import React from "react";

interface AssessmentsCardProps {
  assessment: Assessment;
}

const AssessmentsCard = ({ assessment }: AssessmentsCardProps) => {
  return (
    <div className="bg-white p-10 text-black flex flex-col gap-3 [&_p]:font-bold">
      <h1 className="font-bold text">
        <span className="font-normal">Title:</span> {assessment.assessmentTitle}
      </h1>
      <p>
        <span className="font-normal">Type: </span>
        {assessment.AssesmentType}
      </p>
      <p>
        <span className="font-normal">Status: </span>
        {assessment.status}
      </p>
      <button className="bg-black text-white px-6 py-1 rounded-sm">
        Create Questions for This Assessment
      </button>
    </div>
  );
};

export default AssessmentsCard;
