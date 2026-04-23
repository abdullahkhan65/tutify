import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  title: "Taleem — Your AI Professor for Board Exams",
  description: "Score 85%+ on BISE board exams with your personal AI professor. Curriculum-aligned, exam-ready, available 24/7.",
  keywords: ["AI tutor", "FSc", "Matric", "BISE", "board exam", "Pakistan", "physics", "chemistry", "math"],
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "Taleem — AI Professor for Pakistani Students",
    description: "Your personal AI professor that knows the BISE syllabus, tracks your progress, and helps you score 85%+",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${notoNastaliqUrdu.variable} min-h-screen bg-background antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(240 6% 10%)",
              border: "1px solid hsl(240 5% 18%)",
              color: "hsl(0 0% 95%)",
            },
          }}
        />
      </body>
    </html>
  );
}
