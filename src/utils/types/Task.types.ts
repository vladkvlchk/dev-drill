import { UUID } from "crypto";

export interface ITask {
  id: UUID;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface TasksResponse {
  nextPage: null;
  id: UUID;
  correct_answer: string;
  options: string[];
  question: string;

}
