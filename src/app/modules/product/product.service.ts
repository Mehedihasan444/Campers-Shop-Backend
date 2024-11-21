import { QueryBuilder } from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
// get all Product from the database
const getAllProducts = async (query: Record<string, unknown>) => {
  // Create a new QueryBuilder instance for the product query
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .sort()
    .fields()
    .filter()
    .paginate();

  // Execute the query to get the paginated results
  const result = await productQuery.modelQuery;

  // Create a separate query to count the total number of products matching the filter criteria
  const countQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter();

  // Execute the count query to get the total count
  const totalCount = await countQuery.modelQuery.countDocuments();

  // Return both the paginated results and the total count
  return {
    totalCount,
    products: result,
  };
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
