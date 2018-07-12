import { instance as axios } from '../utils/axiosConf';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import { setAuthHeader } from '../utils/setAuthHeader';
import jwt_decode from 'jwt-decode';

//Login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/login', {
      username: userData.id,
      password: userData.password
    })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jtoken', token);
      setAuthHeader(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push('/admin');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        data: err.response
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    data: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jtoken');
  setAuthHeader(false);
  dispatch(setCurrentUser({}));
};
