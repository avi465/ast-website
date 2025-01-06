"use client"

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Advance Stydy Tutorials",
//   description: "advance study tutorials admin page",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

// Configure NProgress
NProgress.configure({
  showSpinner: false, // Disable the spinner
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    // Monitor path changes
    handleStart();
    handleStop();

    return () => {
      NProgress.done();
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html >
    </QueryClientProvider>
  );
}
