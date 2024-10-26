// api.js

import axios from 'axios';

// Example GET request
export const getUserImages = (userId) => {
  return axios.get(`https://cohesive-vine-437901-v1.uc.r.appspot.com/get_images?user_id=${userId}`);
};

export const uploadFiles = async (formData) => {
  try {
    const response = await axios.post('https://cohesive-vine-437901-v1.uc.r.appspot.com/upload_image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
