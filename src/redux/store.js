import { configureStore } from '@reduxjs/toolkit';
import {
  adminReducer,
  deleteDoctorReducer,
  doctorCountReducer,
  doctorDeatilsReducer,
  doctorReducer,
  reviewCountReducer,
  reviewReducer,
  updateDoctorReducer,
  updateUserReducer,
  userConnReducer,
  userConnectedCountReducer,
  userCountReducer,
  userReducer,
} from './reducers/doctorReducer';
import { loginReducer } from './reducers/userReducer';
import {
  blogDeatilsReducer,
  blogReducer,
  deleteBlogReducer,
  getBlogReducer,
  updateBlogReducer,
} from './reducers/BlogReducer';

export const server = 'https://medlife-backen.vercel.app/api/v1';
//

const store = configureStore({
  reducer: {
    admin: adminReducer,
    doctors: doctorReducer,
    users: userReducer,
    conn: userConnReducer,
    reviews: reviewReducer,
    doctor: doctorDeatilsReducer,
    delete: deleteDoctorReducer,
    doctorsCount: doctorCountReducer,
    userCount: userCountReducer,
    userConnectedCount: userConnectedCountReducer,
    reviewCount: reviewCountReducer,
    update: updateDoctorReducer,
    updateUser: updateUserReducer,
    login: loginReducer,
    blog: blogReducer,
    getBlog: getBlogReducer,
    getSingleBlog: blogDeatilsReducer,
    deleteBlog: deleteBlogReducer,
    updateBlog: updateBlogReducer,
  },
});

export default store;
