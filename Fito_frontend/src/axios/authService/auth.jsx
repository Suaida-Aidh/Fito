import api from '../api/authInstance' //import instance
import endpoints from '../urls/Endpoints' //import endpoints
import Cookies from 'js-cookie'

export const login = async(email, password) =>{
    try{
        const response = await api.post(endpoints.login, { //use the login endpoint from that file
            email,
            password
        });

        Cookies.set('access_token', response.data.access_token);
        Cookies.set('refresh_token', response.data.refresh_token);

        return response.data;
    }catch (error){
        throw error.response ? error.response.data : error;
    }
}


export const register = async({ username, email, password}) => {
    try{
        const response = await api.post(endpoints.register, {
            username,
            email,
            password,

        });
        return response.data;
    }catch (error){
        throw error.response? error.response.data : error;
    }
}