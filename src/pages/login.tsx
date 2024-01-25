import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import { signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {NextSeo} from "next-seo";

export default function Login(){
    const {user, isLoading} = useContext(AuthContext);
    const [signup_name, setSignupName] = useState("");
    const [signup_email, setSignupEmail] = useState("");
    const [signup_password, setSignupPassword] = useState("");
    const [signup_confirm_password, setSignupConfirmPassword] = useState("");
    const [login_email, setLoginEmail] = useState("");
    const [login_password, setLoginPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        if(user && !isLoading){
            router.push("/chat")
        }
    })
    const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, login_email, login_password);
            toast.success("Successful operation",{
                description:"User logged!"
            })
        } catch (error) {
            if(error == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
                toast.error("Invalid credentials",{
                    description:"Please check your credentials and try again."
                });
                setLoginPassword("");
                setLoginEmail("");
              }
              if(error == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                toast.error("Too many requests",{
                    description:"Please try again later."
                })
              }
              if(error == "FirebaseError: Firebase: Error (auth/invalid-credential)."){
                toast.error("Invalid credentials",{
                    description:"Please check your credentials and try again."
                })
              }
              else if(error == "FirebaseError: Firebase: Error (auth/network-request-failed)."){
                toast.error("Network error",{
                    description:"Please check your internet connection and try again."
                })
              } 
           console.log(error); 
        }
        
    }

    const handleSignup = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        if(signup_password !== signup_confirm_password){
            toast.error("Passwords do not match");
        }
        else if(signup_password.length < 6){
            toast.error("Password must be at least 6 characters long");
        }
        else{
            try {
                const result = await createUserWithEmailAndPassword(auth, signup_email, signup_password);
                const userDoc = doc(db, "users", result.user.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    console.log('L\'utilisateur existe déjà dans Firestore');
                }
                else {
                    await updateProfile(result.user, {
                        displayName: signup_name
                    })
                    await setDoc(userDoc, {
                        displayName: signup_name,
                        email: signup_email,
                        photoURL: "",
                        isActive: true,
                        isAdmin: false,
                        createdAt: Date.now(),
                        conversation: {
                            id: result.user.uid,
                            messages: []
                        }
                    })
                }
                toast.success("Successful operation",{
                    description:"User added!",
                })
            } catch (error) {
                console.log(error);
                if(error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                    toast.error("Email already in use",{
                        description: "Please choose a different email address."
                    })
                  }
            }
        }
        setLoading(false);
    }
    const handleSignUpwithGoogle = async()=>{
        setLoadingProvider(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const userDoc = doc(db, "users", result.user.uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                console.log('L\'utilisateur existe déjà dans Firestore');
            } 
            else {
                await setDoc(userDoc, {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    isActive: true,
                    isAdmin: false,
                    createdAt: Date.now(),
                    conversation: {
                        id: result.user.uid,
                        messages: [],
                    },
                })
                toast.success("Successful operation",{
                    description:"User sign with google added!",
                })
            }
            
        } catch (error) {
            if(error == "FirebaseError: Firebase: Error (auth/email-already-in-use)." || error== "Nous avons une erreur FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).") {
                toast.error("Failed operation",{
                    description:"Email already in use",
                })
            }
        }
        setLoadingProvider(false);
        toast.success("Successful operation",{
            description:"User sign with google added!",
            
        })
    }
    return(
        <>
        <NextSeo
            title="Login"
            description="Login to your account"
            canonical="https://niatoai.vercel.app/login"
            openGraph={{
                url: 'https://niatoai.vercel.app/login',
                title: 'Login',
                description: 'Login to your account',
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
        <main className="pt-[65px] px-2 max-w-[600px] mx-auto">
            <Tabs defaultValue="login" className="w-full pt-[10px] md:pt-[10px] lg:pt-[30px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Access to your account here. Click submit when you{"'"}re done.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email_login">Email <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="email_login" type="email" placeholder="Enter your email ..." value={login_email} onChange={(e)=>setLoginEmail(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password_login">Password <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="password_login" type="password" placeholder="Enter your password ..." value={login_password} onChange={(e)=>setLoginPassword(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Submit</Button>
                        </CardFooter>
                    </form>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                        <CardDescription>
                        Create your account here. After saving, you will redirect to the conversation.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSignup}>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Username <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="username" type="text" placeholder="Enter your name ..." value={signup_name} onChange={(e)=>setSignupName(e.target.value)}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email_signup">Email <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="email_signup" type="email" placeholder="Enter your email ..." value={signup_email} onChange={(e)=>setSignupEmail(e.target.value)}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password_signup">Password <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="password_signup" type="password" placeholder="Enter your password ..." value={signup_password} onChange={(e)=>setSignupPassword(e.target.value)}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="conf_password_signup">Confirm your password <sup className="text-red-600 text-sm">*</sup>:</Label>
                                <Input id="conf_password_signup" type="password" placeholder="Confirm your password ..." value={signup_confirm_password} onChange={(e)=>setSignupConfirmPassword(e.target.value)}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Submit</Button>
                        </CardFooter>
                    </form>
                    </Card>
                </TabsContent>
            </Tabs>
            {/* <div className="mt-5 flex w-full pb-10">
                <Button className="w-full" variant="danger" onClick={handleSignUpwithGoogle}>
                    Signup with Google
                </Button>
            </div> */}
        </main>
        </>
    )
}