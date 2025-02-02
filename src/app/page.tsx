"use client"

import { useState, useEffect, useRef } from "react"
import { useSwipeable } from "react-swipeable"
import { QuizCard } from "@/components/QuizCard"
import { useInfiniteQuiz } from "@/hooks/useInfiniteQuiz"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function Home() {
  const { questions, loading, loadMoreQuestions } = useInfiniteQuiz()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const handlers = useSwipeable({
    onSwipeStart: (eventData) => {
      setIsDragging(true)
      setStartY(eventData.initial[1])
    },
    onSwiping: (eventData) => {
      if (isDragging) {
        const deltaY = eventData.deltaY
        setScrollY(deltaY)
      }
    },
    onSwipedUp: () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1)
      }
    },
    onSwiped: () => {
      setIsDragging(false)
      setScrollY(0)
    },
    trackMouse: true,
  })

  useEffect(() => {
    if (currentIndex >= questions.length - 2 && !loading) {
      loadMoreQuestions()
    }
  }, [currentIndex, questions.length, loading, loadMoreQuestions])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const targetY = -currentIndex * window.innerHeight
      container.style.transform = `translateY(${targetY + scrollY}px)`
    }
  }, [currentIndex, scrollY])

  useEffect(() => {
    const container = containerRef.current
    if (container && !isDragging) {
      container.style.transition = "transform 0.3s ease-out"
    } else if (container) {
      container.style.transition = "none"
    }
  }, [isDragging])

  return (
    <div className="h-screen w-screen overflow-hidden relative" {...handlers}>
      <div ref={containerRef} className="w-full" style={{ height: `${questions.length * 100}%` }}>
        {questions.map((question, index) => (
          <div key={question.id} className="h-screen w-screen">
            <QuizCard
              question={question.question}
              options={question.options}
              correctAnswer={question.correctAnswer}
              pageNumber={index + 1}
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-white bg-gray-800 px-4 py-2 rounded-full">Loading more questions...</p>
        </div>
      )}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <ChevronUp className={`w-8 h-8 ${currentIndex > 0 ? "text-primary" : "text-gray-300"}`} />
        <span className="text-lg font-semibold my-2">Swipe</span>
        <ChevronDown className={`w-8 h-8 ${currentIndex < questions.length - 1 ? "text-primary" : "text-gray-300"}`} />
      </div>
    </div>
  )
}

