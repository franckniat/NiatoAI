import { HeaderChat } from "@/components/HeaderChat";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/firebase/config";
import { getDoc, doc, collection, query, where, getDocs, DocumentData, updateDoc, addDoc, setDoc } from "firebase/firestore";
import { ArrowUp, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import OpenAI from "openai";
import { env } from "@/env";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";
type Message = {
    text: string|null;
    isUser: boolean;
    createdAt: Date;
}


const openai = new OpenAI({
    apiKey:env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true
});

const Write = () =>{
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState<DocumentData|undefined>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(user){
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef).then((doc) => {
                setUserData(doc.data())
            })
        }else {
            router.push("/login")
        }
    })
    const handleSendMessage = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (newMessage.trim() === '') return;
        const updatedMessages: Message[] = [...messages, { text: newMessage, isUser: true, createdAt: new Date()}];
        // Ajoutez ici la logique pour obtenir la réponse de l'IA
        // et ajoutez-la également à updatedMessages
        /* if(user){
            const userRef = doc(db, "users", user?.uid);
            await updateDoc(userRef, {
                conversation: {
                    messages: {
                        isUser: true,
                        text: newMessage,
                        createdAt: new Date()
                    }
                }
            })
        } */
        setMessages(updatedMessages);
        setNewMessage('');
        const completions = await openai.chat.completions.create({
            messages: [
                {
                    "role": "user", 
                    "content": newMessage
                }
            ],
            model: "gpt-3.5-turbo",
        })
        const response = completions.choices[0].message.content;
        console.log(response);
        setMessages([...updatedMessages, { text: response, isUser: false, createdAt: new Date() }]);
        /* if(user){
            const userRef = doc(db, "users", user?.uid);
            await updateDoc(userRef, {
                conversation: {
                    messages: {
                        isUser: false,
                        text: response,
                        createdAt: new Date()
                    }
                }
            })
        } */
        setLoading(false);
      };
    return (
        <>
        <NextSeo
            title="Niato AI - Chat"
            description="Start to chat with Niato AI powered by OpenAI."
            canonical="https://niatoai.vercel.app/chat"
            openGraph={{
                url: 'https://niatoai.vercel.app/chat',
                title: 'Login',
                description: 'Chat with Niato AI powered by OpenAI.',
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
        
        <div className="pt-[65px] max-w-[800px] mx-auto">
            <HeaderChat username={user?.displayName} last_seen={user?.metadata.lastSignInTime}/>

            <div className="pb-[150px] px-3">
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} isUser={message.isUser} date={message.createdAt.toLocaleTimeString("fr-FR")} />
                ))}
                <div className="flex justify-center items-center my-4">
                {loading ? (
                    <Loader2 size={25} className="animate-spin"/>
                ):(
                    null
                )}
            </div>
            </div>
            


            <div className="fixed bottom-0 w-full">
                <div className="max-w-[800px] p-5 bg-slate-200 dark:bg-slate-950">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Input placeholder="Type your message ..." className="w-full bg-slate-50 dark:bg-slate-800" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                            <Button variant="default" size={"icon"} className="flex items-center gap-2" type="submit" disabled={loading}>
                                <ArrowUp size={20}/>
                            </Button>
                        </form>
                        
                    </div>
                </div>
            </div>
            </>
    )
}

export default Write;