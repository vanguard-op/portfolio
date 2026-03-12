import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Manrope, Smooch_Sans } from "next/font/google";
import "swiper/css";
import "@/app/globals.css";
import { ContextProvider } from "@/app/provider";
import MainLayout from "@/components/main-layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Smooch_Sans({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Ahmad Khidir",
  description: "Welcome to Ahmad Khidir's Portfolio! A Software Engineer passionate about building scalable, efficient solutions that spark innovation and deliver real impact.",
  keywords: ["Ahmad Khidir", "Full Stack Developer", "Software Engineer", "AI/ML", "Mobile Developer", "React", "Next.js", "TypeScript", "FastAPI", "Django", "Node.js"],
  authors: [{ name: "Ahmad Khidir" }],
  creator: "Ahmad Khidir",
  openGraph: {
    title: "Ahmad Khidir - Software Engineer",
    description: "Welcome to Ahmad Khidir's Portfolio! A Software Engineer passionate about building scalable, efficient solutions that spark innovation and deliver real impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${manrope.variable} ${anton.variable} ${roboto.variable} antialiased *:overflow-x-hidden`}
      >
        <ContextProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ContextProvider>
      </body>
    </html>
  );
}
