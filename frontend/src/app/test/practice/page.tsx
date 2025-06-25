'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Question, QuestionType, QuestionCategory, DifficultyLevel } from '@testiq/shared';
import QuestionCard from '../../../components/game/QuestionCard';
import Timer from '../../../components/game/Timer';

// Generate 10 practice questions
const generatePracticeQuestions = (): Question[] => {
  const questions: Question[] = [];
  const categories = Object.values(QuestionCategory);
  
  for (let i = 1; i <= 10; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = (Math.floor(Math.random() * 3) + 1) as DifficultyLevel; // Only levels 1-3 for practice
    
    questions.push({
      id: `practice_q${i}`,
      type: i % 3 === 0 ? QuestionType.TRUE_FALSE : QuestionType.MULTIPLE_CHOICE,
      category,
      difficulty,
      content: `Câu hỏi thử nghiệm ${i} - Level ${difficulty}. Đây là câu hỏi luyện tập để bạn làm quen với giao diện.`,
      options: i % 3 === 0 ? undefined : [
        'Lựa chọn A',
        'Lựa chọn B', 
        'Lựa chọn C',
        'Lựa chọn D'
      ],
      correctAnswer: i % 3 === 0 ? 'true' : 'Lựa chọn A',
      explanation: 'Đây là câu hỏi thử nghiệm.',
      timeLimit: 30,
      points: 5 + (difficulty * 2)
    });
  }
  
  return questions;
};

interface TestAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number;
  isCorrect: boolean;
}

export default function PracticeTestPage() {
  const router = useRouter();
  const [questions] = useState<Question[]>(generatePracticeQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = useCallback((answer: string | number) => {
    if (!currentQuestion) return;

    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: TestAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeSpent,
      isCorrect
    };

    setAnswers(prev => [...prev, newAnswer]);

    if (isLastQuestion) {
      finishPractice([...answers, newAnswer]);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, questionStartTime, isLastQuestion, answers]);

  const handleTimeUp = useCallback(() => {
    finishPractice(answers);
  }, [answers]);

  const finishPractice = (finalAnswers: TestAnswer[]) => {
    const correctCount = finalAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / finalAnswers.length) * 100);
    
    // Simple practice result
    alert(`🎉 Hoàn thành thử nghiệm!\n\nĐúng: ${correctCount}/${finalAnswers.length} câu\nĐộ chính xác: ${accuracy}%\n\nBạn đã sẵn sàng cho bài test chính thức!`);
    router.push('/test');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleTimeUp]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl font-medium">Đang chuẩn bị câu hỏi thử nghiệm...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Timer */}
      <Timer 
        totalTime={300}
        onTimeUp={handleTimeUp}
      />

      {/* Practice Header */}
      <div className="fixed top-4 left-4 z-40">
        <div className="bg-secondary-100 border border-secondary-300 text-secondary-800 px-4 py-2 rounded-xl font-medium text-sm">
          🏃 Test Thử Nghiệm ({answers.length + 1}/10)
        </div>
      </div>

      {/* Exit Button */}
      <div className="fixed top-4 right-20 z-40">
        <button
          onClick={() => router.push('/test')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200"
        >
          ← Thoát
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="pt-20">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
          
          {/* Practice Tips */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-secondary-100 border border-secondary-300 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-lg">💡</div>
                <div className="font-medium text-secondary-800">Mẹo làm bài:</div>
              </div>
              <div className="text-sm text-secondary-700">
                Đây là bài test thử nghiệm để bạn làm quen. Hãy thử các tính năng và cảm nhận giao diện trước khi làm bài test chính thức.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 