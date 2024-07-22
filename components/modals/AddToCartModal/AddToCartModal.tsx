import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { IAddOnItem, ICartItem, IMenu, IOrders } from "@/types/type";
import { useAppSelector } from "@/redux/store";
import CartItemComp from "@/components/sections/cart/cartItemComp/CartItemComp";

import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/features/cart-slice";
import Image from "next/image";
interface AddtoCartModalProps {
  loading?: boolean;
  isOpen: boolean;
  closeModal: () => void;
}

function AddToCartModal({ loading, isOpen, closeModal }: AddtoCartModalProps) {
  const { selectedItem } = useAppSelector((state) => state.cartReducer.value);
  const [flag, setFlag] = useState(1);
  const [quantity, setQuantity] = useState<number>(1);

  const { items: cartItems } = useAppSelector(
    (state) => state.cartReducer.value
  );

  const dispatch = useDispatch();

  const updateQty = (action: "add" | "remove") => {
    if (action === "add") {
      setQuantity(quantity + 1);
    } else if (action === "remove") {
      if (quantity !== 1) setQuantity(quantity - 1);
    }
  };

  const cartDispatch = (items: ICartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));

    dispatch(setCart(items));
  };

  const updateCartQty = () => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.item._id === selectedItem?.item._id) {
        return {
          ...cartItem,
          quantity: quantity,
        };
      }
      return cartItem;
    });

    if (
      !updatedItems.some((item) => item.item._id === selectedItem?.item._id)
    ) {
      if (selectedItem)
        updatedItems.push({
          item: selectedItem?.item,
          quantity: quantity,
        });
    }

    setFlag(flag + 1);
    cartDispatch(updatedItems);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
        setQuantity(1);
      }}
      contentLabel="Add to cart"
      className="absolute top-1/2 w-[70%] z-10 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-black p-10 rounded-lg shadow-lg"
      overlayClassName="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="w-[375px] md:w-[100%]">
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar text-white px-5">
          <h1 className="mx-auto my-3 text-2xl">Add to Cart</h1>
          <div className="mb-6 flex flex-col gap-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Image
                  src={selectedItem?.item.imageUrl || ""}
                  alt="menu-image"
                  width={300}
                  height={200}
                />
                <h1 className="text-3xl mt-4">{selectedItem?.item.name}</h1>
                <h3 className="text-xl mt-4">
                  {selectedItem?.item.description}
                </h3>
              </div>
              <div className="flex flex-col justify-between">
                {selectedItem && (
                  <div>
                    <div>
                      {selectedItem.item.sizes.map((size) => (
                        <div>
                          <div>{size.size}</div>
                          <div>{size.price}</div>
                        </div>
                      ))}
                      {selectedItem.item.quantities.map((quantity) => (
                        <div>
                          <div>{quantity.quantity}</div>
                          <div>{quantity.price}</div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
                      <img
                        src={selectedItem?.item.imageUrl}
                        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                        alt=""
                      />

                      {/* name section */}
                      <div className="flex flex-col gap-2">
                        <p className="text-base text-gray-50">
                          {selectedItem?.item.name}
                        </p>
                        <p className="text-sm block text-gray-300 font-semibold">
                          Rs. {selectedItem?.item.price * selectedItem.quantity}
                        </p>
                      </div>

                      {/* button section */}
                      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          onClick={() => updateQty("remove")}
                        >
                          <BiMinus className="text-gray-50 bg-red-700 p-2 text-3xl rounded-md " />
                        </motion.div>

                        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                          {quantity}
                        </p>

                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          onClick={() => updateQty("add")}
                        >
                          <BiPlus className="text-gray-50 bg-red-700 p-2 text-3xl rounded-md " />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="w-full bg-gradient-to-r from-red-400 to-red-800 py-3 rounded-md hover:opacity-80 transition-all duration-300"
                  onClick={() => {
                    updateCartQty();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddToCartModal;
