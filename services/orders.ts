import { IOrders } from "@/types/type";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Orders = {
  getAllOrders: async (token: string | undefined) => {
    return axios
      .get(
        `${baseUrl}/order`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  createNewOrder: async (
    order:IOrders,
    token?: string
  ) => {
    return axios
      .post(
        `${baseUrl}/order`,
          order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
};

export default Orders;
