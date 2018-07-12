import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../utils/is-empty';

const initialState = {
  isAuth: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.data),
        user: action.data
      };
    default:
      return state;
  }
}
