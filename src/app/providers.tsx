"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { MyListProvider } from "./mylist-context";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <MyListProvider>{children}</MyListProvider>
    </NextAuthProvider>
  );
}
