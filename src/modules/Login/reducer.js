import {
  USER_SIGNIN_START,
  USER_SIGNIN_FAIL,
  USER_AUTHENTICATED,
} from './consts';

const INITIAL_STATE = {
  user: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_START:
      return { ...state, user: null, loading: true };
    
    case USER_SIGNIN_FAIL:
      return { ...state, user: null, loading: false };

    case USER_AUTHENTICATED:
      return { ...state, user: action.payload, loading: false };

    default:
      return { ...state };
  }
}