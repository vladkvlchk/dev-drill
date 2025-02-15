"use client";

import { useEffect, useMemo, useRef } from "react";

import { MIN_SWIPE_DISTANCE } from "@/utils/constants";
import { useInfiniteQuiz } from "./useInfiniteQuiz";
import { useCurrentCardIndex } from "./useCurrentCardIndex";

export const useMobileSwap = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const { data } = useInfiniteQuiz();
  const { currentCardIndex, setCurrentCardIndex } = useCurrentCardIndex();
  const tasks = useMemo(
    () => (data ? data.pages.flatMap((page) => page) : []),
    [data]
  );

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchEndY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndY.current = e.touches[0].clientY;
    isSwiping.current = true;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffY) < MIN_SWIPE_DISTANCE) return;

    if (diffY > 0 && currentCardIndex < tasks.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (diffY < 0 && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
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
  }, [containerRef]);

  return { handleTouchEnd, handleTouchMove, handleTouchStart };
};
