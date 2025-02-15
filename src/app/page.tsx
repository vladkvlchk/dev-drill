"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz";
import { useDeviceType } from "@/hooks/useDeviceType";
import { DesktopQuiz, MobileQuiz } from "@/components";

export default function Home() {
  const { data, isPending, fetchNextPage, isError } = useInfiniteQuiz();

  const tasks = useMemo(
    () => (data ? data.pages.flatMap((page) => page) : []),
    [data]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceType();

  useEffect(() => {
    if (currentIndex >= tasks.length - 2 && !isPending) {
      fetchNextPage();
    }
  }, [currentIndex, tasks.length, isPending, fetchNextPage]);

  if (isError) return <>error</>;
  if (!data) return <>loading...</>;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {isMobile ? (
        <MobileQuiz
          tasks={tasks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          containerRef={containerRef}
        />
      ) : (
        <DesktopQuiz
          tasks={tasks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}
