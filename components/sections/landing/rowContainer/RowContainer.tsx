import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "@/public/img/NotFound.svg";
import { setCart } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Fi1 from "@/public/img/fi1.png";
import { IMenu } from "@/types/type";

export interface IRowContainer {
  flag: boolean;
  scrollValue?: number;
  data: IMenu[];
}

const RowContainer = ({ flag, data, scrollValue }: IRowContainer) => {
  const rowContainer = useRef(null);
  const [items, setItems] = useState<IMenu[]>([]);
  const dispatch = useDispatch();

  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const addtocart = () => {
    dispatch(setCart(items));
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    if (rowContainer.current) {
      rowContainer.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?._id}
            className="w-375 h-[250px] min-w-[375px] md:w-400 md:min-w-[400px]  bg-darkCardOverlay rounded-2xl py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  src={item.imageUrl || Fi1}
                  alt="food"
                  className="w-full h-full object-contain rounded-xl"
                  width={100}
                  height={100}
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => {
                  if (cartItems) {
                    setItems([...cartItems, item]);
                  }
                }}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.name}
              </p>
              <p className="mt-1 text-sm text-white/50">{item?.category}</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
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
