import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainNav from "@/components/navbar/navbar";
import BottomNav from "@/components/navbar/bottom-nav";
import { ThemeProvider } from "@/hooks/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";
import { CartNavProvider } from "@/components/navbar/components/cart/context/cart-nav";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "./contexts/queryProvider";
import SellerNavbarWrapper from "@/components/seller-navbar/navbar";
import MainWrapper from "@/components/main/main-wrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Spark & Style",
    template: "%s | Spark & Style",
  },
  description:
    "Discover trendy accessories and stylish glasses at Spark & Style. Elevate your look with our curated collection of fashionable eyewear and must-have accessories. Shop now to find your perfect style!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <CartNavProvider>
              <NavbarWrapper />
              <SellerNavbarWrapper />
              <MainWrapper>{children}</MainWrapper>
              <Toaster />
              <BottomNav />
            </CartNavProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
