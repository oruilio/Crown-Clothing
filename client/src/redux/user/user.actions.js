import UserActionTypes from './user.types';

//Sign-In
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
  });
  
export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});
  
export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

//Sign-Out
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
  });
  
export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

//Sign-Up
export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({user, addtionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, addtionalData}
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

//Check User
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})