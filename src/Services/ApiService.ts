import ApiAuth from "./ApiAuth";
import ApiAuthToken from "./ApiAuthToken";

export const authLogin = (email: any, password: any) => {
    const dataLogin = { email, password }
    return ApiAuth.post(`/api/v1/auth/user/login`, dataLogin);
}

export const authLogout = () => {
    return ApiAuthToken.post(`/api/v1/auth/user/logout`);
}

export const fetchAllVehicles = () => {
    return ApiAuthToken.get(`/api/v1/vehicles`);
}

const apiService = {
    authLogin,
    authLogout,
    fetchAllVehicles
}

export default apiService;