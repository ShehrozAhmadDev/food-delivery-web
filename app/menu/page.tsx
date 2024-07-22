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
import Banner from "@/services/banner";
import MenuItem from "@/components/common/menu-item/MenuItem";

const MenuPage = () => {
  const { menu } = useAppSelector((state) => state.menuReducer.value);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [banners, setBanners] = useState([]);

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

  const getAllBannerItems = async () => {
    try {
      const data = await Banner.getAllBannerItems();
      if (data?.status === 200) {
        setBanners(data.banner);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMenuItems();
    getAllBannerItems();
  }, []);
  return (
    <MainContainer>
      <div className="my-10">
        <FoodCarousel bannerData={banners} />
      </div>

      <h1 className="text-3xl text-white text-center font-bold ">Menu Items</h1>
      <div className="min-h-[100vh] flex gap-4 md:gap-10 mt-10 justify-center flex-wrap">
        {menu.map((item) => (
          <MenuItem item={item} key={item._id} />
        ))}
      </div>
    </MainContainer>
  );
};

export default MenuPage;
