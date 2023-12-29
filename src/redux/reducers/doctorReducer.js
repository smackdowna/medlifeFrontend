import { createReducer } from '@reduxjs/toolkit';

const createDoctorRequest = 'createDoctorRequest';
const createDoctorSuccess = 'createDoctorSuccess';
const createDoctorFail = 'createDoctorFail';

const allDoctorRequest = 'allDoctorRequest';
const allDoctorSuccess = 'allDoctorSuccess';
const allDoctorFail = 'allDoctorFail';

const allDoctorCountRequest = 'allDoctorCountRequest';
const allDoctorCountSuccess = 'allDoctorCountSuccess';
const allDoctorCountFail = 'allDoctorCountFail';

const allUserRequest = 'allUserRequest';
const allUserSuccess = 'allUserSuccess';
const allUserFail = 'allUserFail';


const allConnUserRequest = 'allConnUserRequest';
const allConnUserSuccess = 'allConnUserSuccess';
const allConnUserFail = 'allConnUserFail';


const allUserCountRequest = 'allUserCountRequest';
const allUserCountSuccess = 'allUserCountSuccess';
const allUserCountFail = 'allUserCountFail';

const allUserConnectedCountRequest = 'allUserConnectedCountRequest';
const allUserConnectedCountSuccess = 'allUserConnectedCountSuccess';
const allUserConnectedCountFail = 'allUserConnectedCountFail';

const allReviewRequest = 'allReviewRequest';
const allReviewSuccess = 'allReviewSuccess';
const allReviewFail = 'allReviewFail';

const allReviewCountRequest = 'allReviewCountRequest';
const allReviewCountSuccess = 'allReviewCountSuccess';
const allReviewCountFail = 'allReviewCountFail';

const doctorDetailsRequest = 'doctorDetailsRequest';
const doctorDetailsSuccess = 'doctorDetailsSuccess';
const doctorDetailsFail = 'doctorDetailsFail';


const UpdateDoctorDetailsRequest = 'UpdateDoctorDetailsRequest';
const UpdateDoctorDetailsSuccess = 'UpdateDoctorDetailsSuccess';
const UpdateDoctorDetailsFail = 'UpdateDoctorDetailsFail';


const clearError = 'clearError';
const clearMessage = 'clearMessage';

const updateUserRequest = 'updateUserRequest';
const updateUserSuccess = 'updateUserSuccess';
const updateUserFail = 'updateUserFail';

const deleteDoctorRequest = 'deleteDoctorRequest';
const deleteDoctorSuccess = 'deleteDoctorSuccess';
const deleteDoctorFail = 'deleteDoctorFail';

export const adminReducer = createReducer({}, builder => {
  builder
    .addCase(createDoctorRequest, state => {
      state.loading = true;
    })
    .addCase(createDoctorSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createDoctorFail, (state, action) => {
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

export const doctorReducer = createReducer({ doctors: [] }, builder => {
  builder
    .addCase(allDoctorRequest, state => {
      state.loading = true;
    })
    .addCase(allDoctorSuccess, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
    })
    .addCase(allDoctorFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const userReducer = createReducer({ users: [] }, builder => {
  builder
    .addCase(allUserRequest, state => {
      state.loading = true;
    })
    .addCase(allUserSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(allUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserRequest, state => {
      state.loading = true;
    })
    .addCase(updateUserSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const userConnReducer = createReducer({ users: [] }, builder => {
  builder
    .addCase(allConnUserRequest, state => {
      state.loading = true;
    })
    .addCase(allConnUserSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(allConnUserFail, (state, action) => {
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

export const reviewReducer = createReducer({ reviews: [] }, builder => {
  builder
    .addCase(allReviewRequest, state => {
      state.loading = true;
    })
    .addCase(allReviewSuccess, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    })
    .addCase(allReviewFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const doctorDeatilsReducer = createReducer({ doctor: [] }, builder => {
  builder
    .addCase(doctorDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(doctorDetailsSuccess, (state, action) => {
      state.loading = false;
      state.doctor = action.payload;
    })
    .addCase(doctorDetailsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const deleteDoctorReducer = createReducer({}, builder => {
  builder
    .addCase(deleteDoctorRequest, state => {
      state.loading = true;
    })
    .addCase(deleteDoctorSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteDoctorFail, (state, action) => {
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

export const userCountReducer = createReducer({}, builder => {
  builder
    .addCase(allUserCountRequest, state => {
      state.loading = true;
    })
    .addCase(allUserCountSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(allUserCountFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});


export const userConnectedCountReducer = createReducer({}, builder => {
  builder
    .addCase(allUserConnectedCountRequest, state => {
      state.loading = true;
    })
    .addCase(allUserConnectedCountSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(allUserConnectedCountFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});



export const reviewCountReducer = createReducer({}, builder => {
  builder
    .addCase(allReviewCountRequest, state => {
      state.loading = true;
    })
    .addCase(allReviewCountSuccess, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    })
    .addCase(allReviewCountFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const doctorCountReducer = createReducer({}, builder => {
  builder
    .addCase(allDoctorCountRequest, state => {
      state.loading = true;
    })
    .addCase(allDoctorCountSuccess, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
    })
    .addCase(allDoctorCountFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const updateDoctorReducer = createReducer({}, builder => {
  builder
    .addCase(UpdateDoctorDetailsRequest, state => {
      state.loading = true;
    })
    .addCase(UpdateDoctorDetailsSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(UpdateDoctorDetailsFail, (state, action) => {
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


// Create the updateUser reducer using the createReducer function
export const updateUserReducer = createReducer({}, builder => {
  builder
    .addCase('updateUserRequest', state => {
      state.loading = true;
    })
    .addCase('updateUserSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearError', state => {
      state.error = null;
    })
    .addCase('clearMessage', state => {
      state.message = null;
    });
});