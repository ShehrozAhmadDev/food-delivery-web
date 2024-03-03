import { ICartItem } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: cartState;
}



interface cartState {
  items: ICartItem[];
  cartShow: boolean;
  selectedItem: ICartItem | null;
}

const initialState = {
  value: {
    items: [],
    cartShow: false,
    selectedItem: null
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
      setSelectedCartItem :(state, action: PayloadAction<ICartItem>) => {
        state.value.selectedItem = action.payload;
      },
  },
});

export const { setCart, setShowCart,setSelectedCartItem } = cartSlice.actions;

export default cartSlice.reducer;
