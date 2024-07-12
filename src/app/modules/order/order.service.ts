import { Order } from "./order.model";

const createOrder = async (payload:string) => {
    const result = (await Order.create(payload)).populate("product");
    return result;
  };
  export const OrderServices = {
    createOrder,
   
};
