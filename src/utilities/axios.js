import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_USER_BASE_URL,
    withCredentials: true,
    timeout : 10000,

})


export const adminAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_ADMIN_BASE_URL,
    withCredentials: true,
    timeout : 10000,
})



export const postAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_POST_BASE_URL,
    withCredentials: true,
    timeout: 10000,
});

  




