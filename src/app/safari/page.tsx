"use client";

import { useState, useEffect, useRef } from "react";
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz";
import { useDeviceType } from "@/hooks/useDeviceType";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components";

export default function Home() {
  //   const { questions, loading, loadMoreQuestions } = useInfiniteQuiz()
  const { data, isPending, fetchNextPage, isError } = useInfiniteQuiz();
  const tasks = data ? data?.pages.flatMap((page) => page) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceType();

  useEffect(() => {
    if (currentIndex >= tasks.length - 2 && !isPending) {
      fetchNextPage();
    }
  }, [currentIndex, tasks.length, isPending, fetchNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isMobile) {
      container.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isMobile]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && isMobile) {
      const newIndex = Math.round(container.scrollTop / window.innerHeight);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        ref={containerRef}
        className={`w-full h-full ${
          isMobile
            ? "overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            : "flex flex-row"
        }`}
        style={{
          scrollSnapType: isMobile ? "y mandatory" : "none",
          scrollBehavior: "smooth",
        }}
        onScroll={isMobile ? handleScroll : undefined}
      >
        {tasks.map((question, index) => (
          <div
            key={question.id}
            className={`${
              isMobile
                ? "h-screen w-screen snap-start"
                : "h-full w-screen flex-shrink-0"
            }`}
            style={
              !isMobile
                ? {
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: "transform 0.3s ease-out",
                  }
                : undefined
            }
          >
            <QuizCard
              question={question.question}
              options={question.options}
              correctAnswer={question.correct_answer}
              pageNumber={index + 1}
            />
          </div>
        ))}
      </div>
      {isPending && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-white bg-gray-800 px-4 py-2 rounded-full">
            Loading more questions...
          </p>
        </div>
      )}
      {isMobile ? (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <ChevronUp
            className={`w-8 h-8 ${
              currentIndex > 0 ? "text-primary" : "text-gray-300"
            }`}
          />
          <span className="text-lg font-semibold my-2">Scroll</span>
          <ChevronDown
            className={`w-8 h-8 ${
              currentIndex < tasks.length - 1
                ? "text-primary"
                : "text-gray-300"
            }`}
          />
        </div>
      ) : (
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
            disabled={currentIndex === tasks.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
