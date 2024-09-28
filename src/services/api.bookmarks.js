import apiClient, { notifyOnSuccess, notifyOnFail } from '../axios.config';

export const getYourBookmarksAPI = async () => {
  const userId = localStorage.getItem('userId'); // get userId from localStorage with each request to avoid a null request call`

  try {
    const response = await apiClient.get(`bookmark/getYourBookmarks/${userId}`);
    return response.data;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Server Error');
    return error.response;
  }
};

export const createBookmarkAPI = async bookmarksData => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await apiClient.post('bookmark/updateBookmark', {
      bookmarksData,
      createdBy: userId,
    });
    // if (response.status === 201) {
    //   notifyOnSuccess(response.data.message);
    // }
    return response;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Error reaching the server');
    notifyOnFail('Error in creating the story. Please try again.');
    return error.response;
  }
};
