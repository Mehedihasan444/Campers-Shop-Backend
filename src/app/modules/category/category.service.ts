import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: TCategory) => {
  const result = (await Category.create(payload)).populate("productId");
  return result;
};

const getAllCategory = async (payload: Record<string, unknown>) => {
  const result = await Category.find({ productId: payload.id });
  return result;
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
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a Category from the database
const deleteACategory = async (id: string) => {
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
