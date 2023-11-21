import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Main from './components/Main';
import Header from './components/header/Header';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticket Forms',
  description: 'Differnt Ticket Forms For Monster Transmission & Performance'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Header />
          <Main>{children}</Main>
        </Suspense>
      </body>
    </html>
  );
}
