import "./globals.css";
import { ReactNode } from "react";
import { defaultLocale } from "@/i18n/routing";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
