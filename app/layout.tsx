import Providers from "./providers";
import { Nunito } from "@next/font/google";
import "@/styles/globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-900 dark:to-black min-h-screen text-slate-700 dark:text-white">
        <Providers>{children}</Providers>
        <footer className="sticky top-[100vh] py-4">
          <p className="text-center text-xs">Built with 💚 by Fahmi Jabbar</p>
        </footer>
      </body>
    </html>
  );
}
