import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  pageNumber: number;
}

export function QuizCard({
  question,
  options,
  correctAnswer,
  pageNumber,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    setShowResult(true);
  };

  return (
    <Card className="w-full h-full flex items-center justify-center relative">
      <CardContent className="text-center p-6">
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
          {pageNumber}
        </div>
        <h2 className="text-2xl font-bold mb-6">{question}</h2>
        <div className={"space-y-4 " + (selectedAnswer ? "" : "pb-11")}>
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
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
