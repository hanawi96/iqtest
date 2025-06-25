'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GAME_CONFIG, DIFFICULTY_DISTRIBUTION } from '@testiq/shared';

export default function TestStartPage() {
  const [selectedType, setSelectedType] = useState<'iq' | 'practice'>('iq');
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Về trang chủ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧠 Bắt Đầu Test IQ
          </h1>
          <p className="text-gray-600">Chọn loại test và đọc hướng dẫn trước khi bắt đầu</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Test Type Selection */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Chọn Loại Test</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedType === 'iq'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => setSelectedType('iq')}
              >
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Test IQ Chính Thức</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {GAME_CONFIG.TOTAL_QUESTIONS} câu hỏi trong {GAME_CONFIG.TIME_LIMIT / 60} phút
                </p>
                <div className="text-xs text-gray-500">
                  • Kết quả chính xác • Lưu vào hệ thống • Có thể chia sẻ
                </div>
              </div>

              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedType === 'practice'
                    ? 'border-secondary-500 bg-secondary-50'
                    : 'border-gray-200 hover:border-secondary-300'
                }`}
                onClick={() => setSelectedType('practice')}
              >
                <div className="text-3xl mb-3">🏃</div>
                <h3 className="font-semibold text-lg mb-2">Test Thử Nghiệm</h3>
                <p className="text-gray-600 text-sm mb-4">
                  10 câu hỏi trong 5 phút
                </p>
                <div className="text-xs text-gray-500">
                  • Làm quen giao diện • Không lưu kết quả • Không giới hạn lần làm
                </div>
              </div>
            </div>
          </div>

          {/* Test Overview */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Tổng Quan Test</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {selectedType === 'iq' ? GAME_CONFIG.TOTAL_QUESTIONS : 10}
                </div>
                <div className="text-sm text-gray-600">Câu hỏi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-1">
                  {selectedType === 'iq' ? GAME_CONFIG.TIME_LIMIT / 60 : 5}
                </div>
                <div className="text-sm text-gray-600">Phút</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-600 mb-1">
                  {GAME_CONFIG.DIFFICULTY_LEVELS}
                </div>
                <div className="text-sm text-gray-600">Mức độ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {GAME_CONFIG.CATEGORIES}
                </div>
                <div className="text-sm text-gray-600">Lĩnh vực</div>
              </div>
            </div>

            {/* Difficulty Distribution */}
            {selectedType === 'iq' && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Phân Bố Độ Khó (Hình Núi)</h3>
                <div className="flex items-end justify-center space-x-2 h-20">
                  {Object.entries(DIFFICULTY_DISTRIBUTION).map(([level, count]) => (
                    <div key={level} className="flex flex-col items-center">
                      <div
                        className={`w-8 bg-difficulty-${level} rounded-t`}
                        style={{ height: `${(count / 15) * 60}px` }}
                      />
                      <div className="text-xs mt-1">L{level}</div>
                      <div className="text-xs text-gray-500">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <h2 className="text-2xl font-semibold">Hướng Dẫn Làm Bài</h2>
              <div className={`transform transition-transform ${showInstructions ? 'rotate-180' : ''}`}>
                ⌄
              </div>
            </div>
            
            {showInstructions && (
              <div className="mt-6 space-y-4 animate-slide-up">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <div className="font-medium">Đọc kỹ đề bài</div>
                    <div className="text-gray-600 text-sm">Mỗi câu hỏi có thể có nhiều dạng khác nhau: lựa chọn, điền từ, sắp xếp...</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <div className="font-medium">Quản lý thời gian</div>
                    <div className="text-gray-600 text-sm">Thanh thời gian luôn hiển thị. Trung bình mỗi câu có 25 giây.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <div className="font-medium">Không được quay lại</div>
                    <div className="text-gray-600 text-sm">Một khi đã chọn đáp án và chuyển câu, không thể sửa đổi.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <div className="font-medium">Tập trung cao độ</div>
                    <div className="text-gray-600 text-sm">Tắt thông báo, tìm không gian yên tĩnh để có kết quả tốt nhất.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Link
              href={`/test/${selectedType === 'iq' ? 'iq' : 'practice'}`}
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🚀 Bắt Đầu Làm Bài ({selectedType === 'iq' ? 'Chính Thức' : 'Thử Nghiệm'})
            </Link>
            
            <p className="text-gray-500 text-sm mt-4">
              Bằng cách bắt đầu, bạn đồng ý tuân thủ các quy định của test
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 