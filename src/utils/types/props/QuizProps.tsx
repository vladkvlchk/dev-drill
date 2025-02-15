import { RefObject } from "react";

export interface QuizProps {
  tasks: any[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  containerRef: RefObject<HTMLDivElement | null>;
}
