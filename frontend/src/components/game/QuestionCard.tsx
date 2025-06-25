'use client';

import React, { useState, useCallback } from 'react';
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
  timeLeft,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(
    null
  );
  const [showTransition, setShowTransition] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAnswerSelect = useCallback(
    (answer: string | number) => {
      if (showTransition) return;

      setSelectedAnswer(answer);
      setShowTransition(true);

      setTimeout(() => {
        onAnswer(answer);
        setShowTransition(false);
        setSelectedAnswer(null);
        setInputValue('');
      }, 600);
    },
    [onAnswer, showTransition]
  );

  const handleInputSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        handleAnswerSelect(inputValue.trim());
      }
    },
    [inputValue, handleAnswerSelect]
  );

  const difficultyColor = getDifficultyColor(question.difficulty);
  const isTimeWarning = timeLeft <= 10;
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      {/* Question Header */}
      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                {questionNumber}
              </div>
              <span>của {totalQuestions}</span>
            </div>

            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-soft"
              style={{ backgroundColor: difficultyColor }}
            >
              Level {question.difficulty}
            </div>

            <div className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
              {question.category.replace('_', ' ')}
            </div>
          </div>

          <div
            className={`
            font-mono font-bold text-lg transition-colors duration-200
            ${isTimeWarning ? 'text-red-600 animate-pulse' : 'text-neutral-700'}
          `}
          >
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="progress-bar h-2">
          <div
            className="progress-fill animate-progress"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>Tiến độ</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="card p-8 hover:shadow-medium transition-shadow duration-300">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6 leading-relaxed text-balance">
            {question.content}
          </h2>

          {/* Question Type Specific Rendering */}
          {question.type === QuestionType.MULTIPLE_CHOICE &&
            question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const letter = String.fromCharCode(65 + index);

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showTransition}
                      className={`
                      group w-full p-4 text-left rounded-xl border-2 transition-all duration-300
                      ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 shadow-soft scale-[1.02]'
                          : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 hover:shadow-soft'
                      }
                      ${showTransition ? 'pointer-events-none' : 'hover:-translate-y-0.5'}
                      disabled:opacity-50
                    `}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                        w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all duration-200
                        ${
                          isSelected
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-neutral-300 text-neutral-600 group-hover:border-primary-300'
                        }
                      `}
                        >
                          {letter}
                        </div>
                        <div className="text-neutral-800 leading-relaxed">
                          {option}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

          {question.type === QuestionType.TRUE_FALSE && (
            <div className="flex gap-4">
              {[
                { value: 'true', label: 'Đúng', icon: '✅', color: 'success' },
                { value: 'false', label: 'Sai', icon: '❌', color: 'danger' },
              ].map(({ value, label, icon, color }) => {
                const isSelected = selectedAnswer === value;

                return (
                  <button
                    key={value}
                    onClick={() => handleAnswerSelect(value)}
                    disabled={showTransition}
                    className={`
                      flex-1 p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1
                      ${
                        isSelected
                          ? `border-${color}-500 bg-${color}-50 shadow-large scale-105`
                          : `border-neutral-200 hover:border-${color}-300 hover:shadow-soft`
                      }
                      ${showTransition ? 'pointer-events-none' : ''}
                      disabled:opacity-50
                    `}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{icon}</div>
                      <div
                        className={`font-bold text-lg ${isSelected ? `text-${color}-700` : 'text-neutral-800'}`}
                      >
                        {label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === QuestionType.FILL_BLANK && (
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleInputSubmit}
                  placeholder="Nhập câu trả lời của bạn..."
                  className="input text-lg py-4 pr-12"
                  disabled={showTransition}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                Nhấn Enter để xác nhận câu trả lời
              </div>

              {inputValue.trim() && (
                <button
                  onClick={() => handleAnswerSelect(inputValue.trim())}
                  disabled={showTransition}
                  className="btn-primary px-6 py-3 hover-lift disabled:opacity-50"
                >
                  Xác nhận
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Transition Overlay */}
      {showTransition && (
        <div className="fixed inset-0 bg-primary-500/10 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="card p-8 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold text-neutral-800 mb-2">
                Đã chọn!
              </div>
              <div className="text-sm text-neutral-600">
                Chuyển sang câu tiếp theo...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
