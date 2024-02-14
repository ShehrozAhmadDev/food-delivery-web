import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Menu = {
  getAllMenuItems: async () => {
    return axios
      .get(
        `${baseUrl}/menu`,

      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  
};

export default Menu;
