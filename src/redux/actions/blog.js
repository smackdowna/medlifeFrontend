import { server } from '../store';
import axios from 'axios';

export const createBlog = formData => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };

  try {
    dispatch({ type: 'createBlogRequest' });

    const { data } = await axios.post(
      `${server}/createblog`,
      formData,
      config
    );
    dispatch({ type: 'createBlogSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating blog:', error.response.data.message);
    dispatch({
      type: 'createBlogFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllBlog = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allBlogRequest' });
    const { data } = await axios.get(`${server}/blogs`, config);

    dispatch({ type: 'allBlogSuccess', payload: data.blogs });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allBlogFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allBlogFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};












export const getBlogDetails = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'blogDetailRequest' });

    const { data } = await axios.get(`${server}/blog/${id}`, config);

    dispatch({
      type: 'blogDetailSuccess',
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: 'blogDetailsFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteBlog = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'deleteBlogRequest' });

    const { data } = await axios.delete(`${server}/blog/${id}`, config);
    dispatch({ type: 'deleteBlogSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating blog:', error.response.data.message);
    dispatch({
      type: 'deleteBlogFail',
      payload: error.response.data.message,
    });
  }
};


export const updateblog = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: 'UpdateblogDetailRequest' });
    const { data } = await axios.put(
      `${server}/blog/${id}`,
      formData,
      config
    );
    dispatch({ type: 'UpdateblogDetailSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'UpdateblogDetailFail',
      payload: error.response.data.message,
    });
  }
};
