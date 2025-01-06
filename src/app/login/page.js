"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { login } from "@/utils/login"
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";


export default function loginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    // const handleLogin = async () => {
    //     const success = await login(email, password);
    //     if (success) {
    //         console.log("log in success")
    //         router.replace("/dashboard")
    //     } else {
    //         console.log("something went wrong while login")
    //     }
    // };

    // Define mutation
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            NProgress.done();
            // Redirect to dashboard on success
            router.replace("/dashboard");
        },
    });

    const handleLogin = () => {
        mutate({ email, password }); // Trigger mutation
    };

    if (isPending) {
        console.log(mutate)
        NProgress.start();
    }

    // useEffect(() => {
    //     const handleStart = () => {
    //         NProgress.start();
    //         // Simulate a delay to show the loading bar (useful for demo purposes)
    //         setTimeout(() => {
    //             NProgress.done();
    //         }, 2000); // 2-second simulated delay
    //     };

    //     const handleComplete = () => {
    //         NProgress.done();
    //     };

    //     const handleError = () => {
    //         NProgress.done();
    //     };

    //     router.events.on("routeChangeStart", handleStart);
    //     router.events.on("routeChangeComplete", handleComplete);
    //     router.events.on("routeChangeError", handleError);

    //     return () => {
    //         router.events.off("routeChangeStart", handleStart);
    //         router.events.off("routeChangeComplete", handleComplete);
    //         router.events.off("routeChangeError", handleError);
    //     };
    // }, []);


    return (
        <>
            <Header />
            <main className="flex min-h-full flex-col items-center justify-center p-24">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </>
    )
}