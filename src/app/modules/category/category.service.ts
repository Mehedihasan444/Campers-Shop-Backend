import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async (query: Record<string, unknown>) => {
  // Create a new QueryBuilder instance for the product query
  const productQuery = new QueryBuilder(Category.find(), query)
    .search(["name"])
    .sort()
    .fields()
    .filter()
    .paginate();

  // Execute the query to get the paginated results
  const result = await productQuery.modelQuery;

  // Create a separate query to count the total number of products matching the filter criteria
  const countQuery = new QueryBuilder(Category.find(), query)
    .search(["name"])
    .filter();

  // Execute the count query to get the total count
  const totalCount = await countQuery.modelQuery.countDocuments();

  return { totalCount, categories: result };
};

// get a single Category from the database
const getACategory = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

// update a Category with a new value
const updateACategory = async (
  id: string,
  updateData: Record<string, unknown>
) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    return new AppError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a Category from the database
const deleteACategory = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    return new AppError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const result = await Category.findByIdAndDelete(id);
  return result;
};
export const CategoryServices = {
  createCategory,
  getAllCategory,
  getACategory,
  updateACategory,
  deleteACategory,
};
