import endpoints from "../urls/endpoints";
import api from '../api/authInstance';

export const getUsersAdmin = async () => {
    try {
        const response = await api.get(endpoints.userList); 
        // console.log(response.data)// No need for token in headers
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get(endpoints.userProfile); // No need for token in headers
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
