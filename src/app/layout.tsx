"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import React, { ReactNode, useState } from "react";
import { Providers } from "@/app/providers";
import MainLayout from "@/components/main-layout";

const inter = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
export type Theme = "light" | "dark";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <html lang="en" className={theme}>
      <body className={`text-foreground bg-background ${inter.className}`}>
        <Providers>
          <MainLayout currentTheme={theme} onThemeToggleClick={toggleTheme} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
