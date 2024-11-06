import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}
