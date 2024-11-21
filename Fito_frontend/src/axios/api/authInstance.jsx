import axios from 'axios'
import Cookies from 'js-cookie'
import endpoints from '../urls/endpoints'

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        
    },
})

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000", // Replace with your backend URL
    withCredentials: true, // Enable cookies
    headers: {
      "Content-Type": "multipart/form-data", // Default content type for forms
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
      // Add token from cookies to the request headers if it exists
      const token = Cookies.get("access_token"); // Replace with your cookie name
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error); // Handle errors globally if needed
    }
  );
  

api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('access_token');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
     },
    (error) => Promise.reject(error)
)




api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refresh_token'); // Get refresh token from cookies
                const response = await axios.post(endpoints.refreshToken, { refresh: refreshToken });
                const newAccessToken = response.data.access_token;

                // Store the new access token in cookies
                Cookies.set('access_token', newAccessToken);

                // Update the authorization header in the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Log out or handle refresh token expiration
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);

export default api