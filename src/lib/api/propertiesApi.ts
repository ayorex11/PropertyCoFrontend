import { toFormData } from '@/utils/formData';
import { Property } from '../types';
import api from './axiosInstance';
import { PropertyFormPayload, RequestPropFormPayload } from '@/schemas/schema';

export const fetchPropertiesApi = async (): Promise<Property[]> => {
  const res = await api.get('properties/properties/');
  return res.data.data;
};

export const fetchSinglePropertyApi = async (id: string): Promise<Property> => {
  const res = await api.get(`properties/get_property/${id}/`);
  return res.data.data;
};

export const fetchFeaturedPropertiesApi = async (): Promise<Property[]> => {
  const res = await api.get('properties/featured/');
  return res.data.data;
};

export const fetchUnapprovedPropertiesApi = async (): Promise<Property[]> => {
  const res = await api.get('properties/get_unapproved_properties/');
  return res.data.data;
};

export const approvePropertyApi = async (id: string): Promise<Property> => {
  const res = await api.post(`properties/ApproveProperty/${id}/`);
  return res.data.data;
};

export const disapprovePropertyApi = async (id: string, reason: string): Promise<Property> => {
  const res = await api.post(`properties/DisapproveProperty/${id}/${reason}/`, {id, reason});
  return res.data.data;
};

export const addFeaturedPropertiesApi = async (id: string): Promise<Property> => {
  const res = await api.post(`properties/make-featured/${id}/`);
  return res.data.data;
};

export const removeFeaturedPropertiesApi = async (id: string): Promise<Property> => {
  const res = await api.post(`properties/RemoveFeatured/${id}/`);
  return res.data.data;
}

export const postPropertyApi = async (data: PropertyFormPayload) => {
  const formData = toFormData(data);
  const res = await api.post(`properties/post-property/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updatePropertyApi = async (
  id: string | number,
  data: PropertyFormPayload
) => {
  const formData = toFormData(data);
  const res = await api.patch(`catalogue/edit-property/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const reqPropertyApi = async (data: RequestPropFormPayload) => {
  const res = await api.post(`requestprop/request/`, data);
  return res.data.data;
};