import apiClient from '../axios.config';

export const registerUser = async signUpData => {
  try {
    const data = await apiClient({
      method: 'post',
      url: 'auth/register',
      data: signUpData,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const loginUser = async logInData => {
  try {
    const data = await apiClient({
      method: 'post',
      url: 'auth/login',
      data: logInData,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
