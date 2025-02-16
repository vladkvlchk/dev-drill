import { RefObject } from "react";
import { ITask } from "../Task";

export interface QuizProps {
  tasks: ITask[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  containerRef: RefObject<HTMLDivElement | null>;
}
