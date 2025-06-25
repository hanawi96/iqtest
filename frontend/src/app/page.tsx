import Link from 'next/link';

const stats = [
  { value: '60', label: 'Câu hỏi', icon: '🎯', color: 'text-primary-600' },
  { value: '25', label: 'Phút', icon: '⏱️', color: 'text-secondary-600' },
  { value: '8', label: 'Lĩnh vực', icon: '🧩', color: 'text-success-600' },
  { value: '6', label: 'Mức độ', icon: '🏔️', color: 'text-purple-600' },
];

const features = [
  {
    icon: '🎯',
    title: '6 Mức Độ',
    description: 'Từ dễ đến master theo hình núi',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🧩',
    title: '8 Lĩnh Vực',
    description: 'Logic, ngôn ngữ, không gian, v.v.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🏆',
    title: 'Gamification',
    description: 'Thành tựu, xếp hạng, thưởng',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '📊',
    title: 'Phân Tích Chi Tiết',
    description: 'Báo cáo kết quả chuyên sâu',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Floating decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-30 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main heading with enhanced typography */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
                <span className="block text-neutral-800">🧠</span>
                <span className="text-gradient">TestIQ</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 text-balance max-w-3xl mx-auto leading-relaxed">
                Kiểm tra chỉ số IQ của bạn với{' '}
                <span className="font-semibold text-primary-600">
                  60 câu hỏi
                </span>{' '}
                trong{' '}
                <span className="font-semibold text-secondary-600">
                  25 phút
                </span>
              </p>
            </div>

            {/* Feature badges */}
            <div
              className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-700 shadow-soft border border-primary-100">
                ⚡ Siêu nhanh
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-success-700 shadow-soft border border-success-100">
                🎯 Chính xác
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-secondary-700 shadow-soft border border-secondary-100">
                ✨ Hiện đại
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-scale-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Link
                href="/test"
                className="group btn-primary text-lg px-8 py-4 hover-glow hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Bắt Đầu Test IQ
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link href="/demo" className="btn-secondary hover-lift">
                👀 Xem Demo
              </Link>
            </div>

            <p
              className="text-sm text-neutral-500 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Miễn phí • Không cần đăng ký • Kết quả tức thì
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-glass p-6 text-center hover-lift animate-slide-up"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-neutral-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 text-balance">
              Tính Năng Nổi Bật
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Trải nghiệm test IQ hiện đại với công nghệ tiên tiến và giao diện
              thân thiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group card-hover p-8 text-center animate-slide-up"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-lg text-neutral-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="card-glass max-w-4xl mx-auto p-12 text-center animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6 text-balance">
              Sẵn sàng khám phá trí tuệ của bạn?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto text-balance">
              Chỉ mất 25 phút để có được đánh giá chính xác về chỉ số IQ của bạn
            </p>
            <Link
              href="/test"
              className="btn-primary text-lg px-10 py-4 hover-glow hover:scale-105 inline-flex items-center gap-3"
            >
              🧠 Bắt Đầu Ngay
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
          </div>
        </section>
      </div>
    </div>
  );
}
