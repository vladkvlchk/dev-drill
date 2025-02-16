"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopicBadge } from "../atoms/TopicBadge";
import { TDifficulty, TTopic } from "@/utils/types";
import { DifficultyBadge } from "../atoms";

interface QuizCardProps {
  topic: TTopic;
  question: string;
  options: string[];
  correctAnswer: string;
  pageNumber: number;
  difficulty: TDifficulty;
}

export function QuizCard({
  difficulty,
  topic,
  question,
  options,
  correctAnswer,
  pageNumber,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <Card className="w-full h-[calc(100vh+env(safe-area-inset-top))] flex items-center justify-center rounded-none relative">
      <CardHeader className="absolute top-2">
        <div className="flex gap-2">
          <TopicBadge variant={topic} />
          <DifficultyBadge variant={difficulty} />
        </div>
      </CardHeader>
      <CardContent className="text-center p-6">
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
          {pageNumber}
        </div>
        <h2 className="text-2xl font-bold mb-6">{question}</h2>
        <div className={"space-y-4 " + (selectedAnswer ? "" : "pb-11")}>
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              onTouchStart={() => setSelectedAnswer(option)}
              disabled={Boolean(selectedAnswer)}
              variant={selectedAnswer === option ? "default" : "outline"}
              className={
                "w-full " +
                (selectedAnswer === option
                  ? option === correctAnswer
                    ? "bg-green-500"
                    : "bg-pink-500"
                  : "")
              }
            >
              {option}
            </Button>
          ))}
        </div>
        {selectedAnswer && (
          <p className="mt-4 text-lg font-semibold">
            {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
