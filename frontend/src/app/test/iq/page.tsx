'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Question, QuestionType, QuestionCategory, DifficultyLevel, GAME_CONFIG, DIFFICULTY_DISTRIBUTION } from '@testiq/shared';
import QuestionCard from '../../../components/game/QuestionCard';
import Timer from '../../../components/game/Timer';

// Mock questions data - In real app, this would come from API
const generateMockQuestions = (): Question[] => {
  const questions: Question[] = [];
  let questionId = 1;

  // Generate questions based on difficulty distribution
  Object.entries(DIFFICULTY_DISTRIBUTION).forEach(([level, count]) => {
    const difficulty = parseInt(level) as DifficultyLevel;
    
    for (let i = 0; i < count; i++) {
      const categories = Object.values(QuestionCategory);
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      questions.push({
        id: `q${questionId}`,
        type: QuestionType.MULTIPLE_CHOICE,
        category,
        difficulty,
        content: `Câu hỏi ${questionId} - Level ${difficulty} - ${category.replace('_', ' ')}. Đây là một câu hỏi kiểm tra trí tuệ với độ khó level ${difficulty}.`,
        options: [
          'Đáp án A - Lựa chọn đầu tiên',
          'Đáp án B - Lựa chọn thứ hai', 
          'Đáp án C - Lựa chọn thứ ba',
          'Đáp án D - Lựa chọn thứ tư'
        ],
        correctAnswer: 'Đáp án A - Lựa chọn đầu tiên',
        explanation: 'Giải thích chi tiết về câu trả lời đúng.',
        timeLimit: 30,
        points: 10 + (difficulty * 5)
      });
      questionId++;
    }
  });

  return questions.sort(() => Math.random() - 0.5); // Shuffle questions
};

interface TestAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number;
  isCorrect: boolean;
}

export default function IQTestPage() {
  const router = useRouter();
  const [questions] = useState<Question[]>(generateMockQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.TIME_LIMIT);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Handle answer submission
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
      // Finish test
      finishTest([...answers, newAnswer]);
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, questionStartTime, isLastQuestion, answers]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    finishTest(answers);
  }, [answers]);

  // Finish test and navigate to results
  const finishTest = (finalAnswers: TestAnswer[]) => {
    const testResult = {
      answers: finalAnswers,
      totalTime: Date.now() - startTime,
      completedAt: new Date().toISOString()
    };
    
    // Store results in localStorage for now
    localStorage.setItem('testResult', JSON.stringify(testResult));
    router.push('/test/results');
  };

  // Handle submit confirmation
  const handleSubmit = () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmit = () => {
    finishTest(answers);
  };

  // Update timer
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl font-medium">Đang tải câu hỏi...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Timer */}
      <Timer 
        totalTime={GAME_CONFIG.TIME_LIMIT}
        onTimeUp={handleTimeUp}
      />

      {/* Submit Button */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={handleSubmit}
          className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-xl font-medium shadow-soft transition-all duration-200"
        >
          📝 Nộp Bài ({answers.length}/{questions.length})
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
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-strong">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2">Xác Nhận Nộp Bài</h3>
              <p className="text-gray-600">
                Bạn đã trả lời {answers.length}/{questions.length} câu hỏi.
                <br />
                Thời gian còn lại: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Tiếp Tục Làm
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 