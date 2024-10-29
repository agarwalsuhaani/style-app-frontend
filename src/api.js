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

export const getRecommendation = async (userId) => {
  console.log("post", userId);
  try {
    const response = await fetch('https://cohesive-vine-437901-v1.uc.r.appspot.com/generate_recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ user_id: userId }), 
    });
    return response; 
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error; 
}
}

