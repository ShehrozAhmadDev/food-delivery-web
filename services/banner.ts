import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export interface IBanner {
    _id?: string;
    imageUrl : string;
}
const Banner = {
  getAllBannerItems: async () => {
    return axios
      .get(
        `${baseUrl}/banner`,

     
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  addMenuItem: async (
    bannerItem: IBanner,
    token?: string
  ) => {
    return axios
      .post(
        `${baseUrl}/banner/`,
        bannerItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  updateBannerItem: async (
    bannerId: string,
    bannerItem: IBanner,
    token?: string
  ) => {
    return axios
      .put(
        `${baseUrl}/banner/${bannerId}`,
        bannerItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  deleteBannerItem: async (
    bannerId?: string,
    token?: string
  ) => {
    return axios
      .delete(
        `${baseUrl}/banner/${bannerId}`,
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

export default Banner;
