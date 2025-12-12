import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import CustomCursor from "@/components/ui/custom-cursor";
import Script from "next/script";
import { PerformanceProvider } from "@/contexts/PerformanceContext";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yashwanth Reddy - Software Engineer Portfolio",
  description: "E-Shaped Software Engineer specializing in Distributed Systems, Backend Architecture, AI/ML Infrastructure, and Full-Stack Development. Interactive AI-powered portfolio.",
  keywords: [
    "Yashwanth Reddy Dasari", 
    "Software Engineer",
    "Portfolio", 
    "Distributed Systems",
    "Backend Architecture", 
    "AI/ML Infrastructure",
    "Full Stack",
    "DeepSeek AI", 
    "Interactive", 
    "Next.js",
    "React",
    "ImpacterAI",
    "E-Shaped Engineer"
  ],
  authors: [
    {
      name: "Yashwanth Reddy Dasari",
      url: "https://www.linkedin.com/in/yash1th26/",
    },
  ],
  creator: "Yashwanth Reddy Dasari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashwanth.vercel.app",
    title: "Yashwanth Reddy - Software Engineer Portfolio",
    description: "E-Shaped Software Engineer - Distributed Systems, Backend, AI/ML, Full-Stack",
    siteName: "Yashwanth Reddy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashwanth Reddy - Software Engineer",
    description: "E-Shaped Software Engineer specializing in Distributed Systems and AI/ML Infrastructure",
    creator: "@yash1th26",
  },
  icons: {
    icon: [
      {
        url: "/logo.svg",
        sizes: "any",
      }
    ],
    shortcut: "/logo.svg?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/logo.svg" sizes="any" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QTH2CN2YRQ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window['dataLayer'] = window['dataLayer'] || [];
              function gtag(){window['dataLayer'].push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QTH2CN2YRQ');
            `,
          }}
        />
      </head>
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          "min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans antialiased transition-colors duration-500 ease-in-out",
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <PerformanceProvider>
            <CustomCursor />
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
            <Toaster />
          </PerformanceProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}