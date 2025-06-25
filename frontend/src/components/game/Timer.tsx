'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@testiq/shared';

interface TimerProps {
  totalTime: number; // seconds
  onTimeUp: () => void;
  isPaused?: boolean;
}

export default function Timer({ totalTime, onTimeUp, isPaused = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onTimeUp]);

  const percentage = (timeLeft / totalTime) * 100;
  const isWarning = percentage <= 20;
  const isCritical = percentage <= 10;

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className={`bg-white rounded-xl shadow-strong p-4 border-2 ${
        isCritical ? 'border-red-500 animate-pulse' : 
        isWarning ? 'border-yellow-500' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`text-2xl ${isCritical ? 'animate-bounce' : ''}`}>
            ⏰
          </div>
          
          <div>
            <div className={`text-lg font-mono font-bold ${
              isCritical ? 'text-red-600' : 
              isWarning ? 'text-yellow-600' : 'text-gray-700'
            }`}>
              {formatTime(timeLeft)}
            </div>
            
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  isCritical ? 'bg-red-500' : 
                  isWarning ? 'bg-yellow-500' : 'bg-primary-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
        
        {isCritical && (
          <div className="text-xs text-red-600 mt-2 text-center animate-pulse">
            Sắp hết thời gian!
          </div>
        )}
      </div>
    </div>
  );
} 