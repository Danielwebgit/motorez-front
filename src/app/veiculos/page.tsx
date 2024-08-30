'use client'

import Layout from "@/containers/Layout";
import apiService from "@/Services/ApiService";
import { useEffect } from "react";

export default function veiculosImportarPage() {

    function fetchAllVehicles() {
        apiService.fetchAllVehicles().then((response) => {
            console.log(response)
        }).catch((e) => {

        })
    }

    useEffect(() => {

        fetchAllVehicles();

    }, [])

    return (
        <Layout>
            Listando os veículos
        </Layout>
    )
}