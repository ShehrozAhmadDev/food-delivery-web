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
import MenuItem from "@/components/common/menu-item/MenuItem";

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
        data.map((item) => <MenuItem item={item} key={item._id} />)
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
