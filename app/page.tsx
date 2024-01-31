"use client";
import HomeContainer from "@/components/sections/landing/homeContainer/HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import RowContainer from "@/components/sections/landing/rowContainer/RowContainer";
import MenuContainer from "@/components/sections/landing/menuContainer/MenuContainer";
import CartContainer from "@/components/sections/landing/cartContainer/CartContainer";
import MainContainer from "@/components/layout/mainContainer/MainContainer";
import Menu from "@/services/menu";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setMenu } from "@/redux/features/menu-slice";
import { initialMenuItems } from "@/constants/data";

const Home = () => {
  let token = Cookie?.get("token");

  const [scrollValue, setScrollValue] = useState(0);
  const { cartShow } = useAppSelector((state) => state.cartReducer.value);
  const { menu, filteredMenu, categories, featuredMenu } = useAppSelector(
    (state) => state.menuReducer.value
  );
  const dispatch = useDispatch();
  const getAllMenuItems = async () => {
    try {
      const data = await Menu.getAllMenuItems(token);
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
      <div className="w-full h-auto flex flex-col items-center justify-center ">
        <HomeContainer />

        <section className="w-full my-6">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Our top picks
            </p>

            <div className="hidden md:flex gap-3 items-center">
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
                onClick={() => setScrollValue(-200)}
              >
                <MdChevronLeft className="text-lg text-white" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                onClick={() => setScrollValue(200)}
              >
                <MdChevronRight className="text-lg text-white" />
              </motion.div>
            </div>
          </div>
          <RowContainer
            scrollValue={scrollValue}
            flag={true}
            data={featuredMenu}
          />
        </section>

        <MenuContainer categories={categories} menuData={filteredMenu} />

        {cartShow && <CartContainer />}
      </div>
    </MainContainer>
  );
};

export default Home;
