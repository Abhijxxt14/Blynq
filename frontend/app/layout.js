import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google';
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: "Blynq — Move Any File. Instantly.",
  description: "Share files across devices with a 6-digit code. No compression. No friction. Files up to 5GB.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-body bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
