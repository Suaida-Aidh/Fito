import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersAdmin } from '../../axios/authService/userService'; // Adjust the import as necessary

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const data = await getUsersAdmin();
    return data;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
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
            });
    },
});

export default userSlice.reducer;