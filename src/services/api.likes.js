import apiClient, { notifyOnSuccess, notifyOnFail } from '../axios.config';

export const checkLikesAPI = async slideId => {
  const userId = localStorage.getItem('userId');

  try {
    const response = await apiClient.get(`likes/checkLiked`, {
      params: {
        createdBy: userId,
        slideId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateLikesAPI = async (storyId, slideId) => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await apiClient.post('likes/updateLike', {
      storyId,
      slideId,
      createdBy: userId,
    });
    return response;
  } catch (error) {
    if (error.status === 404) notifyOnFail('Error reaching the server');
    notifyOnFail('Error in creating the story. Please try again.');
    return error.response;
  }
};
