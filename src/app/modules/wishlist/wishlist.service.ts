import { Wishlist } from "./wishlist.model";

const createWishlistProduct = async (payload:string) => {
  const result = (await Wishlist.create(payload)).populate('product');
  return result;
};

const getWishlistProducts = async () => {
  const result = await Wishlist.find();

  return result;
};
const deleteWishlistProduct = async (id: string) => {
    const result = await Wishlist.findByIdAndDelete(id);
    return result;
  }
export const WishlistServices = {
    createWishlistProduct,
    getWishlistProducts,
    deleteWishlistProduct
};
