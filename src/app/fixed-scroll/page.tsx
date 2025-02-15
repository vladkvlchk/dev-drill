"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { QuizCard } from "@/components";
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz";
import { useDeviceType } from "@/hooks/useDeviceType";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MIN_SWIPE_DISTANCE = 50;

export default function Home() {
  const { data, isPending, fetchNextPage, isError } = useInfiniteQuiz();

  const tasks = useMemo(
    () => (data ? data.pages.flatMap((page) => page) : []),
    [data]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceType();
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    if (currentIndex >= tasks.length - 2 && !isPending) {
      fetchNextPage();
    }
  }, [currentIndex, tasks.length, isPending, fetchNextPage]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchEndY.current = e.touches[0].clientY;
    isSwiping.current = false; // Скидаємо стан свайпу
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndY.current = e.touches[0].clientY;
    isSwiping.current = true; // Встановлюємо, що відбувся реальний свайп
    e.preventDefault(); // Блокуємо дефолтну поведінку (оновлення сторінки)
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;

    const diffY = touchStartY.current - touchEndY.current;

    if (Math.abs(diffY) < MIN_SWIPE_DISTANCE) return;

    if (diffY > 0 && currentIndex < tasks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (diffY < 0 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventPullToRefresh = (e: TouchEvent) => {
      if (e.touches[0].clientY > touchStartY.current && window.scrollY === 0) {
        e.preventDefault();
      }
    };

    container.addEventListener("touchmove", preventPullToRefresh, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchmove", preventPullToRefresh);
    };
  }, []);

  if (isError) return <>error</>;
  if (!data) return <>loading...</>;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full relative transition-transform duration-300 ease-out"
        style={{
          transform: `translate${isMobile ? "Y" : "X"}(-${
            currentIndex * 100
          }%)`,
          touchAction: "none",
        }}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {tasks.map((task, index) => (
          <div
            key={task.id + index}
            className="absolute top-0 left-0 h-full w-full"
            style={{
              transform: `translate${isMobile ? "Y" : "X"}(${index * 100}%)`,
            }}
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
      {isMobile ? (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <ChevronUp
            className={`w-8 h-8 ${
              currentIndex > 0 ? "text-primary" : "text-gray-300"
            }`}
          />
          <span className="text-lg font-semibold my-2">Swipe</span>
          <ChevronDown
            className={`w-8 h-8 ${
              currentIndex < tasks.length - 1 ? "text-primary" : "text-gray-300"
            }`}
          />
        </div>
      ) : (
        <>
          <Button
            className="absolute top-4 left-4 z-10"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            className="absolute top-4 right-4 z-10"
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
