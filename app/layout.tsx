import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.css";

const ibmPLexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "Book management application",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth(); //auth coming in from that deconstructed import in /auth.ts

  // after the inital signIn, future requests use auth which returns the session info from auth.ts

  //the auth request here leads to a callback fn to sesson in /auth.ts which returns the session info

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPLexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
