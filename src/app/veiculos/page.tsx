'use client'

import Layout from "@/containers/Layout";
import apiService from "@/Services/ApiService";
import { useEffect, useState } from "react";

export default function veiculosImportarPage() {

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

    const [data, setData] = useState<IVehicle[]>();

    function fetchAllVehicles() {

        apiService.fetchAllVehicles().then((response) => {

            console.log(response.data.data)
            
            setData(response.data.data)
            
        }).catch((e) => {

        })
    }

    useEffect(() => {

        fetchAllVehicles();

    }, [])

    return (
        <Layout>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                {
                    data?.map((vehicle) => {
                        return (
                           
                                <div className="flex flex-col shadow-md shadow-gray-900 p-4 rounded-lg">
                                    <div className="text-lg">Marca: {vehicle.brand}</div>
                                    <div className="">Modelo: {vehicle.model}</div>
                                    <div className="">Ano: {vehicle.year}</div>
                                    <div className="">Combustível: {vehicle.fuel}</div>
                                    <div className="">Kilometragem: {vehicle.mileage}</div>
                                    <div className="flex w-full justify-between">
                                        <div className="">Fornecedor: {vehicle.suppliers_id}</div>
                                        <div className="text-2xl"> R$ {vehicle.price}</div>
                                    </div>
                                </div>
                         
                        )
                    })
                }
            </div>
        </Layout>
    )
}