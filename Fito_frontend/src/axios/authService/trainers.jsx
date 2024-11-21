import api from '../api/authInstance';
import endpoints from '../urls/endpoints';

export const getTrainers = async () => {
    try {
        const response = await api.get(endpoints.trainersList); // No need for token in headers
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createTrainer = async ({ username, email, password, profile_img }) => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', profile_img); // Add image to form data

        const response = await api.post(endpoints.createTrainer, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
            },
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateTrainer = async (id, trainerData) => {
    try {
        const response = await api.put(endpoints.updateDeleteTrainer(id), trainerData); // No need for token in headers
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteTrainer = async (id) => {
    try {
        await api.delete(endpoints.updateDeleteTrainer(id)); // No need for token in headers
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getTrainerProfile = async (id) => {
    try {
        const response = await api.get(endpoints.trainerProfileUpdateView(id)); // No need for token in headers
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Update a specific trainer's profile
export const updateTrainerProfile = async (id, profileData) => {
    try {
        const response = await api.put(endpoints.trainerProfileUpdateView(id), profileData); // No need for token in headers
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
