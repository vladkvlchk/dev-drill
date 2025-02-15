"use client";

import { useState, useEffect, useRef } from "react";
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz";
import { useDeviceType } from "@/hooks/useDeviceType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components";

export default function Home() {
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

  const isNextDisabled = currentIndex === tasks.length - 1;
  const isPreviousDisabled = currentIndex <= 0;

  if (isError) return <>error</>;
  if (!data) return <>loading...</>;

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
        {tasks.map((task, index) => (
          <div
            key={task.id + index}
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
              question={task.question}
              options={task.options}
              correctAnswer={task.correct_answer}
              pageNumber={index + 1}
            />
          </div>
        ))}
      </div>

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
