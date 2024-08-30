import ApiAuth from "./ApiAuth";
import ApiAuthToken from "./ApiAuthToken";
import { CancelToken } from 'axios';

export const authLogin = (email: any, password: any) => {
    const dataLogin = { email, password }
    return ApiAuth.post(`/api/v1/auth/user/login`, dataLogin);
}

export const authLogout = () => {
    return ApiAuthToken.post(`/api/v1/auth/user/logout`);
}

export const fetchAllVehicles = (url: string, cancelToken?: CancelToken) => {
    return ApiAuthToken.get(url, { cancelToken });
}

export const fetchAllTenants = (url: string) => {
    return ApiAuthToken.get(url)
} 

const apiService = {
    
    authLogin,
    authLogout,
    fetchAllVehicles,


    // Routes Group of Main
    fetchAllTenants
}

export default apiService;