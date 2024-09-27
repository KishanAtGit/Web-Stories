import apiClient, { notifyOnSuccess, notifyOnFail } from '../axios.config';

export const getStoriesAPI = async () => {
  try {
    const response = await apiClient.get('story/getAllStories');
    return response;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Server Error');
    return error.response;
  }
};

export const getYourStoriesAPI = async () => {
  const userId = localStorage.getItem('userId'); // get userId from localStorage with each request to avoid a null request call

  try {
    const response = await apiClient.get(`story/getYourStories/${userId}`);
    return response;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Server Error');
    return error.response;
  }
};

export const createStoryAPI = async storyData => {
  const userId = localStorage.getItem('userId');
  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  try {
    const response = await apiClient.post('story/create', {
      ...storyData,
      createdBy: userId,
      createdOn: formatDate(new Date()),
    });
    if (response.status === 201) {
      notifyOnSuccess(response.data.message);
    }
    return response;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Error reaching the server');
    notifyOnFail('Error in creating the story. Please try again.');
    return error.response;
  }
};
