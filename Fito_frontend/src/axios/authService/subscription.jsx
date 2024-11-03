import Cookies from 'js-cookie';
import api from '../api/authInstance'; //  Axios instance
import endpoints from '../urls/endpoints'; 

export const getSubscriptionsAdmin = async () => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.get(endpoints.adminSubscriptionList, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};



export const createSubscription = async (subscriptionData) => {
    try {
        console.log('Creating subscription with data:', subscriptionData);
        const token = Cookies.get('access_token');
        const response = await api.post(endpoints.createSubscription, subscriptionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateSubscription = async (id, subscriptionData) => {
    try {
        console.log('Updating subscription with id:', id, 'and data:', subscriptionData); // Log the data

        const token = Cookies.get('access_token');
        const response = await api.put(endpoints.updateSubscription(id), subscriptionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the updated subscription
    } catch (error) {
        console.error('error to update')
        throw error.response ? error.response.data : error;
        
    }
};

export const deleteSubscription = async (id) => {
    try {
        const token = Cookies.get('access_token');
        await api.delete(endpoints.deleteSubscription(id), {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token here
            },
        });
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// USER SIDE 
export const getSubscriptionsUser = async () => {
    try {
        const token = Cookies.get('access_token');
        const response = await api.get(endpoints.userSubscriptionList, { // Adjust the endpoint if needed
            headers: {
                Authorization: `Bearer ${token}`, // Add the token here
            },
        });
        return response.data; // Return the list of subscriptions
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
