import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { IAddOnItem, ICartItem, IMenu, IOrders } from "@/types/type";
import { useAppSelector } from "@/redux/store";
import Orders from "@/services/orders";

interface MenuModalProps {
  loading?: boolean;
  isOpen: boolean;
  closeModal: () => void;
}

const initialOrderData = {
  phone: "",
  address: "",
  city: "",
};
function PlaceOrderModal({ loading, isOpen, closeModal }: MenuModalProps) {
  const { items } = useAppSelector((state) => state.cartReducer.value);
  const [orderData, setOrderData] = useState<IOrders>(initialOrderData);

  const handleFieldChange = (e: any) => {
    setOrderData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const calculateTotalPrice = (cartItems: ICartItem[]) => {
    return cartItems.reduce((accumulator, item) => {
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
  };
  const handleCreateNewOrder = async (e: any) => {
    try {
      e.preventDefault();
      const token = Cookie.get("token");
      const data = await Orders.createNewOrder(orderData, token);
      if (data.status === 200) {
        closeModal();
        toast.success("Order Created Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const menuItems = items.map((item) => {
      return {
        menuItemId: item.item._id,
        quantity: item.quantity,
        addOns: item.addOns.map((addon) => {
          return { addOnId: addon.addOnId._id, quantity: addon.quantity };
        }),
      };
    });
    setOrderData((prevData) => ({
      ...prevData,
      price: calculateTotalPrice(items),
      items: menuItems,
    }));
  }, [items]);
  console.log(orderData)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Menu"
      className="absolute z-10 top-1/2 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-black p-10 rounded-lg shadow-lg"
      overlayClassName="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="w-[375px] md:w-[600px]">
        {loading ? (
          <p className="text-white font-bold my-2">Loading....</p>
        ) : (
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar text-white px-5">
            <h1 className="mx-auto my-3 text-2xl text-center">
              Create New Order
            </h1>
            <form onSubmit={handleCreateNewOrder}>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Phone No.:</p>
                <input
                  placeholder="Phone No."
                  value={orderData.phone}
                  name="phone"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                  required
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Address:</p>
                <textarea
                  placeholder="Address"
                  value={orderData.address}
                  name="address"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                  required
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">City:</p>
                <input
                  placeholder="City"
                  value={orderData.city}
                  name="city"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                  required
                />
              </div>
              <div className="mb-6">
                <div className="max-w-2xl mx-auto mt-8 p-4">
                  <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                  {items.length > 0 ? (
                    <div>
                      {items.map((cartItem, index) => (
                        <div>
                          <div
                            key={index}
                            className="mb-4 p-4 bg-[#2f2f2f] rounded-md flex items-center"
                          >
                            <img
                              src={cartItem.item.imageUrl}
                              alt={cartItem.item.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">
                                {cartItem.item.name}
                              </h3>
                              <p className="text-gray-200">
                                {cartItem.item.description}
                              </p>
                              <p className="text-gray-200 mt-1">
                                Quantity: {cartItem.quantity} - Total: Rs.
                                {cartItem.item.price * cartItem.quantity}
                              </p>
                            </div>
                          </div>
                          <div>
                            {cartItem.addOns.map((addon, id) => (
                              <div
                                key={id}
                                className="mb-4 p-4 bg-[#2f2f2f] rounded-md flex items-center"
                              >
                                <img
                                  src={addon.addOnId.imageUrl}
                                  alt={addon.addOnId.name}
                                  className="w-6 h-6 object-cover rounded-md mr-4"
                                />
                                <div className="w-full justify-between flex">
                                  <div>
                                    <h3 className="text-lg font-semibold">
                                      {addon.addOnId.name}
                                    </h3>
                                    <p className="text-gray-200 mt-1">
                                      Quantity: {addon.quantity} - Total: Rs.
                                      {addon.addOnId.price * addon.quantity}
                                    </p>
                                  </div>
                                  <div className="bg-red-700 h-fit text-white text-sm p-1 rounded-lg">
                                    Addon
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <p className="text-lg font-semibold">
                          Total Price: Rs {calculateTotalPrice(items)}
                        </p>
                        {/* Add checkout or place order button here */}
                      </div>
                    </div>
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-yellow-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
              >
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default PlaceOrderModal;
