import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {adminAxiosInstance, axiosInstance } from "../../utilities/axios";



export const adminLogin = createAsyncThunk(
    'admin/login',
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/auth/admin/login', credentials);
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)


export const adminLogout = createAsyncThunk(
    'admin/logout',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/logout');
            localStorage.removeItem('isAdmin')
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)


export const  refreshAdminToken  = createAsyncThunk(
    'admin/refreshAccessToken',
    async(_, {rejectWithValue}) => {
        try {
            const response = await adminAxiosInstance.post('/refresh-token');
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)



const initialState = {
    isAdmin : false  ||localStorage.getItem('isAdmin'),
    adminAccessToken: null, 
    error : null
}

const adminSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(adminLogin.pending, (state) => {
            state.adminAccessToken = null;
            state.isAdmin = true;
            localStorage.setItem('isAdmin', true)
        })
        .addCase(adminLogin.fulfilled, (state, action) => {
            state.adminAccessToken = action.payload.accessToken;
            state.isAdmin = true;
            
        })
        .addCase(adminLogin.rejected, (state, action) => {
            state.adminAccessToken = null;
            state.isAdmin = false;
            state.error = action.payload;
            localStorage.setItem('isAdmin', false)
        })
        .addCase(refreshAdminToken.fulfilled, (state, action) => {
            state.adminAccessToken = action.payload;
            state.isAdmin = true;
            localStorage.setItem('isAdmin', true)
        })
        .addCase(refreshAdminToken.rejected, (state, action) => {
            state.adminAccessToken =  null;
            state.error = action.payload;
        })
        .addCase(adminLogout.fulfilled, (state) => {
            state.adminAccessToken = null;
            state.isAdmin = null ;
            localStorage.removeItem('isAdmin');
        })
        .addCase(adminLogout.rejected,(state, action) => {
            state.error = action.payload;
        })
    }
})


export default adminSlice.reducer;