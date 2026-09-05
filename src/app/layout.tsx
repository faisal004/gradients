import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";
import Navbar from "@/components/navbar";
import Umami from "@/scripts/umami";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Gradio — CSS Gradient Studio",
  description: "Design, save, share, and export layered CSS gradients, patterns, and masks.",
  openGraph: { title: "Gradio — CSS Gradient Studio", description: "A tactile gradient and pattern generator.", images: ["/opengraph-image.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          {process.env.NEXT_ANALYTICS_TOKEN && <Umami />}
        </ThemeProvider>
      </body>
    </html>
  );
}
