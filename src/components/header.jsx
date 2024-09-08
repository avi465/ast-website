"use client"

import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import { buttonVariants } from "@/components/ui/button"

export default function Header() {
    return (
        <div className='sticky top-0 z-50 shadow-sm'>
            <nav className="bg-white dark:bg-neutral-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 py-2 md:px-6">
                    <div className="flex flex-wrap justify-start items-center">
                        <Link href="/">
                            <h1 className="font-medium">AST</h1>
                        </Link>
                    </div>

                    <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </nav>
        </div>
    )
}