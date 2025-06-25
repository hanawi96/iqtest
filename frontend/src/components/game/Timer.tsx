'use client';

import { useEffect, useState, useCallback } from 'react';
import { formatTime } from '@testiq/shared';

interface TimerProps {
  totalTime: number; // seconds
  onTimeUp: () => void;
  isPaused?: boolean;
}

export default function Timer({
  totalTime,
  onTimeUp,
  isPaused = false,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    if (isPaused) return;

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
  }, [isPaused, handleTimeUp]);

  const percentage = (timeLeft / totalTime) * 100;
  const isWarning = percentage <= 20;
  const isCritical = percentage <= 10;

  // Dynamic colors based on time left
  const getTimerColors = () => {
    if (isCritical)
      return {
        bg: 'bg-red-50/90',
        border: 'border-red-200',
        text: 'text-red-700',
        progress: 'from-red-500 to-red-600',
        shadow: 'shadow-red-100',
      };
    if (isWarning)
      return {
        bg: 'bg-amber-50/90',
        border: 'border-amber-200',
        text: 'text-amber-700',
        progress: 'from-amber-500 to-amber-600',
        shadow: 'shadow-amber-100',
      };
    return {
      bg: 'bg-white/90',
      border: 'border-neutral-200',
      text: 'text-neutral-700',
      progress: 'from-primary-500 to-primary-600',
      shadow: 'shadow-neutral-100',
    };
  };

  const colors = getTimerColors();

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-down">
      <div
        className={`
        ${colors.bg} backdrop-blur-md rounded-2xl shadow-xl border ${colors.border}
        p-4 min-w-[180px] transition-all duration-300
        ${isCritical ? 'animate-pulse scale-105' : ''}
        ${colors.shadow}
      `}
      >
        <div className="flex items-center gap-3">
          {/* Timer Icon */}
          <div
            className={`
            w-10 h-10 rounded-xl bg-gradient-to-br ${colors.progress} 
            flex items-center justify-center text-white text-lg
            ${isCritical ? 'animate-bounce' : ''}
          `}
          >
            ⏰
          </div>

          <div className="flex-1">
            {/* Time Display */}
            <div
              className={`
              font-mono font-bold text-xl ${colors.text}
              tabular-nums transition-colors duration-200
            `}
            >
              {formatTime(timeLeft)}
            </div>

            {/* Progress Bar */}
            <div className="relative mt-2">
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className={`
                    h-full bg-gradient-to-r ${colors.progress} rounded-full
                    transition-all duration-1000 ease-out origin-left
                    ${isCritical ? 'animate-pulse' : ''}
                  `}
                  style={{ width: `${Math.max(percentage, 0)}%` }}
                />
              </div>

              {/* Time percentage indicator */}
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>{Math.floor(percentage)}%</span>
                <span>
                  {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Critical warning */}
        {isCritical && (
          <div className="mt-3 p-2 bg-red-100 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 text-red-700 text-xs font-medium">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Sắp hết thời gian!
            </div>
          </div>
        )}

        {/* Warning message */}
        {isWarning && !isCritical && (
          <div className="mt-3 p-2 bg-amber-100 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-medium">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              Hãy tăng tốc!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
