"use client";

import { useEffect, useRef, useMemo } from "react";

import { useInfiniteQuiz, useDeviceType, useCurrentCardIndex } from "@/hooks";
import { MobileQuiz, DesktopQuiz } from "@/components";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  const { data, isPending, fetchNextPage, isError } = useInfiniteQuiz();
  const tasks = useMemo(
    () => (data ? data.pages.flatMap((page) => page) : []),
    [data]
  );

  const { currentCardIndex } = useCurrentCardIndex();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceType();

  useEffect(() => {
    if (currentCardIndex >= tasks.length - 2 && !isPending) {
      fetchNextPage();
    }
  }, [currentCardIndex, tasks.length, isPending, fetchNextPage]);

  if (isError) return <>error</>;
  if (!data) return <>loading...</>;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {isMobile ? (
        <MobileQuiz tasks={tasks} containerRef={containerRef} />
      ) : (
        <DesktopQuiz tasks={tasks} containerRef={containerRef} />
      )}
    </div>
  );
}
