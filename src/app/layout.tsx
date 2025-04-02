import { Header } from "@/components/Header";
import { VideoProvider } from "@/providers/VideoProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            height: "100vh",
            paddingBottom: 24,
          }}
        >
          <Header />
          <VideoProvider>{children}</VideoProvider>
        </div>
      </body>
    </html>
  );
}
