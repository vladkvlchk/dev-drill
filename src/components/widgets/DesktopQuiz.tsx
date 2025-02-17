"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, QuizCard } from "@/components";
import { ITask } from "@/utils/types";
import { useCurrentCardIndex } from "@/hooks";

export interface DesktopQuizProps {
  tasks: ITask[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function DesktopQuiz({ tasks, containerRef }: DesktopQuizProps) {
  const { currentCardIndex, setCurrentCardIndex } = useCurrentCardIndex();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentCardIndex * 100}%)`;
      container.style.transition = "transform 0.3s ease-out";
    }
  }, [currentCardIndex, containerRef]);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < tasks.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCardIndex]);

  return (
    <>
      <div ref={containerRef} className="h-full w-full flex flex-row">
        {tasks.map((task, index) => (
          <div key={task.id + index} className="h-full w-screen flex-shrink-0">
            <QuizCard
              topic={task.topic_name}
              question={task.question}
              options={task.options}
              correctAnswer={task.correct_answer}
              pageNumber={index + 1}
              difficulty={task.level_name}
            />
          </div>
        ))}
      </div>
      <Button
        className="absolute top-1/2 -translate-y-1/2 left-4 z-10"
        onClick={handlePrevious}
        disabled={currentCardIndex === 0}
        size="icon"
      >
        <ChevronLeft />
      </Button>
      <Button
        className="absolute top-1/2 -translate-y-1/2 right-4 z-10"
        onClick={handleNext}
        disabled={currentCardIndex === tasks.length - 1}
        size="icon"
      >
        <ChevronRight />
      </Button>
    </>
  );
}
