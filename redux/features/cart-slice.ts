import { ICartItem } from "@/components/sections/cart/cartItem/CartItem";
import { IMenu } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: cartState;
}



interface cartState {
  items: ICartItem[];
  cartShow: boolean
}

const initialState = {
  value: {
    items: [],
    cartShow: false
  } as cartState,
} as InitialState;

export const cartSlice = createSlice({
  name: "cartInfo",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.value.items = action.payload;
    },
    setShowCart: (state, action: PayloadAction<boolean>) => {
        state.value.cartShow = action.payload;
      },
  },
});

export const { setCart, setShowCart } = cartSlice.actions;

export default cartSlice.reducer;
