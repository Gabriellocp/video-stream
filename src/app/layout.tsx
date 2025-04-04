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
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Header />
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: 8,
              maxHeight: "calc(100% - 80px)",
            }}
          >
            <VideoProvider>{children}</VideoProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
