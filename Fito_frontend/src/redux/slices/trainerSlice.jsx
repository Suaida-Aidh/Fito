import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTrainers,
        createTrainer,
        updateTrainer,
        deleteTrainer
 } from '../../axios/authService/trainers'


 export const fetchTrainers = createAsyncThunk('trainers/fetchTrainers', async () => {
    const data = await getTrainers();
    return data;
});

export const addTrainer = createAsyncThunk(
    'trainers/addTrainer',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const data = await createTrainer({ username, email, password });
            return data;
        } catch (error) {
            const serializableError = {
                message: error.response ? error.response.data.message || error.message : error.message,
                status: error.response ? error.response.status : null,
            };
            console.error('Add Trainer Error', error.response?.data || error.message);
            return rejectWithValue(serializableError);
        }
    }
);



export const editTrainer = createAsyncThunk('trainers/editTrainer', async ({ id, trainerData }) => {
    const data = await updateTrainer(id, trainerData);
    return data;
});

export const removeTrainer = createAsyncThunk('trainers/removeTrainer', async (id) => {
    await deleteTrainer(id);
    return id; // Return the id to remove from state
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
            })
            .addCase(addTrainer.fulfilled, (state, action) => {
                state.trainers.push(action.payload);
            })
            .addCase(editTrainer.fulfilled, (state, action) => {
                const index = state.trainers.findIndex((trainer) => trainer.id === action.payload.id);
                if (index !== -1) {
                    state.trainers[index] = action.payload;
                }
            })
            .addCase(removeTrainer.fulfilled, (state, action) => {
                state.trainers = state.trainers.filter((trainer) => trainer.id !== action.payload);
            });
    },
});

export default trainerSlice.reducer;