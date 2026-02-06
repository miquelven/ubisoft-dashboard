import type { Metadata } from 'next';
import { Provider } from '@/components/ui/provider';
import { MainLayout } from '@/components/layout/MainLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ubisoft Dashboard',
  description: 'Game Analytics Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <Provider>
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
}
