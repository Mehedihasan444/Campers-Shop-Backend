import { QueryBuilder } from "../../builder/QueryBuilder";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
// get all Product from the database
const getAllProducts = async (payload: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find({}), payload)
    .filter()
    .search(["name", "description"])
    .paginate()
    .sort();

  const result = await productQuery.modelQuery;
  return result;
};

// get a single Product from the database
const getAProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// update a Product with a new value
const updateAProduct = async (
  id: string,
  updateData: Record<string, unknown>
) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a Product from the database
const deleteAProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const ProductServices = {
  createProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
