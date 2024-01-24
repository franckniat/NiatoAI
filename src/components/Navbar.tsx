import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, SunMedium } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";

export default function Navbar(){
    const {theme, setTheme} = useTheme();
    const {user, signOut} = useContext(AuthContext);
    const loginBtn = useRef<HTMLButtonElement>(null);
    const avatarUser = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if(user){
            loginBtn.current?.classList.add("hidden");
            avatarUser.current?.classList.remove("hidden");
        }else{
            loginBtn.current?.classList.remove("hidden");
            avatarUser.current?.classList.add("hidden");
        }
    })
    return(
        <nav className="fixed top-0 w-full bg-white bg-opacity-95 backdrop-blur-sm  dark:bg-slate-950">
            <section className="max-w-[800px] mx-auto px-3">
                <section className="flex items-center justify-between h-[60px]">
                    <div className="text-xl font-bold">
                        <Link href="/">Niato AI</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <Button 
                            className="relative" size={"icon"} variant="ghost"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                <SunMedium className="rotate-0 dark:rotate-45 scale-100 dark:scale-0 absolute" size={20}/>
                                <Moon className="rotate-45 dark:rotate-0 scale-0 dark:scale-100" size={20}/>
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" ref={loginBtn}>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="hidden cursor-pointer" ref={avatarUser}>
                                        {user?.photoURL === null ?
                                            <AvatarFallback className="font-bold">{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                                                :
                                            <AvatarImage alt="" src={user?.photoURL}/>
                                        }
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col gap-3 max-w-sm">
                                    <PopoverArrow className="border-white"/>
                                    <p className="text-sm">Logged as {user?.email}</p>
                                    <PopoverClose>
                                        <Button autoFocus={false} className="w-full" variant="danger" onClick={signOut}>Sign out</Button>
                                    </PopoverClose>
                                </PopoverContent>
                            </Popover>
                            
                        </div>
                    </div>
                </section>
            </section>

        </nav>
    )
}