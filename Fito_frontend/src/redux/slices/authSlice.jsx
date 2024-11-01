import Cookies from 'js-cookie'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { login, register } from '../../axios/authService/auth'




export const loginUser = createAsyncThunk(
    'auth/login',
    async({email, password}, {rejectWithValue}) => {
        try{
            const response = await login(email, password);
            return response;

        }catch (error){
            return rejectWithValue(error);
        }
    }
);


//USER REGISTRATION
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await register({ username, email, password });
            return response;
        } catch (error) {
            const serializableError = {
                message: error.response ? error.response.data.message || error.message : error.message,
                status: error.response ? error.response.status : null,
            };
            console.error('Register Error', error.response?.data || error.message);
            return rejectWithValue(serializableError);
        }
    }
);

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthenticated : false,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAdmin : false,
        isTrainer : false,
        isLoading: false,
        error: null,
        

    },

    reducers:{
        logout(state){
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null; 
            state.isAdmin = false;
            state.isTrainer = false
            Cookies.remove('access_token')
            Cookies.remove('refresh_token');
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log('Login response:', action.payload);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.user = action.payload.user;
                state.isAdmin = action.payload.is_superuser || false;
                state.isTrainer = action.payload.is_trainer || false;
    
                Cookies.set('access_token', action.payload.access_token);
                Cookies.set('refresh_token', action.payload.refresh_token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                console.log('pending......');
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;  // User is not yet authenticated
                state.user = action.payload.user;
                console.log('suucess.....');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Registration failed';
                console.log('failed.....');
            });
    

    }
});









export const {logout} = authSlice.actions;
export default authSlice.reducer;


