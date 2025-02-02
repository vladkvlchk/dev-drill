"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, QuizCard } from "@/components";
import { useDeviceType, useInfiniteQuiz, useSwipeMobile } from "@/hooks";

export default function Home() {
  const { questions, loading, loadMoreQuestions } = useInfiniteQuiz();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useDeviceType();

  const { handlers } = useSwipeMobile({
    itemsLength: questions.length,
    isMobile,
    currentIndex,
    setCurrentIndex,
    loadMore: loadMoreQuestions,
    loading,
    containerRef,
  });

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      {...(isMobile ? handlers : {})}
    >
      <div
        ref={containerRef}
        className={`w-full ${isMobile ? "flex flex-col" : "flex flex-row"}`}
        style={{
          height: isMobile ? `${questions.length * 100}%` : "100%",
          width: isMobile ? "100%" : `${questions.length * 100}%`,
        }}
      >
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`${isMobile ? "h-screen" : "h-full"} ${
              isMobile ? "w-screen" : "w-screen flex-shrink-0"
            }`}
          >
            <QuizCard
              question={question.question}
              options={question.options}
              correctAnswer={question.correctAnswer}
              pageNumber={index + 1}
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-white bg-gray-800 px-4 py-2 rounded-full">
            Loading more questions...
          </p>
        </div>
      )}
      {!isMobile && (
        <>
          <Button
            className="absolute top-4 left-4"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            className="absolute top-4 right-4"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
