'use client'

import Layout from "@/containers/Layout"
import apiService from "@/Services/ApiService";
import { useEffect, useState } from "react"
import getBaseUrl from "../../../config";
import SuppliersModals from "@/components/Models/SuppliersModals";
import Swal from "sweetalert2";

export default function FornecedoresPage() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [visible, setVisible] = useState(false);
    const fetchAllsuppliers = (url: string) => {
        apiService.fetchAllsuppliers(url)
            .then((response) => {
                console.log(response)
                setData(response.data)
            })
            .catch(console.error)
    }

    const handleVisibleModal = () => {
        setVisible(true)

    }

    const handleNoVisible = () => {
        setVisible(false)
    }

    const handleActionSuppliers = () => {
        fetchAllsuppliers(url)
    }

    const handleSupplierDelete = (supplierId: number) => {

        Swal.fire({
            title: "Excluir fornecedor?",
            text: "Tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
        }).then((result: any) => {
            if (result.isConfirmed) {
                apiService.deleteSupplier(supplierId).then((response) => {

                    Swal.fire(response.data.msg, ".", "success");

                    fetchAllsuppliers(url);
                }).catch(console.error);
            }
        })
    }


    useEffect(() => {
        const url = getBaseUrl() + "/api/v1/suppliers?page=1";
        setUrl(url)
        fetchAllsuppliers(url)
    }, [])

    return (
        <Layout>
            <div className="flex w-full items-center mt-20 flex-col">

                <div className="w-full max-w-4xl">

                    <div className="flex w-full">
                        <button onClick={handleVisibleModal} className="flex bg-green-600 rounded-lg pl-4 pr-4 pt-2 pb-2 text-white font-bold mb-4">Adicionar novo</button>
                    </div>

                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 border-b border-gray-300">
                                <th className="p-4 text-left text-gray-600">Id</th>
                                <th className="p-4 text-left text-gray-600">Nome</th>
                                <th className="p-4 text-left text-gray-600"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((supplier: any, index: number) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-yellow-200`}
                                    >
                                        <td className="p-4 border-b border-gray-300">{supplier?.id}</td>
                                        <td className="p-4 border-b border-gray-300">{supplier?.name}</td>
                                        <td className="p-4 border-b border-gray-300">
                                            <div className="flex gap-2">
                                                <div className="cursor-pointer">Editar</div>
                                                <div onClick={() => handleSupplierDelete(supplier.id)} className="text-red-600 cursor-pointer">Excluir</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <SuppliersModals visible={visible} handleNoVisible={handleNoVisible} handleActionSuppliers={handleActionSuppliers} />
        </Layout>
    )
}
