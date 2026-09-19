import { BlogFormPayload } from "@/schemas/schema";
import { Blog } from "../types";
import api from "./axiosInstance";
import { toFormData } from "@/utils/formData";

export const fetchBlogsApi = async (): Promise<Blog[]> => {
  const res = await api.get("blog/blog_list/");
  return res.data.data;
};

export const fetchDraftsApi = async (): Promise<Blog[]> => {
  const res = await api.get("blog/draft_list/");
  return res.data.data;
};

export const fetchSingleBlogApi = async (id: string): Promise<Blog> => {
  const res = await api.get(`blog/read_blog/${id}/`);
  return res.data.data;
};

export const makeDraftApi = async (id: string | number) => {
  const res = await api.post(`blog/place_in_drafts/${id}/`);
  return res.data.data;
};

export const makeLiveApi = async (id: string | number) => {
  const res = await api.post(`blog/remove_from_drafts/${id}/`);
  return res.data.data;
};

export const postBlogApi = async (data: BlogFormPayload) => {
  const formData = toFormData(data);
  const res = await api.post(`blog/post_blog/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const postDraftApi = async (data: BlogFormPayload) => {
  const formData = toFormData(data);
  const res = await api.post(`blog/post_blog_draft/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateBlogApi = async (
  id: string | number,
  data: BlogFormPayload
) => {
  const formData = toFormData(data);
  const res = await api.patch(`blog/update_blog/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteBlogApi = async (id: string | number) => {
  const res = await api.delete(`blog/delete/${id}/`);
  return res.data.data;
};