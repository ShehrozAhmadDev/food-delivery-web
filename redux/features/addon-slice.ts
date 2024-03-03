import { initialMenuItems } from "@/constants/data";
import { IAddOnItem,  IMenu } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: addonState;
}

interface addonState {
  addons: IAddOnItem[];
}

const initialState = {
  value: {
    addons: [],
  } as addonState,
} as InitialState;

export const addonSlice = createSlice({
  name: "addonInfo",
  initialState,
  reducers: {
    setAddon: (state, action: PayloadAction<IAddOnItem[] >) => {
      state.value.addons = action.payload;
    },
  },
});

export const { setAddon } = addonSlice.actions;

export default addonSlice.reducer;
