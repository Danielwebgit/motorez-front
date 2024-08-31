'use client'

import FileUploadComponent from "@/components/FileUploadComponent";
import Layout from "@/containers/Layout";

export default function veiculosPage()
{
    return (
        <Layout>
            <div className="flex mt-40 justify-center w-full">
                <FileUploadComponent />
            </div>
        </Layout>
    )
}