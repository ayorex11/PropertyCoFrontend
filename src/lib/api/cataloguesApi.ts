import { Property } from '../types';
import api from './axiosInstance';

//Admin
export const fetchCataloguesApi = async (): Promise<Property[]> => {
  const res = await api.get('catalogue/my-catalogue/');
  return res.data.data;
};

export const repostAdminCatalogueApi = async (id: string): Promise<Property> => {
  const res = await api.post(`catalogue/repost/${id}/`);
  return res.data.data;
};

export const deleteAdminCatalogueApi = async (id: string): Promise<Property> => {
  const res = await api.delete(`catalogue/remove/${id}/`);
  return res.data.data;
};

export const underContractAdminCatalogueApi = async (id: string): Promise<Property> => {
  const res = await api.post(`catalogue/under-contract/${id}/`);
  return res.data.data;
};

//Agent
export const fetchUnapprovedCataloguesApi = async (): Promise<Property[]> => {
  const res = await api.get('catalogue/view_unapproved_catalogue/');
  return res.data.data;
};

export const fetchDisapprovedCataloguesApi = async (): Promise<Property[]> => {
  const res = await api.get('catalogue/view_disapproved_catalogue/');
  return res.data.data;
};