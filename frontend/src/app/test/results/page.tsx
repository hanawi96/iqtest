'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { calculateIQScore, formatTime, QuestionCategory, CategoryScore } from '@testiq/shared';
import ScoreChart from '../../../components/charts/ScoreChart';

interface TestAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number;
  isCorrect: boolean;
}

interface TestResult {
  answers: TestAnswer[];
  totalTime: number;
  completedAt: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('testResult');
    if (!stored) {
      router.push('/test');
      return;
    }
    
    setTestResult(JSON.parse(stored));
  }, [router]);

  if (!testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl font-medium">Đang tính toán kết quả...</div>
        </div>
      </div>
    );
  }

  const correctAnswers = testResult.answers.filter(a => a.isCorrect).length;
  const totalQuestions = testResult.answers.length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const averageDifficulty = 3.5; // Mock average difficulty
  const iqScore = calculateIQScore(correctAnswers, totalQuestions, averageDifficulty);
  
  // Calculate category scores (mock data)
  const categoryScores: CategoryScore[] = Object.values(QuestionCategory).map((category, index) => ({
    category,
    score: Math.floor(Math.random() * 10) + 5,
    maxScore: 15,
    percentage: Math.floor(Math.random() * 40) + 60
  }));

  // Get IQ level and badge
  const getIQLevel = (score: number) => {
    if (score >= 160) return { level: 'Thiên Tài', badge: '🧠', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (score >= 140) return { level: 'Rất Cao', badge: '🌟', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 120) return { level: 'Cao', badge: '⭐', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 100) return { level: 'Trung Bình Cao', badge: '👍', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 85) return { level: 'Trung Bình', badge: '👌', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Dưới Trung Bình', badge: '💪', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const iqLevel = getIQLevel(iqScore);

  // Get ranking position (mock)
  const ranking = Math.floor(Math.random() * 20) + 1;
  const totalParticipants = 1000 + Math.floor(Math.random() * 5000);

  // Generate recommendations
  const getRecommendations = () => {
    const weak = categoryScores.filter(s => s.percentage < 70);
    const strong = categoryScores.filter(s => s.percentage >= 85);
    
    return {
      strengths: strong.length > 0 ? strong.map(s => s.category.replace('_', ' ')) : ['Khả năng tập trung tốt'],
      improvements: weak.length > 0 ? weak.map(s => s.category.replace('_', ' ')) : ['Tăng tốc độ làm bài'],
      suggestions: [
        'Luyện tập thường xuyên với các bài test tương tự',
        'Đọc sách để nâng cao vốn từ vựng và hiểu biết',
        'Chơi các trò chơi trí tuệ như sudoku, chess',
        'Tham gia các khóa học online về tư duy logic'
      ]
    };
  };

  const recommendations = getRecommendations();

  const shareText = `Tôi vừa hoàn thành bài test IQ và đạt ${iqScore} điểm (${iqLevel.level})! 🧠✨`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎉 Kết Quả Test IQ
          </h1>
          <p className="text-gray-600">Phân tích chi tiết về khả năng trí tuệ của bạn</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Score Card */}
          <div className="bg-white rounded-xl shadow-strong p-8 mb-8 text-center">
            <div className="mb-6">
              <div className={`inline-block text-6xl mb-4 p-6 rounded-full ${iqLevel.bg}`}>
                {iqLevel.badge}
              </div>
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {iqScore}
              </div>
              <div className={`text-2xl font-semibold mb-4 ${iqLevel.color}`}>
                {iqLevel.level}
              </div>
              <div className="text-gray-600">
                Chỉ số IQ của bạn
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Câu đúng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">Độ chính xác</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{formatTime(Math.floor(testResult.totalTime / 1000))}</div>
                <div className="text-sm text-gray-600">Thời gian</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">#{ranking}</div>
                <div className="text-sm text-gray-600">Xếp hạng</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Analysis */}
            <ScoreChart categoryScores={categoryScores} />

            {/* Ranking & Comparison */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold mb-6">Xếp Hạng & So Sánh</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div>
                    <div className="font-medium">Vị trí của bạn</div>
                    <div className="text-sm text-gray-600">Trong {totalParticipants.toLocaleString()} người tham gia</div>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">#{ranking}</div>
                </div>
                
                <div className="text-center py-4">
                  <div className="text-sm text-gray-600 mb-2">Phân phối điểm số</div>
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                      <span>&lt;85</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
                      <span>85-100</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                      <span>100-120</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded mr-1"></div>
                      <span>120-140</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded mr-1"></div>
                      <span>&gt;140</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                Bạn thuộc top {Math.round((ranking / totalParticipants) * 100)}% người có điểm số cao nhất!
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6">Phân Tích & Gợi Ý</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <h4 className="font-medium text-green-600 mb-3">💪 Điểm Mạnh</h4>
                <ul className="space-y-2">
                  {recommendations.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Areas for Improvement */}
              <div>
                <h4 className="font-medium text-orange-600 mb-3">🎯 Cần Cải Thiện</h4>
                <ul className="space-y-2">
                  {recommendations.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Suggestions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-blue-600 mb-3">💡 Gợi Ý Phát Triển</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-1.5"></div>
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  navigator.share?.({ text: shareText }) || 
                  navigator.clipboard?.writeText(shareText);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
              >
                📤 Chia Sẻ Kết Quả
              </button>
              
              <Link
                href="/test"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
              >
                🔄 Làm Lại Test
              </Link>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
              >
                📊 {showDetails ? 'Ẩn' : 'Xem'} Chi Tiết
              </button>
            </div>
            
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Về trang chủ
            </Link>
          </div>

          {/* Detailed Results */}
          {showDetails && (
            <div className="mt-8 bg-white rounded-xl shadow-soft p-6 animate-slide-up">
              <h3 className="text-lg font-semibold mb-4">Chi Tiết Từng Câu</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {testResult.answers.map((answer, index) => (
                  <div key={answer.questionId} className={`p-3 rounded-lg border ${
                    answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-sm">
                          {answer.isCorrect ? '✅ Đúng' : '❌ Sai'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(Math.floor(answer.timeSpent / 1000))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 