"use client";

import { useEffect } from "react";

import { QuizProps } from "@/utils/types";
import { QuizCard } from "./QuizCard";

export function MobileQuiz({
  tasks,
  currentIndex,
  setCurrentIndex,
  containerRef,
}: QuizProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [currentIndex, containerRef]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const newIndex = Math.round(container.scrollTop / window.innerHeight);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      onScroll={handleScroll}
    >
      {tasks.map((task, index) => (
        <div key={task.id + index} className="h-screen w-screen snap-start">
          <QuizCard
            question={task.question}
            options={task.options}
            correctAnswer={task.correct_answer}
            pageNumber={index + 1}
          />
        </div>
      ))}
    </div>
  );
}
