import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🧠 <span className="text-primary-600">TestIQ</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kiểm tra chỉ số IQ của bạn với 60 câu hỏi trong 25 phút.
            <br />
            <span className="text-primary-500 font-semibold">
              Nhanh • Chính xác • Hiện đại
            </span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">60</div>
            <div className="text-gray-600">Câu hỏi</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary-600 mb-2">25</div>
            <div className="text-gray-600">Phút</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-success-600 mb-2">8</div>
            <div className="text-gray-600">Lĩnh vực</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4">
          <Link
            href="/test"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            🚀 Bắt Đầu Test IQ
          </Link>
          
          <div className="block">
            <Link
              href="/demo"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Xem Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tính Năng Nổi Bật
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">6 Mức Độ</h3>
              <p className="text-gray-600 text-sm">Từ dễ đến master theo hình núi</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="font-semibold text-gray-900 mb-2">8 Lĩnh Vực</h3>
              <p className="text-gray-600 text-sm">Logic, ngôn ngữ, không gian, v.v.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-2">Gamification</h3>
              <p className="text-gray-600 text-sm">Thành tựu, xếp hạng, thưởng</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Phân Tích Chi Tiết</h3>
              <p className="text-gray-600 text-sm">Báo cáo kết quả chuyên sâu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 