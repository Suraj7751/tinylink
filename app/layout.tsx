// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "TinyLink – URL Shortener",
  description: "Shorten links, share, and track clicks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
