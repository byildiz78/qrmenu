import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoryNav } from '@/components/layout/category-nav';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { MenuProvider } from './menu-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lezzet Restoran | Digital Menu',
  description: 'Modern digital menu application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <MenuProvider>
          <ThemeProvider />
          <Header />
          <CategoryNav />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </MenuProvider>
      </body>
    </html>
  );
}