import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TStore } from "./store.interface";
import { Store } from "./store.model";

const createStore = async (payload: TStore) => {
  const store = await Store.create(payload);

  return store;
};
const updateStore = async (storeId: string, payload: Partial<TStore>) => {
  const isStoreExist = await Store.findById(storeId);
  if (!isStoreExist) {
    throw new Error("Store not found");
  }
  const store = await Store.findByIdAndUpdate(storeId, payload, { new: true });

  return store;
};

const getStoresFromDB = async (query: Record<string, unknown>) => {
  const storeQuery = new QueryBuilder(Store.find(), query)
    .search(["name"])
    .sort()
    .fields()
    .filter()
    .paginate();
  storeQuery.modelQuery.populate("owner");
  const result = await storeQuery.modelQuery;
  const countQuery = new QueryBuilder(Store.find(), query)
    .search(["name"])
    .filter();
  const totalCount = await countQuery.modelQuery.countDocuments();
  return { totalCount, stores: result };
};
const getStoreFromDB = async (storeId: string) => {
  const store = await Store.findById(storeId).populate("owner");

  return store;
};

const deleteStoreFromDB = async (storeId: string) => {
  const isExist = await Store.findById(storeId);
  if (!isExist) {
    return new AppError(httpStatus.NOT_FOUND, "Store not found!");
  }
  const store = await Store.findByIdAndDelete(storeId);

  return store;
};
export const storeServices = {
  createStore,
  updateStore,
  getStoreFromDB,
  getStoresFromDB,
  deleteStoreFromDB,
};
