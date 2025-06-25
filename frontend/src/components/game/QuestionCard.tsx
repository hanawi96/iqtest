'use client';

import { useState, useEffect } from 'react';
import { Question, QuestionType } from '@testiq/shared';
import { getDifficultyColor } from '@testiq/shared';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | number) => void;
  timeLeft: number;
}

export default function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer,
  timeLeft 
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
    setShowAnimation(true);
    
    // Delay để hiện animation
    setTimeout(() => {
      onAnswer(answer);
      setShowAnimation(false);
      setSelectedAnswer(null);
    }, 300);
  };

  const difficultyColor = getDifficultyColor(question.difficulty);
  const isTimeWarning = timeLeft <= 10;

  return (
    <div className="bg-white rounded-xl shadow-soft p-8 max-w-4xl mx-auto animate-fade-in">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Câu {questionNumber}/{totalQuestions}
          </div>
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: difficultyColor }}
          >
            Level {question.difficulty}
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {question.category.replace('_', ' ')}
          </div>
        </div>
        
        <div className={`text-lg font-mono font-bold ${isTimeWarning ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-primary-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <div className="text-xl font-medium text-gray-900 mb-4 leading-relaxed">
          {question.content}
        </div>
        
        {/* Question specific rendering based on type */}
        {question.type === QuestionType.MULTIPLE_CHOICE && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showAnimation}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-primary-500 bg-primary-50 scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                } ${showAnimation ? 'pointer-events-none' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>{option}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === QuestionType.TRUE_FALSE && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswerSelect('true')}
              disabled={showAnimation}
              className={`flex-1 p-6 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === 'true'
                  ? 'border-success-500 bg-success-50 scale-105'
                  : 'border-gray-200 hover:border-success-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="font-medium">Đúng</div>
              </div>
            </button>
            
            <button
              onClick={() => handleAnswerSelect('false')}
              disabled={showAnimation}
              className={`flex-1 p-6 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === 'false'
                  ? 'border-danger-500 bg-danger-50 scale-105'
                  : 'border-gray-200 hover:border-danger-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">❌</div>
                <div className="font-medium">Sai</div>
              </div>
            </button>
          </div>
        )}

        {question.type === QuestionType.FILL_BLANK && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nhập câu trả lời..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswerSelect((e.target as HTMLInputElement).value);
                }
              }}
            />
            <div className="text-sm text-gray-500">
              Nhấn Enter để xác nhận câu trả lời
            </div>
          </div>
        )}
      </div>

      {/* Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-strong animate-bounce-gentle">
            <div className="text-4xl text-center mb-4">✨</div>
            <div className="text-lg font-medium text-center">Đã chọn!</div>
          </div>
        </div>
      )}
    </div>
  );
} 