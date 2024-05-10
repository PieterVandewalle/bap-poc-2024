import MainLayout from "@/components/Layout/MainLayout";
import { ShoppingCartProvider } from "@/contexts/ShoppingCart.context";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import backend from "backend";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [backendLoaded, setBackendLoaded] = useState(false);

  useEffect(() => {
    const initBackend = async () => {
      await backend.boot({ root: "/bin" });
      setBackendLoaded(true);
    };
    
    if(!backendLoaded)
      initBackend();
  }, [backendLoaded]);

  if (!backendLoaded) {
    return (
      <div className="flex gap-3 ">
        <Spinner aria-label="Left-aligned spinner example" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ShoppingCartProvider>
    </QueryClientProvider>
  );
}
