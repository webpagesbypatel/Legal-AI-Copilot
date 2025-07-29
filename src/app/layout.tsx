import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'LegalCopilot',
  description: 'Your AI-powered legal assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232E5DA8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m14 14-7 7'%3e%3c/path%3e%3cpath d='m20 20-7-7'%3e%3c/path%3e%3cpath d='m3 21 7-7'%3e%3c/path%3e%3cpath d='m16 8 5 5'%3e%3c/path%3e%3cpath d='M7 10h1.1c.3 0 .6.2.8.4l1.6 1.6c.2.2.5.4.8.4H12c.3 0 .6.2.8.4l1.6 1.6c.2.2.5.4.8.4H17c.3 0 .6.2.8.4l1.1 1.1'%3e%3c/path%3e%3cpath d='m4.5 12.5 5 5'%3e%3c/path%3e%3cpath d='m16 8 5 5'%3e%3c/path%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
