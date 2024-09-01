"use client";

import apiService from "@/Services/ApiService";
import { Modal } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VehiclesModals({ visible, handleNoVisible, handleActionVehicles }: any) {

    const [formValues, setFormValues] = useState({ id: '', brand: '', model: '' });

    const getVehicleData = useCallback(() => {

        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {

            const storedData = window.localStorage.getItem("vehicleData");
            return storedData ? JSON.parse(storedData) : {};
        }

        return {};
    }, []);

    const handleChange = (event: any) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    useEffect(() => {

        if (visible) {
            const vehicleData = getVehicleData();

            setFormValues((prevFormValues) => {
                if (vehicleData.brand && vehicleData.brand !== prevFormValues.brand) {
                    return { id: vehicleData.id, brand: vehicleData.brand, model: vehicleData.model };
                }
                return prevFormValues;
            });
        }

    }, [visible, getVehicleData])

    const handleSubmitVehicles = (event: any) => {
        event.preventDefault();

        const newValuesForm = { id: formValues.id, brand: formValues.brand, model: formValues.model }

        apiService.updateVehicle(newValuesForm, formValues.id).then((response) => {
            handleActionVehicles();
            handleNoVisible();
            toast.success(response.data.msg);
        }).catch(console.error)
    }

    return (
        <Modal
            width={500}
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            className="flex  rounded-sm  bg-slate-200 h-full"
        >
            <Modal.Header className="bg-system_yellon">
                <div className="flex w-full items-center flex-col">
                    <div className="flex">
                        <h1 className="flex text-lg text-gray-700 font-bold">Editando veículo</h1>
                    </div>
                </div>
            </Modal.Header>
            <form onSubmit={handleSubmitVehicles}>
                <Modal.Body className="flex">
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex">
                            <input
                                name="brand"
                                value={formValues.brand}
                                onChange={handleChange}
                                className="p-2 border border-1 border-slate-800 text-lg text-gray-800 w-full rounded-lg"
                                type="text" />
                        </div>

                        <div className="flex">
                            <input
                                name="model"
                                value={formValues.model}
                                onChange={handleChange}
                                className="p-2 border border-1 border-slate-800 text-lg text-gray-800 w-full rounded-lg"
                                type="text" />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            color="error"
                            onClick={handleNoVisible}
                            className="text-red-500 font-bold"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="flex bg-system_green rounded-md pt-2 pb-2 pl-4 pr-4 bg-green-600 text-white font-bold">
                            Salvar
                        </button>
                    </div>
                </Modal.Footer>
            </form>
        </Modal>
    );
}