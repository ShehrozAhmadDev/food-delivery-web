"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { setCart, setSelectedCartItem } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Fi1 from "@/public/img/fi1.png";
import { IMenu } from "@/types/type";
import MainContainer from "@/components/layout/mainContainer/MainContainer";
import FoodCarousel from "@/components/sections/carousel/foodCarousel/FoodCarousel";
import Menu from "@/services/menu";
import { setMenu } from "@/redux/features/menu-slice";
import AddToCartModal from "@/components/modals/AddToCartModal/AddToCartModal";

const MenuPage = () => {
  const { menu } = useAppSelector((state) => state.menuReducer.value);
  const [openCartModal, setOpenCartModal] = useState(false);

  const dispatch = useDispatch();
  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const images = ["/img/deal.jpg", "/img/deal2.jpg", "/img/deal1.jpg"];

  const getAllMenuItems = async () => {
    try {
      const data = await Menu.getAllMenuItems();
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
      <div className="min-h-[100vh] flex gap-4 md:gap-10 mt-10 justify-center flex-wrap">
        {menu.map((item) => (
          <div
            key={item?._id}
            className="min-w-[150px] min-h-[250px] md:h-[350px]  md:w-400 md:min-w-[400px] bg-red-700 rounded-2xl py-4 px-6 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between relative"
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
        ))}
      </div>
      <AddToCartModal
        isOpen={openCartModal}
        closeModal={() => setOpenCartModal(false)}
      />
    </MainContainer>
  );
};

export default MenuPage;
