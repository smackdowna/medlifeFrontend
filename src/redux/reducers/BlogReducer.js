import { createReducer } from '@reduxjs/toolkit';

const createBlogRequest = 'createBlogRequest';
const createBlogSuccess = 'createBlogSuccess';
const createBlogFail = 'createBlogFail';

const allBlogRequest = 'allBlogRequest';
const allBlogSuccess = 'allBlogSuccess';
const allBlogFail = 'allBlogFail';

const blogDetailRequest = 'blogDetailRequest';
const blogDetailSuccess = 'blogDetailSuccess';
const blogDetailFail = 'blogDetailFail';

const UpdateblogDetailRequest = 'UpdateblogDetailRequest';
const UpdateblogDetailSuccess = 'UpdateblogDetailSuccess';
const UpdateblogDetailFail = 'UpdateblogDetailFail';

const deleteBlogRequest = 'deleteBlogRequest';
const deleteBlogSuccess = 'deleteBlogSuccess';
const deleteBlogFail = 'deleteBlogFail';

const clearError = 'clearError';
const clearMessage = 'clearMessage';

//create
export const blogReducer = createReducer({}, builder => {
  builder
    .addCase(createBlogRequest, state => {
      state.loading = true;
    })
    .addCase(createBlogSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createBlogFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});

//get
export const getBlogReducer = createReducer({ blogs: [] }, builder => {
  builder
    .addCase(allBlogRequest, state => {
      state.loading = true;
    })
    .addCase(allBlogSuccess, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    })
    .addCase(allBlogFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

//details
export const blogDeatilsReducer = createReducer({ blog:{}}, builder => {
  builder
    .addCase(blogDetailRequest, state => {
      state.loading = true;
    })
    .addCase(blogDetailSuccess, (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    })
    .addCase(blogDetailFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

//delete
export const deleteBlogReducer = createReducer({}, builder => {
  builder
    .addCase(deleteBlogRequest, state => {
      state.loading = true;
    })
    .addCase(deleteBlogSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteBlogFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});

//update blog
export const updateBlogReducer = createReducer({}, builder => {
  builder
    .addCase(UpdateblogDetailRequest, state => {
      state.loading = true;
    })
    .addCase(UpdateblogDetailSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(UpdateblogDetailFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});
