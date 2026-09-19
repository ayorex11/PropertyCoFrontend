import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBlogsApi, fetchDraftsApi, fetchSingleBlogApi } from '../../api/blogsApi';
import { Blog } from '@/lib/types';

interface BlogState {
  blogs: {
    data: Blog[];
    loading: boolean;
    error: string | null;
  };
  drafts: {
    data: Blog[];
    loading: boolean;
    error: string | null;
  };
  blogDetail: {
    data: Blog | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: BlogState = {
  blogs: {
    data: [],
    loading: false,
    error: null,
  },
  drafts: {
    data: [],
    loading: false,
    error: null,
  },
  blogDetail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchBlogs = createAsyncThunk<Blog[]>(
  'blogs/fetchBlogs',
  async () => await fetchBlogsApi()
);

export const fetchDrafts = createAsyncThunk<Blog[]>(
  'blogs/fetchDrafts',
  async () => await fetchDraftsApi()
);

export const fetchBlogById = createAsyncThunk<Blog, string>(
  'blog/fetchById',
  async (id) => await fetchSingleBlogApi(id)
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.blogs.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs.loading = false;
        state.blogs.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogs.loading = false;
        state.blogs.error = action.error.message || 'Something went wrong';
      })

      // Fetch Drafts
      .addCase(fetchDrafts.pending, (state) => {
        state.drafts.loading = true;
      })
      .addCase(fetchDrafts.fulfilled, (state, action) => {
        state.drafts.loading = false;
        state.drafts.data = action.payload;
      })
      .addCase(fetchDrafts.rejected, (state, action) => {
        state.drafts.loading = false;
        state.drafts.error = action.error.message || 'Something went wrong';
      })

      // Fetch Blog Details BY ID
      .addCase(fetchBlogById.pending, (state) => {
        state.blogDetail.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.blogDetail.loading = false;
        state.blogDetail.data = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.blogDetail.loading = false;
        state.blogDetail.error = action.error.message || 'Something went wrong';
      });
  },
});

export default blogsSlice.reducer;