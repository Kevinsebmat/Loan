import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Loan Application Builder',
  description: 'Multi-step loan application form built with Next.js, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 