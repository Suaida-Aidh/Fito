const BASE_URL = 'http://localhost:8000'

const endpoints = {
    login: `${BASE_URL}/main/user/login/`,
    register: `${BASE_URL}/main/user/register/`,
    
    // SUBSCRIPTION IN ADMIN AND USER
    userSubscriptionList: `${BASE_URL}/main/user/subscriptions/`,
    adminSubscriptionList: `${BASE_URL}/main/admin/subscriptions/`,
    createSubscription: `${BASE_URL}/main/admin/subscriptions/`, 
    updateSubscription: (id) => `${BASE_URL}/main/admin/subscriptions/${id}/`, 
    deleteSubscription: (id) => `${BASE_URL}/main/admin/subscriptions/${id}/`,

    //TARINERS IN ADMIN AND USER
    userTrainersList: `${BASE_URL}/main/trainersList/`


}

export default endpoints