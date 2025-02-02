import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
  pageNumber: number;
}

export function QuizCard({
  question,
  options,
  correctAnswer,
  pageNumber,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  return (
    <Card className="w-full h-full flex items-center justify-center relative">
      <CardContent className="text-center p-6">
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
          {pageNumber}
        </div>
        <h2 className="text-2xl font-bold mb-6">{question}</h2>
        <div className="space-y-4">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              variant={"outline"}
              className="w-full"
            >
              {option}
            </Button>
          ))}
        </div>
        {showResult && (
          <p className="mt-4 text-lg font-semibold">
            {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
