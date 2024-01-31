import { AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import Header from "../header/Header";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          {children}
        </main>
      </div>
    </AnimatePresence>
  );
};

export default MainContainer;
