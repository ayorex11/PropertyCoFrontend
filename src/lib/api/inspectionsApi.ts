import { inspectionPayload } from '@/schemas/schema';
import { Inspection } from '../types';
import api from './axiosInstance';
import { toFormData } from '@/utils/formData';

export const fetchInspectionsApi = async (): Promise<Inspection[]> => {
  const res = await api.get('BookInspection/GetAllInspections/');
  return res.data.data;
};

export const fetchSingleInspectionApi = async (id: string): Promise<Inspection> => {
  const res = await api.get(`BookInspection/GetInspection/${id}/`);
  return res.data.data;
};

export const createInspectionsApi = async (data: inspectionPayload) => {
  const formData = toFormData(data);
  const res = await api.post('BookInspection/BookInspection/', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};