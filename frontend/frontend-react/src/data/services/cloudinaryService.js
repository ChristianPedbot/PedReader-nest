import axios from 'axios';

export const uploadImageToBackend = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('http://localhost:3000/cloud', formData, {
    headers: {  
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to upload image to backend');
  }

  return response.data.url;
};
