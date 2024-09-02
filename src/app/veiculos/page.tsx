'use client'

import SearchsVehicles from "@/components/Searchs";
import Layout from "@/containers/Layout";
import apiService from "@/Services/ApiService";
import { useEffect, useRef, useState } from "react";
import getBaseUrl from "../../../config";
import axios, { CancelTokenSource } from "axios";
import { DeleteIcon, EditIcon } from "@/icons";
import Swal from "sweetalert2";
import VehiclesModals from "@/components/Models/VehiclesModals";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@/components/Pagination";

interface IVehicle {
    id: number;
    code: number;
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
    suppliers_name: string;
    created_at: string;
    updated_at: string;
}

export default function VeiculosImportarPage() {
    const [data, setData] = useState<IVehicle[]>();
    const [brandOrModel, setBrandOrModel] = useState('');
    const [visible, setVisible] = useState(false);
    const [fuel, setFuel] = useState('');
    const [doors, setDoors] = useState('');
    const cancelTokenSource = useRef<CancelTokenSource | null>(null);
    const [url, setUrl] = useState('');
    const [pagination, setPagination] = useState<Array<{ label: string; url: string | null; active: boolean }> | null>(null);

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

    const listUpdateWithLink = (e: any) => {
        if (e !== null) {
          const url = e;
    
          fetchAllVehicles(url, null);
        }
        return;
      };

    function fetchAllVehicles(url: string, cancelTokenSource: any) {
        try {
            apiService.fetchAllVehicles(url, cancelTokenSource).then((response) => {
                const dados: any = response?.data.data;

                const data: any = [];

                for (var chave in dados) {
                    if (dados.hasOwnProperty(chave)) {
                        data.push(dados[chave]);
                    }
                }

                setData(data);
                setPagination(response?.data.links);
            })
            
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteVehicle = (vehicleId: number) => {
        Swal.fire({
            title: "Excluir Veículo?",
            text: "Tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
        }).then((result: any) => {
            if (result.isConfirmed) {
                apiService.deleteVehicles(vehicleId).then((response) => {

                    Swal.fire(response.data.msg, ".", "success");

                    fetchAllVehicles(url, null);
                }).catch(console.error);
            }
        });
    }

    const handleVisibleModal = () => {
        setVisible(true)

    }

    const handleNoVisible = () => {
        setVisible(false)
    }

    const handleActionVehicles = () => {
        fetchAllVehicles(url, null)
    }

    const handleEditVehicle = (vehicleData: IVehicle) => {
        localStorage.setItem("vehicleData", JSON.stringify(vehicleData))
        handleVisibleModal();
    }

    useEffect(() => {
        const url = getBaseUrl() + "/api/v1/vehicles?page=1";
        setUrl(url)
        fetchAllVehicles(url, null);
    }, []);

    return (
        <Layout>
            <ToastContainer />
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
                            <button onClick={() => handleDeleteVehicle(vehicle.id)} > <DeleteIcon className="w-5 h-5" /> </button>
                            <button onClick={() => handleEditVehicle(vehicle)}><EditIcon className="w-5 h-5" /></button>
                        </div>
                        <div className="text-lg">Código: {vehicle.code}</div>
                        <div className="text-lg">Marca: {vehicle.brand}</div>
                        <div className="">Modelo: {vehicle.model}</div>
                        <div className="">Ano: {vehicle.year}</div>
                        <div className="">Portas: {vehicle.doors}</div>
                        <div className="">Combustível: {vehicle.fuel}</div>
                        <div className="">Kilometragem: {vehicle.mileage}</div>
                        <div className="flex w-full justify-between">
                            <div className="">Fornecedor: {vehicle.suppliers_name}</div>
                            <div className="text-2xl"> R$ {vehicle.price}</div>
                        </div>
                    </div>
                ))}
            </div>
            <VehiclesModals visible={visible} handleNoVisible={handleNoVisible} handleActionVehicles={handleActionVehicles} />
            <Pagination pagination={pagination} listUpdateWithLink={listUpdateWithLink}/>
        </Layout>
    );
}
