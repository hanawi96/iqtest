'use client';

import { CategoryScore } from '@testiq/shared';
import { getDifficultyColor } from '@testiq/shared';

interface ScoreChartProps {
  categoryScores: CategoryScore[];
}

export default function ScoreChart({ categoryScores }: ScoreChartProps) {
  const maxScore = Math.max(...categoryScores.map(s => s.maxScore));

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold mb-6">Phân Tích Theo Lĩnh Vực</h3>
      
      <div className="space-y-4">
        {categoryScores.map((score, index) => (
          <div key={score.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">
                {score.category.replace('_', ' ').toUpperCase()}
              </div>
              <div className="text-sm text-gray-600">
                {score.score}/{score.maxScore} ({score.percentage}%)
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${score.percentage}%`,
                  backgroundColor: getDifficultyColor((index % 6) + 1),
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">Đánh giá:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>• 90-100%: Xuất sắc</div>
          <div>• 80-89%: Tốt</div>
          <div>• 70-79%: Khá</div>
          <div>• 60-69%: Trung bình</div>
          <div>• 50-59%: Yếu</div>
          <div>• &lt;50%: Cần cải thiện</div>
        </div>
      </div>
    </div>
  );
} 