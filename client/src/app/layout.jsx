import { Montserrat } from "next/font/google";
import "./globals.css";
// import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { ApolloWrapper } from "../lib/apollo-wrapper";
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";
// import { ApolloWrapper } from "";
// import { useScrollToTop } from "@/components/hooks/useScrollToTop";

const inter = Montserrat({ subsets: ["latin"] });
import { Suspense } from "react";

// export const metadata = {
//   title: `Fouriex`,
//   description: "Generated by create next app",
// };

// usePathname

export default function RootLayout({ children }) {
  // useScrollToTop();

  return (
    <html lang="en">
      <head>
        <title>Fouriex</title>
        <meta name="image" content="/logo.png" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<span className="loading loading-ball loading-lg"></span>}>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
}
