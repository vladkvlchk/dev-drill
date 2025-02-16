import { UUID } from "crypto";
import { TTopic } from "./Topic";

export interface ITask {
  id: UUID;
  topic_name: TTopic;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface ITasksResponse extends ITask {
  nextPage: null;
}

// correct_answer: "style";
// created_at: "2025-02-03T16:04:47.46658";
// id: "85dcfb3f-3bbf-4190-b3b8-34693c850f85";
// level_id: "adedd878-d29a-41d9-8834-46fed23c1f11";
// level_index: 100;
// level_name: "easy";
// options: ["font", "style", "css", "class"];
// question: "Which attribute is used to define inline styles in HTML?";
// topic_id: "8ffee2af-b506-41f5-881d-ea309249b867";
// topic_name: "html";
// type_id: "1baf8cd9-5a50-42ba-8e69-2275301cfa84";
// type_name: "quiz";
