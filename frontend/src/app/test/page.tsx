'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GAME_CONFIG, DIFFICULTY_DISTRIBUTION } from '@testiq/shared';

const testTypes = [
  {
    id: 'iq',
    title: 'Test IQ Chính Thức',
    subtitle: `${GAME_CONFIG.TOTAL_QUESTIONS} câu hỏi trong ${GAME_CONFIG.TIME_LIMIT / 60} phút`,
    icon: '🎯',
    gradient: 'from-primary-500 to-primary-600',
    features: [
      'Kết quả chính xác',
      'Lưu vào hệ thống',
      'Có thể chia sẻ',
      'Chứng chỉ IQ',
    ],
    recommended: true,
  },
  {
    id: 'practice',
    title: 'Test Thử Nghiệm',
    subtitle: '10 câu hỏi trong 5 phút',
    icon: '🏃',
    gradient: 'from-secondary-500 to-secondary-600',
    features: [
      'Làm quen giao diện',
      'Không lưu kết quả',
      'Không giới hạn lần làm',
      'Phản hồi tức thì',
    ],
  },
];

const gameStats = [
  { label: 'Câu hỏi', icon: '🎯', color: 'text-primary-600' },
  { label: 'Phút', icon: '⏱️', color: 'text-secondary-600' },
  { label: 'Mức độ', icon: '🏔️', color: 'text-success-600' },
  { label: 'Lĩnh vực', icon: '🧩', color: 'text-purple-600' },
];

const instructions = [
  {
    step: 1,
    title: 'Đọc kỹ đề bài',
    description:
      'Mỗi câu hỏi có thể có nhiều dạng khác nhau: lựa chọn, điền từ, sắp xếp...',
    icon: '📖',
  },
  {
    step: 2,
    title: 'Quản lý thời gian',
    description:
      'Thanh thời gian luôn hiển thị. Trung bình mỗi câu có 25 giây.',
    icon: '⏰',
  },
  {
    step: 3,
    title: 'Không được quay lại',
    description: 'Một khi đã chọn đáp án và chuyển câu, không thể sửa đổi.',
    icon: '🚫',
  },
  {
    step: 4,
    title: 'Tập trung cao độ',
    description:
      'Tắt thông báo, tìm không gian yên tĩnh để có kết quả tốt nhất.',
    icon: '🧘',
  },
];

export default function TestStartPage() {
  const [selectedType, setSelectedType] = useState<'iq' | 'practice'>('iq');
  const [showInstructions, setShowInstructions] = useState(false);

  const selectedTestType = testTypes.find(type => type.id === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-secondary-200 rounded-full opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 btn-ghost"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Về trang chủ
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            🧠 Bắt Đầu Test IQ
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
            Chọn loại test phù hợp và đọc hướng dẫn trước khi bắt đầu
          </p>
        </header>

        {/* Test Type Selection */}
        <section
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
              Chọn Loại Test
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testTypes.map(testType => {
                const isSelected = selectedType === testType.id;

                return (
                  <div
                    key={testType.id}
                    onClick={() =>
                      setSelectedType(testType.id as 'iq' | 'practice')
                    }
                    className={`
                      relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1
                      ${
                        isSelected
                          ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl scale-105'
                          : 'border-neutral-200 hover:border-primary-200 hover:shadow-soft bg-white'
                      }
                    `}
                  >
                    {testType.recommended && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-soft">
                          Khuyến nghị
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`
                        w-14 h-14 rounded-2xl bg-gradient-to-br ${testType.gradient} 
                        flex items-center justify-center text-2xl text-white shadow-soft
                        ${isSelected ? 'scale-110' : ''}
                        transition-transform duration-300
                      `}
                      >
                        {testType.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-neutral-800 mb-2">
                          {testType.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-4">
                          {testType.subtitle}
                        </p>
                      </div>

                      <div
                        className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                        ${
                          isSelected
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-neutral-300'
                        }
                      `}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-white"
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
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {testType.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-neutral-600"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Test Overview */}
        <section
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
              Tổng Quan Test
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  value:
                    selectedType === 'iq' ? GAME_CONFIG.TOTAL_QUESTIONS : 10,
                  ...gameStats[0],
                },
                {
                  value:
                    selectedType === 'iq' ? GAME_CONFIG.TIME_LIMIT / 60 : 5,
                  ...gameStats[1],
                },
                { value: GAME_CONFIG.DIFFICULTY_LEVELS, ...gameStats[2] },
                { value: GAME_CONFIG.CATEGORIES, ...gameStats[3] },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-neutral-50 hover-lift"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Difficulty Distribution for IQ test */}
            {selectedType === 'iq' && (
              <div className="card-glass p-6 text-center animate-fade-in">
                <h3 className="font-bold text-lg text-neutral-800 mb-4">
                  Phân Bố Độ Khó (Hình Núi)
                </h3>
                <div className="flex items-end justify-center gap-2 h-24 mb-4">
                  {Object.entries(DIFFICULTY_DISTRIBUTION).map(
                    ([level, count]) => (
                      <div key={level} className="flex flex-col items-center">
                        <div
                          className={`w-8 bg-difficulty-${level} rounded-t-lg transition-all duration-1000 hover:opacity-80`}
                          style={{ height: `${(count / 15) * 60}px` }}
                        />
                        <div className="text-xs mt-2 font-medium">L{level}</div>
                        <div className="text-xs text-neutral-500">{count}</div>
                      </div>
                    )
                  )}
                </div>
                <p className="text-sm text-neutral-600">
                  Độ khó tăng dần như hình núi: dễ → trung bình → khó → rất khó
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Instructions */}
        <section
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="card p-8">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between text-left group"
            >
              <h2 className="text-2xl font-bold text-neutral-800">
                Hướng Dẫn Làm Bài
              </h2>
              <div
                className={`
                p-2 rounded-lg bg-neutral-100 group-hover:bg-primary-100 transition-all duration-200
                ${showInstructions ? 'rotate-180 bg-primary-100' : ''}
              `}
              >
                <svg
                  className="w-5 h-5 text-neutral-600 group-hover:text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {showInstructions && (
              <div className="mt-8 space-y-6 animate-slide-up">
                {instructions.map(instruction => (
                  <div
                    key={instruction.step}
                    className="flex gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {instruction.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-800 mb-2">
                        {instruction.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {instruction.description}
                      </p>
                    </div>
                    <div className="text-2xl flex-shrink-0">
                      {instruction.icon}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Start Button */}
        <section
          className="text-center animate-scale-in"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Sẵn sàng bắt đầu {selectedTestType?.title.toLowerCase()}?
            </h3>
            <p className="text-neutral-600 mb-8">
              {selectedType === 'iq'
                ? 'Hãy tìm một không gian yên tĩnh và tập trung cao độ để có kết quả tốt nhất'
                : 'Đây là bài test thử nghiệm, bạn có thể làm nhiều lần để làm quen'}
            </p>

            <Link
              href={`/test/${selectedType}`}
              className="group btn-primary text-lg px-12 py-4 hover-glow hover:scale-105 inline-flex items-center gap-3 mb-4"
            >
              <span className="text-2xl">{selectedTestType?.icon}</span>
              Bắt Đầu Làm Bài
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <p className="text-xs text-neutral-500">
              Bằng cách bắt đầu, bạn đồng ý tuân thủ các quy định của test
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
