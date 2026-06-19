import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRCC Academy — LMS",
  description: "Platform pre-test, materi, post-test & sertifikat untuk training GRCC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
