export const HeaderChat = ({username, last_seen}:{username:string|null|undefined, last_seen:string|undefined}) => {
    return(
        <section className="sticky top-[60px] w-full bg-white bg-opacity-95 backdrop-blur-sm  dark:bg-slate-950 z-10">
            <section className="max-w-[800px] mx-auto px-3">
                <section className="flex items-center justify-end border-b border-slate-200 dark:border-slate-700 py-3">
                    <div className="font-medium flex flex-col gap-2 pt-2">
                        <h1 className="text-lg font-bold">{username && username.toUpperCase()}</h1>
                        <p className="text-sm">{last_seen}</p>
                    </div>
                </section>
            </section>
        </section>
    )
}