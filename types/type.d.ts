import { userI } from "@/redux/features/user-slice";

export interface IMessage {
    senderId: string | null;
    text: string;
    conversationId: string | null;
}

export interface ICartItem {
    item: IMenu,
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
    item?: {menuItem: IMenu, quantity: number, addOns: IAddOnItem[]}[]
    createdBy?: IUser;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
  

  export interface IAddOnItem {
    _id: string;
    name: string,
    description: string,
    category: string,
    price: number,
    createdBy: string | userI,
  }

  export interface IMenu {
    _id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    isFeatured: boolean;
    createdAt?: Date | string;
    quantity: number;
    imageUrl?: string;
}