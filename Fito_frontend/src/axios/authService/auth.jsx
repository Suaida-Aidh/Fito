import api from '../api/authInstance' 
import Cookies from 'js-cookie'
import endpoints from '../urls/endpoints';

export const login = async(email, password) =>{
    try{
        const response = await api.post(endpoints.login, { 
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