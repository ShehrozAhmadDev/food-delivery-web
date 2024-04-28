import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import EmptyCart from "../../../../public/img/emptyCart.svg";
import { useAppSelector } from "@/redux/store";
import { setCart, setShowCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import CartItemComp from "../cartItemComp/CartItemComp";
import PlaceOrderModal from "@/components/modals/PlaceOrderModal/PlaceOrderModal";
import { useRouter } from "next/navigation";

const CartContainer = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartShow, items } = useAppSelector(
    (state) => state.cartReducer.value
  );
  const { user } = useAppSelector((state) => state.userReducer.value);
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch(setShowCart(!cartShow));
  };

  useEffect(() => {
    if (items && items.length > 0) {
      const totalPrice = items.reduce((accumulator, item) => {
        // Calculate the total price of the item including addons
        const itemPrice = (item.quantity || 0) * item.item.price;

        // Calculate the total price of addons
        const addonsPrice = item.addOns.reduce(
          (addonAccumulator, addon) =>
            addonAccumulator + (addon.quantity || 0) * addon.addOnId.price,
          0
        );

        // Add the total price of the item and addons to the accumulator
        return accumulator + itemPrice + addonsPrice;
      }, 0);
      setTot(totalPrice);
    } else {
      setTot(0); // Set total to 0 when there are no items in the cart
    }
  }, [items, flag]);

  const clearCart = () => {
    dispatch(setCart([]));
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-cartBg drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-red-600 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {items && items.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] justify-between flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-[650px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {items &&
              items.length > 0 &&
              items.map((item, inde) => (
                <CartItemComp flag={flag} setFlag={setFlag} item={item} />
              ))}
          </div>
          <div className="w-full py-3 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-1">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">Rs. {tot}</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                Rs. {tot }
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => {setIsOrderOpen(true);  } }
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => router.push("/login")}
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
      <>
        <PlaceOrderModal
          isOpen={isOrderOpen}
          closeModal={() => setIsOrderOpen(false)}
        />
      </>
    </motion.div>
  );
};

export default CartContainer;
