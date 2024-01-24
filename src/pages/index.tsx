
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";
import { NextSeo } from "next-seo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <NextSeo
            title="Niato AI - Home page"
            description="Start to chat with Niato AI powered by OpenAI."
            canonical="https://niatoai.vercel.app/"
            openGraph={{
                url: 'https://niatoai.vercel.app/',
                title: 'Home Page',
                images: [
                    {
                        url: '/niatoai.png',
                        width: 800,
                        height: 600,
                    }
                ]
            }}
            twitter={{
                handle: '@manuel_niat',
            }}
        />
      <main className="pt-[65px] px-3 max-w-[800px] mx-auto">
        <div className="text-center pt-[60px] max-w-[500px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-700 dark:from-slate-500  via-slate-400 dark:via-slate-300 to-slate-600 dark:to-slate-500 bg-clip-text text-transparent tracking-tighter">An interactive chatbox boosted by AI</h1>
          <p className="text-xl font-medium mt-3 text-slate-800 dark:text-slate-400">Experience Niato AI, your virtual messaging genius.</p>
          <p className="text-lg mt-3 text-slate-800 dark:text-slate-400">
            Niato anticipates your needs, tailors its language to your unique style, and transforms every exchange into a personalized journey. Welcome to a new era of instant messaging, powered by the innovation of OpenAI!
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Link href="/login">
            <Button variant="default" size={"lg"} className="flex items-center gap-2">
              <span>🚀</span>
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/franckniat/NiatoAI" target="_blank">
            <Button variant="outline" size={"lg"} className="flex items-center gap-2">
              <Zap size={15} className="text-amber-500"/>
              Github
            </Button>
          </Link>
        </div>
      </main>
    </>
    
  );
}
