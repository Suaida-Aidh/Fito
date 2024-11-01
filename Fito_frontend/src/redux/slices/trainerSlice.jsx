import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTrainers } from '../../axios/authService/trainers'


export const fetchTrainers = createAsyncThunk(
    'trainers/fetchTrainers', 
    async () => {
    const data = await getTrainers();
    return data;
});

const trainerSlice = createSlice({
    name: 'trainers',
    initialState: {
        trainers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.trainers = action.payload;
            })
            .addCase(fetchTrainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default trainerSlice.reducer;