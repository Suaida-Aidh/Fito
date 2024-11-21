import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getSubscriptionsAdmin,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionsUser,
} from '../../axios/authService/subscription'; 

export const fetchSubscriptions = createAsyncThunk('subscriptions/fetchSubscriptions', async () => {
    const data = await getSubscriptionsAdmin();
    return data;
});

export const addSubscription = createAsyncThunk('subscriptions/addSubscription', async (subscriptionData) => {
    const data = await createSubscription(subscriptionData);
    return data;
});

export const editSubscription = createAsyncThunk('subscriptions/editSubscription', async ({ id, subscriptionData }) => {
    const data = await updateSubscription(id, subscriptionData);
    return data;
});

export const removeSubscription = createAsyncThunk('subscriptions/removeSubscription', async (id) => {
    await deleteSubscription(id);
    return id; // Return the id to remove from state
});

export const fetchUserSubscriptions = createAsyncThunk('subscriptions/fetchUserSubscriptions', async () => {
    const data = await getSubscriptionsUser();  // Fetch user subscriptions
    return data;
});

const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        subscriptions: [],
        userSubscriptions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addSubscription.fulfilled, (state, action) => {
                state.subscriptions.push(action.payload);
            })
            .addCase(editSubscription.fulfilled, (state, action) => {
                const index = state.subscriptions.findIndex((sub) => sub.id === action.payload.id);
                if (index !== -1) {
                    state.subscriptions[index] = action.payload;
                }
            })
            .addCase(removeSubscription.fulfilled, (state, action) => {
                state.subscriptions = state.subscriptions.filter((sub) => sub.id !== action.payload);
            })
            .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
                state.userSubscriptions = action.payload;
            });
    },
});

export default subscriptionSlice.reducer;
