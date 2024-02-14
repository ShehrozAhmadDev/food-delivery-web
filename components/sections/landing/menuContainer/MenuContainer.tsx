import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import RowContainer from "../rowContainer/RowContainer";
import { setProductsByCategory } from "@/redux/features/menu-slice";
import { useDispatch } from "react-redux";
import { IMenu } from "@/types/type";

interface IMenuContainer {
  categories: string[];
  menuData: IMenu[];
}

const MenuContainer = ({ categories, menuData }: IMenuContainer) => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProductsByCategory(filter));
  }, [filter]);

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category}
                className={`group ${
                  filter === category ? "bg-orange-400" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-orange-400 `}
                onClick={() => {
                  setFilter(category);
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category ? "bg-white" : "bg-orange-400"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category ? "text-orange-300" : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category ? "text-white" : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer flag={false} data={menuData} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
