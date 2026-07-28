import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOOP - Customer Insights Platform",
  description: "Transform feedback into actionable insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
