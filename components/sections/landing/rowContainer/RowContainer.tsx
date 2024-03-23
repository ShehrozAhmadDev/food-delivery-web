import React, { useEffect, useRef, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "@/public/img/NotFound.svg";
import { setCart, setSelectedCartItem } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Fi1 from "@/public/img/fi1.png";
import { IMenu } from "@/types/type";

export interface IRowContainer {
  flag: boolean;
  scrollValue?: number;
  data: IMenu[];
  setOpenCartModal: (item: boolean) => void;
}

const RowContainer = ({
  flag,
  data,
  scrollValue,
  setOpenCartModal,
}: IRowContainer) => {
  const rowContainer = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  // const addToCart = (item: IMenu) => {
  //   const updatedCartItems = cartItems.map((cartItem) => {
  //     if (cartItem.item._id === item._id) {
  //       return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
  //     }
  //     return cartItem;
  //   });

  //   if (!updatedCartItems.some((cartItem) => cartItem.item._id === item._id)) {
  //     updatedCartItems.push({ item: item, quantity: 1 });
  //   }

  //   dispatch(setCart(updatedCartItems));
  // };

  useEffect(() => {
    if (rowContainer.current) {
      (rowContainer.current as HTMLDivElement).scrollLeft += scrollValue || 0;
    }
  }, [scrollValue]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-4 md:gap-10  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none px-10"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?._id}
            className="min-w-[200px] min-h-[300px] h-[300px] md:h-[350px]  md:w-400 md:min-w-[400px] bg-red-700 rounded-2xl py-4 px-6 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between relative"
          >
            <div className="w-full flex items-center justify-center">
              <motion.div
                className="h-40 w-40 md:w-60 md:h-60 -mt-12 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  src={item.imageUrl || Fi1}
                  alt="food"
                  className="w-full h-full object-contain rounded-xl"
                  width={200}
                  height={200}
                />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-center justify-between relative">
              <div className="w-full">
                <p className="text-textColor font-semibold text-lg md:text-xl  mt-4">
                  {item?.name}
                </p>
                <p className="mt-1 text-sm text-white/50">{item?.category}</p>
                <div className="flex items-center gap-8 mt-2">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>{" "}
                    {item?.price}
                  </p>
                </div>
              </div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center cursor-pointer hover:shadow-md -mt-12 absolute right-0 bottom-0"
                onClick={() => {
                  const cartItem = { item: item, quantity: 1, addOns: [] };
                  dispatch(setSelectedCartItem(cartItem));
                  // addToCart(item);
                  setOpenCartModal(true);
                }}
              >
                <MdShoppingCart className="text-white" />
              </motion.div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={NotFound} alt="not-found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
