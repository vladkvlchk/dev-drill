"use client";

import { TasksResponse } from "@/utils/types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { useSwipeable } from "react-swipeable";

export const useSwipeMobile = ({
  isMobile,
  currentIndex,
  setCurrentIndex,
  containerRef,
  clientHeight,
}: {
  isMobile: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  containerRef: RefObject<HTMLElement | null>;
  clientHeight: number;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(clientHeight);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<InfiniteData<TasksResponse>>(["tasks"]);
  const tasks = data?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    if (isMobile && window.visualViewport) {
      const handleResize = () => {
        setViewportHeight(window.visualViewport!.height);
      };
      window.visualViewport.addEventListener("resize", handleResize);
      return () => {
        window.visualViewport?.removeEventListener("resize", handleResize);
      };
    }
  }, [isMobile]);

  const handlers = useSwipeable({
    onSwipeStart: () => {
      setIsDragging(true);
    },
    onSwiping: (eventData) => {
      // eventData.event.preventDefault();
      if (isDragging) {
        const deltaY = eventData.deltaY;
        setScrollY(deltaY);
      }
    },
    onSwipedUp: () => {
      if (currentIndex < tasks.length - 1) {
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
    const container = containerRef.current;
    if (container) {
      if (isMobile) {
        const targetY = -currentIndex * viewportHeight;
        container.style.transform = `translateY(calc(${
          targetY + scrollY
        }px + env(safe-area-inset-top)))`;
      } else {
        const targetX = -currentIndex * window.innerWidth;
        container.style.transform = `translateX(${targetX}px)`;
      }
    }
  }, [currentIndex, scrollY, isMobile, viewportHeight]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transition = isDragging
        ? "none"
        : "transform 0.3s ease-out";
    }
  }, [isDragging]);

  return { handlers };
};
