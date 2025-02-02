"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { QuizCard } from "@/components/QuizCard";
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz";
import { useDeviceType } from "@/hooks/useDeviceType";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { questions, loading, loadMoreQuestions } = useInfiniteQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useDeviceType();

  const handlers = useSwipeable({
    onSwipeStart: () => {
      setIsDragging(true);
    },
    onSwiping: (eventData) => {
      if (isDragging) {
        const deltaY = eventData.deltaY;
        setScrollY(deltaY);
      }
    },
    onSwipedUp: () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    },
    onSwiped: () => {
      setIsDragging(false);
      setScrollY(0);
    },
    trackMouse: true,
  });

  useEffect(() => {
    if (currentIndex >= questions.length - 2 && !loading) {
      loadMoreQuestions();
    }
  }, [currentIndex, questions.length, loading, loadMoreQuestions]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      if (isMobile) {
        const targetY = -currentIndex * window.innerHeight;
        container.style.transform = `translateY(${targetY + scrollY}px)`;
      } else {
        const targetX = -currentIndex * window.innerWidth;
        container.style.transform = `translateX(${targetX}px)`;
      }
    }
  }, [currentIndex, scrollY, isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transition = isDragging
        ? "none"
        : "transform 0.3s ease-out";
    }
  }, [isDragging]);

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
      {isMobile ? (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <ChevronUp
            className={`w-8 h-8 ${
              currentIndex > 0 ? "text-primary" : "text-gray-300"
            }`}
          />
          <span className="text-lg font-semibold my-2">Swipe</span>
          <ChevronDown
            className={`w-8 h-8 ${
              currentIndex < questions.length - 1
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
            disabled={currentIndex === questions.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
