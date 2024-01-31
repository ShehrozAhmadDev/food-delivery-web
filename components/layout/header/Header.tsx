"use client";
import Link from "next/link";
import React, { useState } from "react";

import Logo from "@/public/img/logo.png";
import Avatar from "@/public/img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCart, setShowCart } from "@/redux/features/cart-slice";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { items: cartItems, cartShow } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const { user } = useAppSelector((state) => state.userReducer.value);
  console.log(user);
  const dispatch = useDispatch();

  const login = async () => {};

  const logout = () => {};

  const showCart = () => {
    dispatch(setShowCart(!cartShow));
  };

  const headerItems = [
    { id: 0, title: "Home", link: "/" },
    { id: 1, title: "Menu", link: "/menu" },
    { id: 2, title: "About us", link: "/about-us" },
  ];

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            {headerItems.map((item) => (
              <Link
                href={item.link}
                className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              >
                {item.title}
              </Link>
            ))}
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          {user ? (
            <div className="relative">
              <Image
                src={Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                alt="userprofile"
                onClick={() => {
                  setIsMenu(true);
                }}
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-40 bg-card shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                >
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-primary transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Logout <MdLogout />
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <div>
              <Link
                className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                href={"/login"}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link href={"/"} className="flex items-center gap-2">
          <Image src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>

        <div className="relative">
          <Image
            src={Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-card shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              <ul className="flex flex-col ">
                {headerItems.map((item) => (
                  <Link
                    href={item.link}
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-card gap-3 cursor-pointer hover:bg-primary transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
