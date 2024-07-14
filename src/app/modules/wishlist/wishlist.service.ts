import { Wishlist } from "./wishlist.model";

const createWishlistProduct = async (payload:{product:string}) => {
  const isExist = await Wishlist.findOne({product:payload.product});
  if (isExist) {
    return {
      status: 200,
      message: 'Product already exists in the wishlist',
      data: isExist
    };
  }
  const result = (await Wishlist.create(payload)).populate("product");
  return result;
};

const getWishlistProducts = async () => {
  const result = await Wishlist.find().populate("product");

  return result;
};
const deleteWishlistProduct = async (id: string) => {
    const result = await Wishlist.findByIdAndDelete(id).populate("product");
    return result;
  }
export const WishlistServices = {
    createWishlistProduct,
    getWishlistProducts,
    deleteWishlistProduct
};
