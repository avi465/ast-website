"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"; // Update this import based on your project's file structure

export default function DynamicBreadcrumb() {
    const pathname = usePathname();

    // Split the current path into parts
    const paths = pathname.split("/").filter(Boolean);

    if (paths.length === 0) {
        return null; // No breadcrumbs for the root path
    }

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>{capitalize(path)}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

// Utility to capitalize breadcrumb text
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
