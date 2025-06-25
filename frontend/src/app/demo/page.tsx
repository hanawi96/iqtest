'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Question, QuestionType, QuestionCategory, DifficultyLevel } from '@testiq/shared';
import QuestionCard from '../../components/game/QuestionCard';

const demoQuestion: Question = {
  id: 'demo_1',
  type: QuestionType.MULTIPLE_CHOICE,
  category: QuestionCategory.LOGIC_VISUAL,
  difficulty: DifficultyLevel.LEVEL_2,
  content: 'Đây là câu hỏi demo để bạn xem trước giao diện. Trong dãy số sau, số nào tiếp theo? 2, 4, 8, 16, ?',
  options: ['24', '32', '20', '18'],
  correctAnswer: '32',
  explanation: 'Mỗi số gấp đôi số trước đó: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
  timeLimit: 30,
  points: 15
};

export default function DemoPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer as string);
    setShowAnswer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Về trang chủ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👀 Demo Giao Diện Test
          </h1>
          <p className="text-gray-600">Xem trước giao diện và cách thức hoạt động của bài test</p>
        </div>

        {/* Demo Instructions */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-100 border border-blue-300 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">ℹ️</div>
              <div className="font-semibold text-blue-800">Hướng dẫn Demo</div>
            </div>
            <div className="text-blue-700 space-y-2">
              <p>• Đây là giao diện thực tế mà bạn sẽ thấy khi làm bài test</p>
              <p>• Hãy thử chọn một đáp án để xem cách hệ thống phản hồi</p>
              <p>• Trong bài test thật, bạn sẽ có thời gian giới hạn cho mỗi câu</p>
              <p>• Sau khi chọn đáp án, bạn sẽ tự động chuyển sang câu tiếp theo</p>
            </div>
          </div>
        </div>

        {/* Demo Question */}
        <div className="max-w-4xl mx-auto">
          <QuestionCard
            question={demoQuestion}
            questionNumber={1}
            totalQuestions={60}
            onAnswer={handleAnswer}
            timeLeft={1500} // 25 minutes
          />
        </div>

        {/* Answer Explanation */}
        {showAnswer && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className={`rounded-xl p-6 border-2 animate-slide-up ${
              selectedAnswer === demoQuestion.correctAnswer
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">
                  {selectedAnswer === demoQuestion.correctAnswer ? '🎉' : '😅'}
                </div>
                <div className="font-semibold text-lg">
                  {selectedAnswer === demoQuestion.correctAnswer ? 'Chính xác!' : 'Chưa đúng!'}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Bạn đã chọn: </span>
                  <span className={selectedAnswer === demoQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                    {selectedAnswer}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium">Đáp án đúng: </span>
                  <span className="text-green-600">{demoQuestion.correctAnswer}</span>
                </div>
                
                <div>
                  <span className="font-medium">Giải thích: </span>
                  <span className="text-gray-700">{demoQuestion.explanation}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Trong bài test thật, bạn sẽ không thấy giải thích ngay lập tức. 
                  Kết quả và giải thích sẽ được hiển thị ở trang kết quả cuối cùng.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12 space-y-4">
          <div className="space-x-4">
            <Link
              href="/test/practice"
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🏃 Thử Test Ngắn (10 câu)
            </Link>
            
            <Link
              href="/test"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🎯 Bắt Đầu Test Chính Thức
            </Link>
          </div>
          
          <div>
            <button
              onClick={() => {
                setShowAnswer(false);
                setSelectedAnswer(null);
              }}
              className="text-gray-600 hover:text-gray-700 font-medium"
            >
              🔄 Reset Demo
            </button>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Tính Năng Nổi Bật
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="font-semibold mb-2">Đồng Hồ Đếm Ngược</h3>
              <p className="text-gray-600 text-sm">Theo dõi thời gian còn lại với cảnh báo khi sắp hết thời gian</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Thanh Tiến Trình</h3>
              <p className="text-gray-600 text-sm">Hiển thị tiến độ làm bài một cách trực quan</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold mb-2">Hiệu Ứng Mượt</h3>
              <p className="text-gray-600 text-sm">Animation đẹp mắt khi chọn đáp án và chuyển câu</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold mb-2">Phân Loại Độ Khó</h3>
              <p className="text-gray-600 text-sm">Câu hỏi được phân chia theo 6 mức độ khó khác nhau</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600 text-sm">Hoạt động mượt mà trên mọi thiết bị</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-semibold mb-2">Phân Tích Chi Tiết</h3>
              <p className="text-gray-600 text-sm">Kết quả được phân tích theo từng lĩnh vực trí tuệ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 