import axios from 'axios';

const commonGetApi = async (url) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return false;
    }
};

export default commonGetApi;



export const commonPostApi = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const commonPutApi = async (url, data) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const commonDeleteApi = async (url) => {
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};



