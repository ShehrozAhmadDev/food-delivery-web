import { initialMenuItems } from "@/constants/data";
import { IMenu } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: menuState;
}



interface menuState {
  menu: IMenu[];
  categories: string[];
  filteredMenu: IMenu[];
  featuredMenu: IMenu[];
}

const initialState = {
  value: {
    menu: [],
    categories: [], 
    filteredMenu: [],
    featuredMenu: [],

  } as menuState,
} as InitialState;

export const menuSlice = createSlice({
  name: "menuInfo",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<IMenu[] >) => {
      state.value.menu = action.payload;
      const allCategories = Array.from(
        new Set(action.payload.map((item) => item.category))
      );
      state.value.categories = allCategories;
      state.value.filteredMenu = action.payload;
      const filteredMenu = action.payload.filter((menu)=> menu.isFeatured===true)
      state.value.featuredMenu = filteredMenu

    },
    setProductsByCategory: (state, action: PayloadAction<string>) => {
      const selectedCategory = action.payload;
      if(selectedCategory){
        const filteredProducts = state.value.menu.filter(
          (product) => product.category === selectedCategory
        );
        state.value.filteredMenu = filteredProducts;
      }
      else{
        state.value.filteredMenu = state.value.menu
      }
    },

  },
});

export const { setMenu, setProductsByCategory } = menuSlice.actions;

export default menuSlice.reducer;
