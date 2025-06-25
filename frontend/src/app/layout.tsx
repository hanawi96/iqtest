import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TestIQ - Website Test IQ Thông Minh',
  description: '🧠 Kiểm tra chỉ số IQ của bạn với 60 câu hỏi trong 25 phút. Nhanh, chính xác, và hiện đại.',
  keywords: 'IQ test, intelligence test, trí tuệ nhân tạo, kiểm tra IQ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
} 