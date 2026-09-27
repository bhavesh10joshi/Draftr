import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Draftr — Collaborative Whiteboard for Teams',
  description:
    'Draftr is a real-time collaborative whiteboard. Create rooms, invite your team, and sketch ideas together.',
  openGraph: {
    title: 'Draftr — Collaborative Whiteboard for Teams',
    description:
      'Create rooms, invite your team, and sketch ideas together in real time.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}