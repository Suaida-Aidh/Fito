import api from '../api/authInstance'
import Cookies from 'js-cookie'
import endpoints from '../urls/endpoints';

export const getTrainers = async () => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.get(endpoints.trainersList, { 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createTrainer = async ({ username, email, password }) => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.post(endpoints.createTrainer, {
            username,
            email,
            password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};



export const updateTrainer = async (id, trainerData) => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.put(endpoints.updateDeleteTrainer(id), trainerData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteTrainer = async (id) => {
    try {
        const token = Cookies.get('access_token');
        await api.delete(endpoints.updateDeleteTrainer(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};