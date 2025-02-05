"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, QuizCard } from "@/components";
import {
  useDeviceType,
  useInfiniteQuiz,
  useSwipeMobile,
  useViewportHeight,
} from "@/hooks";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useDeviceType();
  const viewportHeight = useViewportHeight();

  const { data, isPending, fetchNextPage, isError } = useInfiniteQuiz();
  const tasks = data ? data?.pages.flatMap((page) => page) : [];

  const { handlers } = useSwipeMobile({
    isMobile,
    currentIndex,
    setCurrentIndex,
    containerRef,
  });

  useEffect(() => {
    if (currentIndex > tasks.length - 2) fetchNextPage();
  }, [currentIndex]);

  if (isError) return <>error</>;
  if (!data) return <>loading...</>;

  const handlePrevious = () => setCurrentIndex((prevIndex) => prevIndex - 1);
  const handleNext = () => setCurrentIndex((prevIndex) => prevIndex + 1);

  const isNextDisabled = currentIndex === tasks.length - 1;
  const isPreviousDisabled = currentIndex <= 0;

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      {...(isMobile ? handlers : {})}
    >
      <div
        ref={containerRef}
        className={`w-full transition-transform duration-300 ease-out ${
          isMobile ? "flex flex-col" : "flex flex-row"
        }`}
        style={{
          height: isMobile ? `${tasks.length * 100}%` : "100%",
          width: isMobile ? "100%" : `${tasks.length * 100}%`,
        }}
      >
        {tasks.map((task, index) => (
          <div
            key={task.id + index}
            className={`${isMobile ? "w-screen" : "w-screen flex-shrink-0"}`}
            style={{ height: `${viewportHeight}px` }}
          >
            <QuizCard
              question={task.question}
              options={task.options}
              correctAnswer={task.correct_answer}
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
      {!isMobile && (
        <>
          <Button
            className="absolute top-4 left-4"
            onClick={handlePrevious}
            disabled={isPreviousDisabled}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            className="absolute top-4 right-4"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
