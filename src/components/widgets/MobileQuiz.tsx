"use client";

import { QuizCard } from "@/components";
import { ITask } from "@/utils/types";
import { useMobileSwap } from "@/hooks/useMobileSwap";
import { useCurrentCardIndex } from "@/hooks";

export interface MobileQuizProps {
  tasks: ITask[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function MobileQuiz({ tasks, containerRef }: MobileQuizProps) {
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useMobileSwap(containerRef);
  const { currentCardIndex } = useCurrentCardIndex();

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative transition-transform duration-300 ease-out"
      style={{
        transform: `translateY(-${currentCardIndex * 100}%)`,
        touchAction: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {tasks.map((task, index) => (
        <div
          key={task.id + index}
          className="absolute top-0 left-0 h-full w-full"
          style={{
            transform: `translateY(${index * 100}%)`,
          }}
        >
          <QuizCard
            topic={task.topic_name}
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
