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

const getStoresFromDB = async () => {
  const store = await Store.find().populate('owner');

  return store;
}
const getStoreFromDB = async (storeId: string) => {
  const store = await Store.findById(storeId).populate('owner');

  return store;
}

const deleteStoreFromDB = async (storeId: string) => {
  const store = await Store.findByIdAndDelete(storeId);

  return store;
}
export const storeServices = {
  createStore,
  updateStore,
  getStoreFromDB,
  getStoresFromDB,
  deleteStoreFromDB
};
