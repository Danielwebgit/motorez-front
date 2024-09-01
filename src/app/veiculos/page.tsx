'use client'

import SearchsVehicles from "@/components/Searchs";
import Layout from "@/containers/Layout";
import apiService from "@/Services/ApiService";
import { useEffect, useRef, useState } from "react";
import getBaseUrl from "../../../config";
import axios, { CancelTokenSource } from "axios";
import { DeleteIcon, EditIcon } from "@/icons";

interface IVehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    version: string;
    mileage: string;
    fuel: string;
    doors: number;
    price: string;
    date: string;
    optionals: string;
    suppliers_id: number;
    created_at: string;
    updated_at: string;
}

export default function veiculosImportarPage() {
    const [data, setData] = useState<IVehicle[]>();
    const [brandOrModel, setBrandOrModel] = useState('');

    const [fuel, setFuel] = useState('');
    const [doors, setDoors] = useState('');
    const cancelTokenSource = useRef<CancelTokenSource | null>(null);

    const setSearch = (e: any) => {
       
        const updatedBrandOrModel = e.brandOrModel ?? brandOrModel;
        const updatedFuel = e.fuel ?? fuel;
        const updatedDoors = e.door ?? doors;

        setBrandOrModel(updatedBrandOrModel);
        setFuel(updatedFuel);
        setDoors(updatedDoors);

       
        let urlSearch = `${getBaseUrl()}/api/v1/vehicles?page=1`;

        if (updatedBrandOrModel) {
            urlSearch += `&brandOrModel=${updatedBrandOrModel}`;
        }
        if (updatedFuel) {
            urlSearch += `&fuel=${updatedFuel === 'Todos' ? '' : updatedFuel}`;
        }
        if (updatedDoors) {
            urlSearch += `&doors=${updatedDoors === 'Todos' ? '' : updatedDoors}`;
        }

       
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel("Operation canceled due to new request.");
        }

        cancelTokenSource.current = axios.CancelToken.source();

      
        fetchAllVehicles(urlSearch, cancelTokenSource.current.token);
    };

    async function fetchAllVehicles(url: string, cancelTokenSource: any) {
        try {
            const response = await apiService.fetchAllVehicles(url, cancelTokenSource);
            setData(response.data.data);
        } catch (e) {
         console.log(e)
        }
    }

    useEffect(() => {
        const url = getBaseUrl() + "/api/v1/vehicles?page=1";
        fetchAllVehicles(url, null);
    }, []);

    return (
        <Layout>
            <div className="flex mt-20">
                <SearchsVehicles 
                    brandOrModel={brandOrModel} 
                    setSearch={setSearch} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {data?.map((vehicle) => (
                    <div key={vehicle.id} className="flex flex-col shadow-md shadow-gray-900 p-4 rounded-lg">
                        <div className="flex gap-4 w-full justify-end">
                            <button > <DeleteIcon className="w-5 h-5"/> </button>
                            <button ><EditIcon className="w-5 h-5"/></button>
                        </div>
                        <div className="text-lg">Marca: {vehicle.brand}</div>
                        <div className="">Modelo: {vehicle.model}</div>
                        <div className="">Ano: {vehicle.year}</div>
                        <div className="">Portas: {vehicle.doors}</div>
                        <div className="">Combustível: {vehicle.fuel}</div>
                        <div className="">Kilometragem: {vehicle.mileage}</div>
                        <div className="flex w-full justify-between">
                            <div className="">Fornecedor: {vehicle.suppliers_id}</div>
                            <div className="text-2xl"> R$ {vehicle.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
