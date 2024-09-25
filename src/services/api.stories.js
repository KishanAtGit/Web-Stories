import apiClient, { notifyOnSuccess, notifyOnFail } from '../axios.config';

const userId = localStorage.getItem('userId');

export const createStoryAPI = async storyData => {
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
