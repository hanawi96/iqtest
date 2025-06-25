# 🧠 TestIQ - Website Test IQ Chuyên Nghiệp

> **Một website test IQ hiện đại, đầy đủ tính năng với giao diện thân thiện và phân tích kết quả chi tiết**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan?logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Tính Năng Nổi Bật

### 🎯 **Test IQ Chuyên Nghiệp**
- **60 câu hỏi** trong **25 phút** với phân bố độ khó hình núi
- **8 lĩnh vực trí tuệ**: Logic thị giác, Logic số học, Ngôn ngữ, Không gian, Trí nhớ, Phán đoán, Giải quyết vấn đề, Tốc độ xử lý
- **6 mức độ khó** từ dễ đến siêu khó
- Giao diện test mượt mà với timer và progress bar

### 🎮 **Gamification System**
- Hệ thống achievement và badges
- Leaderboard và ranking
- Social sharing kết quả
- Surprise bonuses và rewards

### 📊 **Phân Tích Kết Quả Chi Tiết**
- Điểm IQ chính xác với phân loại level
- Phân tích theo từng lĩnh vực
- So sánh với người dùng khác
- Gợi ý cải thiện cá nhân hóa

### 🌍 **Đa Ngôn Ngữ**
- Tiếng Việt (mặc định)
- English
- Español

## 🚀 Demo Trực Tuyến

- **Frontend**: [https://testiq-frontend.vercel.app](https://testiq-frontend.vercel.app)
- **API Docs**: [https://testiq-backend.railway.app/api/docs](https://testiq-backend.railway.app/api/docs)

## 📱 Screenshots

### Trang Chủ
![Homepage](docs/screenshots/homepage.png)

### Giao Diện Test
![Test Interface](docs/screenshots/test-interface.png)

### Kết Quả Phân Tích
![Results Analysis](docs/screenshots/results.png)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Recharts** - Data visualization

### Backend
- **NestJS** - Node.js framework
- **PostgreSQL** - Primary database
- **Redis** - Caching & sessions
- **TypeORM** - Database ORM
- **JWT** - Authentication
- **Swagger** - API documentation

### DevOps & Tools
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment
- **ESLint & Prettier** - Code quality
- **Husky** - Git hooks
- **Commitlint** - Commit conventions

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone repository**
```bash
git clone https://github.com/hanawi96/iqtest.git
cd iqtest
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp env.example .env
# Edit .env with your configuration
```

4. **Start development servers**
```bash
# Start all services
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:8000
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/testiq
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
testiq/
├── 🎨 frontend/              # Next.js frontend
│   ├── src/app/              # App router pages
│   ├── src/components/       # Reusable components
│   └── src/styles/           # Global styles
├── ⚙️ backend/               # NestJS backend
│   ├── src/modules/          # Feature modules
│   ├── src/common/           # Shared utilities
│   └── src/database/         # Database configs
├── 🗄️ database/              # SQL schemas & seeds
├── 🌐 shared/                # Shared types & utils
├── 📱 mobile/                # React Native app (future)
├── 🚀 deploy/                # Deployment configs
└── 📚 docs/                  # Documentation
```

## 🎯 API Endpoints

### Test Management
```http
POST   /api/test/start        # Start new test
GET    /api/test/:id          # Get test details
POST   /api/test/:id/submit   # Submit test answers
GET    /api/test/:id/result   # Get test results
```

### User Management
```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/profile      # Get user profile
PUT    /api/auth/profile      # Update profile
```

### Leaderboard
```http
GET    /api/leaderboard       # Global rankings
GET    /api/leaderboard/me    # User's ranking
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
npm run test:frontend

# Backend tests
npm run test:backend

# E2E tests
npm run test:e2e
```

## 📈 Performance

- **Lighthouse Score**: 99+
- **Load Time**: <1s
- **Bundle Size**: <200KB gzipped
- **API Response**: <100ms average

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [hanawi96](https://github.com/hanawi96)
- **Design**: Modern UI/UX principles
- **Architecture**: Scalable microservices

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [NestJS](https://nestjs.com/) for the powerful Node.js framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

- 📧 Email: support@testiq.com
- 💬 Discord: [TestIQ Community](https://discord.gg/testiq)
- 🐛 Issues: [GitHub Issues](https://github.com/hanawi96/iqtest/issues)

---

⭐ **Nếu project này hữu ích, hãy cho chúng tôi một star!** ⭐
