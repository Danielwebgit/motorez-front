"use client";

import apiService from "@/Services/ApiService";
import { Modal } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export default function SuppliersModals({visible, handleNoVisible, handleActionSuppliers}: any) {

    const { register, handleSubmit } = useForm();

    const handleSubmitSuppliers = (data: any) => {
     
        apiService.storeSupplier(data).then((response) => {
            console.log(response)
            handleActionSuppliers();
            handleNoVisible();
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
                <h1 className="flex text-lg text-white font-bold">Cadastrar</h1>
              </div>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(handleSubmitSuppliers)}>
            <Modal.Body className="flex">
              <input
                {...register('name')}
                name="name"
                className="p-2 border border-1 border-slate-800 text-lg text-gray-800" 
                type="text" />
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