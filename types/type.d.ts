import { userI } from "@/redux/features/user-slice";

export interface IMessage {
  senderId: string | null;
  text: string;
  conversationId: string | null;
}

export interface ICartItem {
  item: IMenu;
  quantity: number;
}

export interface IOrders {
  _id?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  address: string;
  status?: string;
  phone: string;
  city: string;
  item?: {
    menuItem: IMenu;
    quantity: number;
    addOns: { addOnId: IAddOnItem; quantity: number }[];
  }[];
  createdBy?: IUser;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IAddOnItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdBy: string | userI;
  imageUrl?: string;
}

export interface IMenu {
  _id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt?: Date | string;
  category: string;
  isFeatured: boolean;
  sizes: { size: string; price: number }[];
  quantities: { quantity: number; price: number }[];
  flavours: string[];
  quantity: number;
  price: number;
}
