import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DM_Sans, Inter } from "next/font/google";
import NextThemesProvider from "@/context/ThemeProvider";
import { AuthUserProvider } from "@/context/AuthContextProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const dm_sans = DM_Sans({
  subsets: ["latin"],
})
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} bg-white dark:bg-slate-950`}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthUserProvider>
          <Navbar/>
          <Toaster />
          <Component {...pageProps} />
        </AuthUserProvider>
      </NextThemesProvider>
    </main>
  )
}
