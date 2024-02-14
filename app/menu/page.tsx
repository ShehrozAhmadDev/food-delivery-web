"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { setCart } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Fi1 from "@/public/img/fi1.png";
import { IMenu } from "@/types/type";
import MainContainer from "@/components/layout/mainContainer/MainContainer";
import FoodCarousel from "@/components/sections/carousel/foodCarousel/FoodCarousel";
import Menu from "@/services/menu";
import { setMenu } from "@/redux/features/menu-slice";

const MenuPage = () => {
  const { menu } = useAppSelector((state) => state.menuReducer.value);
  const dispatch = useDispatch();
  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );
  const addToCart = (item: IMenu) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.item._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    if (!updatedCartItems.some((cartItem) => cartItem.item._id === item._id)) {
      updatedCartItems.push({ item: item, quantity: 1 });
    }

    dispatch(setCart(updatedCartItems));
  };
  const images = [
    "/img/food-image1.jpg",
    "/img/food-image2.jpg",
    "/img/food-image3.jpg",
  ];
  console.log(menu);

  const getAllMenuItems = async () => {
    try {
      const data = await Menu.getAllMenuItems();
      console.log(data);
      if (data.status === 200) {
        dispatch(setMenu(data.menu));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMenuItems();
  }, []);
  return (
    <MainContainer>
      <div className="my-10">
        <FoodCarousel images={images} />
      </div>

      <h1 className="text-3xl text-white text-center font-bold ">Menu Items</h1>
      <div className="min-h-[100vh] flex gap-4 mt-10 flex-wrap">
        {menu.map((item) => (
          <div
            key={item?._id}
            className="w-375 h-[350px] min-w-[375px] md:w-450 md:min-w-[450px] bg-darkCardOverlay rounded-2xl py-4 px-6 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between relative"
          >
            <div className="w-full flex items-center justify-center">
              <motion.div
                className="w-60 h-60 -mt-12 drop-shadow-2xl"
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
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-12 absolute right-0 bottom-0"
                onClick={() => {
                  addToCart(item);
                }}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default MenuPage;
