import ApiAuth from "./ApiAuth";


export const authLogin = (email: any, password: any) => {
    const dataLogin = { email, password }
    return ApiAuth.post(`/api/v1/auth/user/login`, dataLogin);
}

const apiService = {
    authLogin
}

export default apiService;