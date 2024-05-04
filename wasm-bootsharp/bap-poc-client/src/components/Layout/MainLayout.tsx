import { ReactNode } from "react";
import Nav from "./Nav";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Bachelorproef PoC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-grow  flex-col bg-white p-2 px-3 pb-8 sm:p-5 sm:pb-20">
        <Nav />
        <div className="mt-4 px-4">
        {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
