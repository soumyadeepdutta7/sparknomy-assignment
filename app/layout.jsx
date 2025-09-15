import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "Sparknomy : Sparking the creator economy",
  description: "sparking the creator economy",
  keywords: [
    "creator economy",
    "freelancers",
    "creators",
    "sparknomy",
    "payments",
    "invoicing",
  ],
  authors: [{ name: "Sparknomy Team" }],
  creator: "Sparknomy Team",
  publisher: "Sparknomy",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
