import endpoints from "../urls/endpoints";
import Cookies from 'js-cookie'
import api from '../api/authInstance'

export const getUsersAdmin = async () => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.get(endpoints.userList, { 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
