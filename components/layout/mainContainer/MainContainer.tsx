import { AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import Header from "../header/Header";
import { useAppSelector } from "@/redux/store";
import CartContainer from "@/components/sections/cart/cartContainer/CartContainer";

const MainContainer = ({ children }: { children: ReactNode }) => {
  const { cartShow } = useAppSelector((state) => state.cartReducer.value);
  return (
    <AnimatePresence>
      <div className=" h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          {children}
        </main>
        {cartShow && <CartContainer />}
      </div>
    </AnimatePresence>
  );
};

export default MainContainer;
