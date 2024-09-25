import apiClient, { notifyOnSuccess, notifyOnFail } from '../axios.config';

export const registerUser = async signUpData => {
  try {
    const res = await apiClient({
      method: 'post',
      url: 'auth/register',
      data: signUpData,
    });
    if (res.status === 201) {
      notifyOnSuccess(res.data.message);
    }
    return res;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Error reaching the server');
    notifyOnFail(error.response.data.message);
    console.log(error);
    return error.response;
  }
};

export const loginUser = async logInData => {
  try {
    const res = await apiClient({
      method: 'post',
      url: 'auth/login',
      data: logInData,
    });
    if (res.status === 202) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('username', res.data.username);
      notifyOnSuccess(res.data.message);
    }
    return res;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Error reaching the server');
    notifyOnFail(error.response.data.message);
    return error.response;
  }
};
