import ApiAuth from "./ApiAuth";
import ApiAuthToken from "./ApiAuthToken";
import { CancelToken } from 'axios';
import ApiUploadFIles from "./ApiUploadFIles";

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

export const storeVehicles = (formSupplier: string) => {
    return ApiAuthToken.post('/api/v1/vehicles/store', formSupplier);
}

export const updateVehicle = (formVehicle: any, vehicleId: string) => {
    return ApiAuthToken.put(`/api/v1/vehicles/update/${vehicleId}`, formVehicle);
}

export const deleteVehicles = (vehicleId: number) => {
    return ApiAuthToken.delete(`/api/v1/vehicles/delete/${vehicleId}`);
}

export const fetchAllsuppliers = (url: string) => {
    return ApiAuthToken.get(url);
}

export const storeSupplier = (formSupplier: string) => {
    return ApiAuthToken.post('/api/v1/suppliers/store', formSupplier);
}

export const updateSupplier = (formSupplier: string, supplierId: string) => {
    return ApiAuthToken.post(`/api/v1/suppliers/update/${supplierId}`, formSupplier);
}

export const deleteSupplier = (supplierId: number) => {
    return ApiAuthToken.delete(`/api/v1/suppliers/delete/${supplierId}`);
}

export const fetchAllTenants = (url: string) => {
    return ApiAuthToken.get(url)
} 

export const uploadFile = (formData: any, suppliersId: string) => {
    return ApiUploadFIles.post(`/api/v1/vehicles/file-imports-data-vehicles?suppliers_id=${suppliersId}`, formData)
} 

const apiService = {

    authLogin,
    authLogout,
    fetchAllVehicles,
    storeVehicles,
    updateVehicle,
    deleteVehicles,
    uploadFile,
    fetchAllsuppliers,
    storeSupplier,
    updateSupplier,
    deleteSupplier,
    // Routes Group of Main
    fetchAllTenants
}

export default apiService;