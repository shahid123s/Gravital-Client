import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utilities/axios';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
    'user/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/auth/user/login', credentials);
            const {accessToken, username} = response.data;
            Cookies.set('username', username, {expires: 7});
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login Failed');
        }
    }
)

export const refreshAccessToken = createAsyncThunk(
    'user/refreshAccessToken',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/refresh-token');
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message )
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
       try {
        const response = await axiosInstance.post('/auth/user/logout');
        Cookies.remove('username');
        return response.data
       } catch (error) {
        return rejectWithValue(error.response?.data?.message);
       }
    }
)

const initialState = {
    accessToken : null ,
    isAuthenticate : false || localStorage.getItem('isAuthenticate'),
    loading : false,
    error : null,
    tokenRefreshing: false,
}

const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading  = false;
            state.accessToken = action.payload;
            state.isAuthenticate = true;
            localStorage.setItem('isAuthenticate', true);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //logout
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state, actiion) => {
            state.isAuthenticate = false;
            state.accessToken = null;
            localStorage.removeItem('isAuthenticate')
        
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // refreshAccessToken
        .addCase(refreshAccessToken.pending, (state, action) => {
            state.tokenRefreshing = true;
            state.accessToken = false;
        })

        .addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.tokenRefreshing = false;
            state.error = null;
            state.loading  = false;
        })
        .addCase(refreshAccessToken.rejected, (state) => {
            state.tokenRefreshing = false;
            state.accessToken =  null;
        })
    }

})




export default userSlice.reducer