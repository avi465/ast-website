import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import "nprogress/nprogress.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata = {
  title: "Advance Stydy Tutorials",
  description: "advance study tutorials admin page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html >
  );
}

// Configure NProgress
// NProgress.configure({
//   showSpinner: false, // Disable the spinner
// });

// export default function RootLayout({ children }) {
//   const [queryClient] = useState(() => new QueryClient());

//   const pathname = usePathname();

//   useEffect(() => {
//     const handleStart = () => {
//       NProgress.start();
//     };
//     const handleStop = () => {
//       NProgress.done();
//     };

//     // Monitor path changes
//     handleStart();
//     handleStop();

//     return () => {
//       NProgress.done();
//     };
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <QueryClientProvider client={queryClient}>
//           {children}
//           <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//       </body>
//     </html >
//   );
// }
