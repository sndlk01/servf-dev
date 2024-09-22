import axios from 'axios';

const baseApiUrl = useRuntimeConfig().public.apiBase;

export const fetchSinglePage = async (id) => {
  try {
    const response = await axios.get(`${baseApiUrl}/singlepage/${id}`);
    return response.data;
  } catch (error) {
    console.error('fetchError', error);
    return null;
  }
};  