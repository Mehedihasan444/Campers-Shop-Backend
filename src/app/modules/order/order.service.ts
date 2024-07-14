import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (payload:TOrder) => {
  // Create the order and populate the product field
  // const result = await Order.create(payload);
  const result = (await Order.create(payload)).populate("items.id");

 // Extract product IDs and quantities from the order items
 const productsId = payload.items?.map(item => item.id);
 const quantities = payload.items?.map(item => item.purchasedQuantity);

 // Update product quantities
 for (let i = 0; i < productsId.length; i++) {
   const productId = productsId[i];
   const quantity = quantities[i];

   await Product.findByIdAndUpdate(productId, {
     $inc: { quantity: -quantity }
   });
 }

 return result;
  };
  export const OrderServices = {
    createOrder,
   
};
