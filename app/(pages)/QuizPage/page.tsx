"use client";

import QuizPage from "@/app/(components)/QuizPageContent/QuizPageContent";
import React, { Suspense } from "react";

const SearchMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
};

export default SearchMoviePage;
