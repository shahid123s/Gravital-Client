import { configureStore } from "@reduxjs/toolkit";
import userReducer, {refreshAccessToken, logout} from './feature/userSlice'
import adminReducer, { adminLogout, refreshAdminToken } from "./feature/adminSlice";
import {axiosInstance, adminAxiosInstance,} from "../utilities/axios";


export const store = configureStore({
    reducer : {
       userAuth: userReducer ,
       adminAuth: adminReducer,
    },
})

//user interceptors

axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = store.getState().userAuth
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)




axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only attempt a refresh if we get a 401 and haven't already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const resultAction = await store.dispatch(refreshAccessToken());
                if (refreshAccessToken.fulfilled.match(resultAction)) {
                    const newAccessToken = resultAction.payload;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest); // Retry original request with new token
                } else {
                    store.dispatch(logout());
                    return Promise.reject(error); // Return error if refresh failed
                }
            } catch (refreshError) {
                console.log('okay');

                // If refresh fails, log out user and reject the error
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);




// Admin interceptor  


adminAxiosInstance.interceptors.request.use(
    (config) => {
        const {accessToken} = store.getState().adminAuth
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

adminAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error.response)
        if(error.response && error.response.status === 401 && error.response.data.message == 'AccessToken Required' && !originalRequest._retry) {
            originalRequest._retry = true; 
            console.log('oho')

            try {
                const resultAction = await store.dispatch(refreshAdminToken());

                if(refreshAdminToken.fulfilled.match(resultAction)){
                    const newAccessToken = resultAction.payload;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return adminAxiosInstance(originalRequest);
                } else {
                    store.dispatch(adminLogout());
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                console.log('admin interceptor error');
                console.log(refreshError)
                store.dispatch(adminLogout());
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error);
    }
);





export default store;