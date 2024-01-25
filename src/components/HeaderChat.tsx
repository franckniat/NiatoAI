import { User } from "lucide-react"
import { Button } from "./ui/button"

export const HeaderChat = ({username, last_seen}:{username:string|null|undefined, last_seen:string|undefined}) => {
    return(
        <section className="sticky top-[60px] w-full bg-white bg-opacity-95 backdrop-blur-sm  dark:bg-slate-950 z-10">
            <section className="max-w-[800px] mx-auto px-3">
                <section className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 py-3">
                    <div className="font-medium flex flex-col gap-2 pt-2">
                        <h1 className="text-lg">{username && username.toUpperCase()}</h1>
                        <p className="text-sm"> Last seen {last_seen}</p>
                    </div>
                    <div>
                        <Button variant="ghost" size={"icon"} className="flex items-center gap-2">
                            
                        </Button>
                    </div>
                </section>
            </section>
        </section>
    )
}