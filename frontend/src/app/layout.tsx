import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://testiq.vn'),
  title: {
    default: 'TestIQ - Website Test IQ Thông Minh',
    template: '%s | TestIQ',
  },
  description:
    '🧠 Kiểm tra chỉ số IQ của bạn với 60 câu hỏi trong 25 phút. Nhanh, chính xác, và hiện đại với công nghệ AI tiên tiến.',
  keywords: [
    'IQ test',
    'intelligence test',
    'trí tuệ nhân tạo',
    'kiểm tra IQ',
    'test thông minh',
    'đo lường IQ',
    'phân tích trí tuệ',
    'gamification',
  ],
  authors: [{ name: 'TestIQ Team' }],
  creator: 'TestIQ Team',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://testiq.vn',
    siteName: 'TestIQ',
    title: 'TestIQ - Website Test IQ Thông Minh',
    description:
      '🧠 Kiểm tra chỉ số IQ của bạn với 60 câu hỏi trong 25 phút. Nhanh, chính xác, và hiện đại.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TestIQ - Website Test IQ Thông Minh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TestIQ - Website Test IQ Thông Minh',
    description: '🧠 Kiểm tra chỉ số IQ của bạn với 60 câu hỏi trong 25 phút.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
