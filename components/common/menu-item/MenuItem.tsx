import { IMenu } from "@/types/type";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import AddToCartModal from "@/components/modals/AddToCartModal/AddToCartModal";
import Fi1 from "@/public/img/fi1.png";
import { useDispatch } from "react-redux";
import { setSelectedCartItem } from "@/redux/features/cart-slice";

interface IMenuItem {
  item: IMenu;
}
const MenuItem = ({ item }: IMenuItem) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="min-w-[150px] min-h-[250px] md:h-[350px]  md:w-400 md:min-w-[400px] shadow-lg backdrop-blur-xl backdrop-filter rounded-2xl py-4 px-6 my-12] bg-red-700 bg-opacity-30  hover:drop-shadow-lg flex flex-col items-center justify-between relative">
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
              <span className="text-sm text-red-500">Rs.</span> {item?.price}
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
        <AddToCartModal
          isOpen={openCartModal}
          closeModal={() => setOpenCartModal(false)}
        />
      </div>
    </div>
  );
};

export default MenuItem;
