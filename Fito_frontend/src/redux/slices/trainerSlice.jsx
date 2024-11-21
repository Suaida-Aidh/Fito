import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTrainers,
        updateTrainer,
        deleteTrainer,
        getTrainerProfile,
        updateTrainerProfile,
        createTrainer
 } from '../../axios/authService/trainers'


export const fetchTrainers = createAsyncThunk('trainers/fetchTrainers', async () => {
    const data = await getTrainers();
    return data;
});

export const registerTrainer = createAsyncThunk(
    'admin/registerTrainer',
    async ({ username, email, password, confirmPassword, position, profileImg }, { rejectWithValue }) => {
        try {
            const response = await createTrainer({ username, email, password, confirmPassword, position, profileImg });
            return response;
        } catch (error) {
            const serializableError = {
                message: error.message || "Registration failed",
                status: error.response?.status || null,
            };
            console.error("Trainer Registration Error", error);
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
        isTrainerRegistered: false,
        profile: null,
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
            // Admin register trainer
            .addCase(registerTrainer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerTrainer.fulfilled, (state) => {
                state.isLoading = false;
                state.isTrainerRegistered = true;
            })
            .addCase(registerTrainer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Trainer registration failed";
            })
            // end
            .addCase(editTrainer.fulfilled, (state, action) => {
                const index = state.trainers.findIndex((trainer) => trainer.id === action.payload.id);
                if (index !== -1) {
                    state.trainers[index] = action.payload;
                }
            })
            .addCase(removeTrainer.fulfilled, (state, action) => {
                state.trainers = state.trainers.filter((trainer) => trainer.id !== action.payload);
            })
            .addCase(fetchTrainerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchTrainerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTrainerProfileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTrainerProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateTrainerProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const fetchTrainerProfile = createAsyncThunk(
    'trainers/fetchTrainerProfile',
    async (id, { rejectWithValue }) => {
        try {
            const data = await getTrainerProfile(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const updateTrainerProfileThunk = createAsyncThunk(
    'trainers/updateTrainerProfile',
    async ({ id, profileData }, { rejectWithValue }) => {
        try {
            const data = await updateTrainerProfile(id, profileData);
            return data;
        } catch (error) {
            const serializableError = {
                message: error.message,
                status: error.response ? error.response.status : null,
            };
            return rejectWithValue(serializableError);
        }
    }
);

export default trainerSlice.reducer;