import { SavedProperty } from "../types";
import api from "./axiosInstance";

export const fetchSavedPropertiesApi = async (): Promise<SavedProperty[]> => {
  const res = await api.get("Favorites/get-favorites/");
  return res.data.data;
};

export const createSavedPropertyApi = async (prop: number): Promise<SavedProperty> => {
  const res = await api.post(`Favorites/favorite/create/`, {prop});
  return res.data.data;
};

export const deleteSavedPropertyApi = async (
  id: string
) => {
  const res = await api.delete(`Favorites/delete/${id}/`);
  return res.data.data;
};
