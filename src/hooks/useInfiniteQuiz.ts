import { useState, useEffect, useCallback } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuizData: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: 2,
  },
];

export function useInfiniteQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMoreQuestions = useCallback(async () => {
    setLoading(true);
    // Simulating an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newQuestions = mockQuizData.map((q) => ({
      ...q,
      id: q.id + questions.length,
    }));
    setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
    setLoading(false);
  }, [questions.length]);

  useEffect(() => {
    if (questions.length === 0) {
      loadMoreQuestions();
    }
  }, [loadMoreQuestions, questions.length]);

  return { questions, loading, loadMoreQuestions };
}
