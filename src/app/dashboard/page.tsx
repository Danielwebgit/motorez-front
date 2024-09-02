'use client'

import Layout from "@/containers/Layout";
import apiService from "@/Services/ApiService";
import { useEffect, useState } from "react";
import getBaseUrl from "../../../config";

export default function DashboardPage() {

    const [data, setData] = useState([]);

    function fetchAllTenants(url: string) {
        apiService.fetchAllTenants(url).then((response) => {
            console.log(response)
            const { data } = response.data
            setData(data)
        }).catch(console.error)
    }

    useEffect(() => {

        const url = getBaseUrl() + "/api/v1/tenants?page=1";
        fetchAllTenants(url)


    }, [])
    return (
        <Layout>
            <h1 className="text-center mt-20">Olá bem vindo(a)!</h1>

            <div className="flex w-full justify-center mt-20">

                <table>
                    <thead>
                        <tr className="bg-gray-200 rounded-lg">
                            <th className="p-2 text-left border-b">Id</th>
                            <th className="p-2 text-left border-b">Nome</th>
                            <th className="p-2 text-left border-b">Domínio</th>
                            <th className="p-2 text-left border-b">Banco de dados</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        data?.map((tenant: any, index: number) => {
                            return (
                                <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-yellow-200`}
                                >
                                    <td>{tenant?.id}</td>
                                    <td>{tenant?.name}</td>
                                    <td>{tenant?.domain}</td>
                                    <td>{tenant?.tenancy_db_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </Layout>

    )
}