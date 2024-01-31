import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setCart } from "@/redux/features/cart-slice";
import { IMenu } from "@/redux/features/menu-slice";

let items: IMenu[] = [];

export interface ICartItem {
  item: IMenu;
  setFlag: (value: number) => void;
  flag: number;
}

const CartItem = ({ item, setFlag, flag }: ICartItem) => {
  const [qty, setQty] = useState(item.quantity || 0);
  const dispatch = useDispatch();
  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch(setCart(items));
  };

  const updateQty = (action: string, id?: string) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems &&
        cartItems.map((item) => {
          if (item._id === id) {
            if (item.quantity) item.quantity = item.quantity + 1;
            setFlag(flag + 1);
          }
        });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        items = cartItems && cartItems.filter((item) => item._id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item._id === id) {
            if (item.quantity) item.quantity -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={
          "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg"
        }
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {item?.price * qty}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?._id)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?._id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
