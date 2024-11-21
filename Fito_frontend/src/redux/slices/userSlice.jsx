import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile, getUsersAdmin } from '../../axios/authService/userService'; // Adjust the import as necessary

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const data = await getUsersAdmin();
    console.log("REDUX AREA",data);
    return data;
});

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile', async () => {
        const data = await getUserProfile();
        return data
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        profile: null,
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
