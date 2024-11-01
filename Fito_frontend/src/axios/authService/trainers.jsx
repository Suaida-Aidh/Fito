import api from '../api/authInstance'
import Cookies from 'js-cookie'
import endpoints from '../urls/Endpoints';

export const getTrainers = async () => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.get(endpoints.userTrainersList, { 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};