import type { Metadata } from "next";
import "./globals.css";
import BottomNav from '../components/BottomNav';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: "MUSE – Fashion Prediction Markets",
  description: "Vote, predict, and pre-order the trends you believe in.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="px-6">
        <AuthProvider>
          <main className="pb-20">
            {children}
          </main>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}