"use client";

import { QuizProps } from "@/utils/types";
import { useEffect } from "react";
import { QuizCard } from "./QuizCard";
import { Button } from "../ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DesktopQuiz({
  tasks,
  currentIndex,
  setCurrentIndex,
  containerRef,
}: QuizProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      container.style.transition = "transform 0.3s ease-out";
    }
  }, [currentIndex, containerRef]);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full flex flex-row"
        style={{ transition: "transform 0.3s ease-out" }}
      >
        {tasks.map((task, index) => (
          <div key={task.id + index} className="h-full w-screen flex-shrink-0">
            <QuizCard
              question={task.question}
              options={task.options}
              correctAnswer={task.correct_answer}
              pageNumber={index + 1}
            />
          </div>
        ))}
      </div>
      <Button
        className="absolute top-4 left-4"
        onClick={handlePrevious}
        disabled={currentIndex <= 0}
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
  );
}
