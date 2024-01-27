import { server } from '../store';
import axios from 'axios';

export const createDoctor = formData => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };

  try {
    dispatch({ type: 'createDoctorRequest' });

    const { data } = await axios.post(
      `${server}/createdoctor`,
      formData,
      config
    );
    dispatch({ type: 'createDoctorSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating doctor:', error.response.data.message);
    dispatch({
      type: 'createDoctorFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllDoctors = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allDoctorRequest' });
    const { data } = await axios.get(`${server}/doctors`, config);

    dispatch({ type: 'allDoctorSuccess', payload: data.doctors });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: 'allDoctorFail',
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: 'allDoctorFail',
        payload: 'An unexpected error occurred.',
      });
    }
  }
};

export const getDoctorsCount = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allDoctorCountRequest' });
    const { data } = await axios.get(`${server}/doctors`, config);

    dispatch({ type: 'allDoctorCountSuccess', payload: data.counts });
  } catch (error) {
    dispatch({
      type: 'allDoctorCountFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allUserRequest' });
    const { data } = await axios.get(`${server}/activeleads`, config);

    dispatch({ type: 'allUserSuccess', payload: data.leads });
  } catch (error) {
    dispatch({
      type: 'allUserFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllConnUsers = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allConnUserRequest' });
    const { data } = await axios.get(`${server}/connectedleads`, config);

    dispatch({ type: 'allConnUserSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'allConnUserFail',
      payload: error.response.data.message,
    });
  }
};

export const getUsersCount = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allUserCountRequest' });
    const { data } = await axios.get(`${server}/activeleads`, config);

    dispatch({ type: 'allUserCountSuccess', payload: data.counts });
  } catch (error) {
    dispatch({
      type: 'allUserCountFail',
      payload: error.response.data.message,
    });
  }
};

export const getUsersConnectedCount = () => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'allUserConnectedCountRequest' });
    const { data } = await axios.get(`${server}/connectedleads`, config);

    dispatch({ type: 'allUserConnectedCountSuccess', payload: data.counts });
  } catch (error) {
    dispatch({
      type: 'allUserConnectedCountFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllReviews = () => async dispatch => {
  try {
    dispatch({ type: 'allReviewRequest' });
    const { data } = await axios.get(`${server}/reviews`);

    dispatch({ type: 'allReviewSuccess', payload: data.review });
  } catch (error) {
    dispatch({
      type: 'allReviewFail',
      payload: error.response.data.message,
    });
  }
};

export const getReviewsCount = () => async dispatch => {
  try {
    dispatch({ type: 'allReviewCountRequest' });
    const { data } = await axios.get(`${server}/reviews`);

    dispatch({ type: 'allReviewCountSuccess', payload: data.counts });
  } catch (error) {
    dispatch({
      type: 'allReviewCountFail',
      payload: error.response.data.message,
    });
  }
};

export const getDoctorDetails = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'doctorDetailsRequest' });

    const { data } = await axios.get(`${server}/doctor/${id}`, config);

    dispatch({
      type: 'doctorDetailsSuccess',
      payload: data.doctor,
    });
  } catch (error) {
    dispatch({
      type: 'doctorDetailsFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteDoctor = id => async dispatch => {
  const config = {
    withCredentials: true,
  };
  try {
    dispatch({ type: 'deleteDoctorRequest' });

    const { data } = await axios.delete(`${server}/doctor/${id}`, config);
    dispatch({ type: 'deleteDoctorSuccess', payload: data.message });
  } catch (error) {
    console.error('Error creating doctor:', error.response.data.message);
    dispatch({
      type: 'deleteDoctorFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (id) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  };

  try {
    dispatch({ type: 'updateUserRequest' });
    const { data } = await axios.put(`${server}/lead/${id}`, config);

    dispatch({ type: 'updateUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserFail',
      payload: error.response.data.message,
    });
  }
};

export const updateDoctor = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: 'UpdateDoctorDetailsRequest' });
    const { data } = await axios.put(
      `${server}/doctor/${id}`,
      formData,
      config
    );
    dispatch({ type: 'UpdateDoctorDetailsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'UpdateDoctorDetailsFail',
      payload: error.response.data.message,
    });
  }
};
