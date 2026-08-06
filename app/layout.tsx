import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LOOP AI Productivity - SaaS Dashboard',
  description: 'AI-driven customer feedback & productivity dashboard for SaaS teams.',
  icons: {
    icon: '/loop icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
