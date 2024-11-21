import api from '../api/authInstance';
import endpoints from '../urls/endpoints';

export const getSubscriptionsAdmin = async () => {
    try {
        const response = await api.get(endpoints.adminSubscriptionList);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createSubscription = async (subscriptionData) => {
    try {
        console.log('Creating subscription with data:', subscriptionData);
        const response = await api.post(endpoints.createSubscription, subscriptionData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateSubscription = async (id, subscriptionData) => {
    try {
        console.log('Updating subscription with id:', id, 'and data:', subscriptionData);
        const response = await api.put(endpoints.updateSubscription(id), subscriptionData);
        return response.data;
    } catch (error) {
        console.error('Error updating subscription');
        throw error.response ? error.response.data : error;
    }
};

export const deleteSubscription = async (id) => {
    try {
        await api.delete(endpoints.deleteSubscription(id));
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// USER SIDE
export const getSubscriptionsUser = async () => {
    try {
        const response = await api.get(endpoints.userSubscriptionList);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
