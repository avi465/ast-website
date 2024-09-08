"use client"

import Link from "next/link"


export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 py-8 md:px-6">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">AST™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link href="https://www.github.com/avi465/" className="hover:underline">Made with ❤️ by avi</Link>
                </li>
            </ul>
        </footer>
    )
}