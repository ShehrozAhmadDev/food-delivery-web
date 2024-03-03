import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setCart } from "@/redux/features/cart-slice";
import { ICartItem } from "@/types/type";

let items: ICartItem[] = [];

export interface ICartItemProps {
  item: ICartItem;
  setFlag: (value: number) => void;
  flag: number;
}

const CartItemComp = ({ item, setFlag, flag }: ICartItemProps) => {
  const [qty, setQty] = useState(item.quantity || 0);
  const dispatch = useDispatch();
  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const cartDispatch = (items: ICartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));

    dispatch(setCart(items));
  };

  const updateQty = (action: string, id?: string) => {
    if (action === "add") {
      setQty(qty + 1);

      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem.item._id === id) {
          return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
        }
        return cartItem;
      });

      if (!updatedItems.some((item) => item.item._id === id)) {
        // If the item is not in the cart, add it
        updatedItems.push({ item: item.item, quantity: 1, addOns: [] });
      }

      setFlag(flag + 1);
      cartDispatch(updatedItems);
    } else {
      if (qty === 1) {
        const updatedItems = cartItems
          .map((cartItem) => {
            if (cartItem.item._id === id) {
              if (cartItem.quantity && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.item._id !== id);

        setFlag(flag + 1);
        cartDispatch(updatedItems);
      } else {
        setQty(qty - 1);
        const updatedItems = cartItems.map((cartItem) => {
          if (cartItem.item._id === id) {
            if (cartItem.quantity) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
          }
          return cartItem;
        });

        setFlag(flag + 1);
        cartDispatch(updatedItems);
      }
    }
  };
  useEffect(() => {
    items = cartItems;
    const quat = cartItems.find((cartItem) => {
      if (cartItem.item._id === item.item._id) {
        return cartItem.quantity;
      }
    });

    setQty(quat?.quantity || 1);
  }, [qty, items]);

  return (
    <div>
      <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
        <img
          src={item.item.imageUrl}
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          alt=""
        />

        {/* name section */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-gray-50">{item?.item.name}</p>
          <p className="text-sm block text-gray-300 font-semibold">
            Rs. {item?.item.price * item.quantity}
          </p>
        </div>

        {/* button section */}
        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty("remove", item?.item._id)}
          >
            <BiMinus className="text-gray-50 bg-red-700 p-2 text-3xl rounded-md " />
          </motion.div>

          <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
            {item.quantity}
          </p>

          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty("add", item?.item._id)}
          >
            <BiPlus className="text-gray-50 bg-red-700 p-2 text-3xl rounded-md " />
          </motion.div>
        </div>
      </div>
      <div>
        {item.addOns.map((addon) => (
          <div className="w-full p-1 px-2 rounded-lg bg-white/10 flex items-center gap-2">
            <img
              src={addon.addOnId.imageUrl}
              className="w-6 h-6 max-w-[60px] rounded-full object-contain"
              alt=""
            />

            {/* name section */}
            <div className="flex flex-col gap-2">
              <p className="text-base text-gray-50">{addon?.addOnId.name}</p>
              <p className="text-sm block text-gray-300 font-semibold">
                Rs. {addon?.addOnId.price * addon.quantity}
              </p>
            </div>

            {/* button section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
              {addon.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemComp;
