// plugins\api\createPage.js
import axios from 'axios';

const baseApiUrl = useRuntimeConfig().public.apiBase;

const createPage = {
    async createSinglePage(data) {
        try {
            const response = await axios.post(`${baseApiUrl}/singlepage`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating single page:', error);
            throw error;
        }
    }
};

export default createPage;