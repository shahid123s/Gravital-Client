import { useSelector } from "react-redux";

export const useAuthStatus = () => {
    const { accessToken, tokenRefreshing } = useSelector((state) => state.userAuth);

    const isAuthenticating = tokenRefreshing; // Token refresh in progress
    const isAuthenticated = Boolean(accessToken); // User has a valid accessToken

    return { isAuthenticating, isAuthenticated };
};