import { UUID } from "crypto";

export interface Task {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TasksResponse {
  nextPage: null;
  id: UUID;
  correctAnswer: number;
  options: string[];
  question: string;

}
