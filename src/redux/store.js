import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, deleteDoctorReducer, doctorCountReducer, doctorDeatilsReducer, doctorReducer, reviewCountReducer, reviewReducer, updateDoctorReducer, updateUserReducer, userConnReducer, userConnectedCountReducer, userCountReducer, userReducer } from './reducers/doctorReducer';
import { loginReducer } from './reducers/userReducer';


export const server = 'http://localhost:5000/api/v1';
//https://medlife-backen.vercel.app/api/v1

const store = configureStore({
  reducer: {
    admin:adminReducer,
    doctors:doctorReducer,
    users:userReducer,
    conn:userConnReducer,
    reviews:reviewReducer,
    doctor:doctorDeatilsReducer,
    delete:deleteDoctorReducer,
    doctorsCount:doctorCountReducer,
    userCount:userCountReducer,
    userConnectedCount:userConnectedCountReducer,
    reviewCount:reviewCountReducer,
    update:updateDoctorReducer,
    updateUser:updateUserReducer,
    login:loginReducer,
  }
});

export default store;
