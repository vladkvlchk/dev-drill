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
}: {
  isMobile: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  containerRef: RefObject<HTMLElement | null>;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<InfiniteData<TasksResponse>>(["tasks"]);
  const tasks = data?.pages.flatMap((page) => page) || [];

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

  return { handlers };
};
