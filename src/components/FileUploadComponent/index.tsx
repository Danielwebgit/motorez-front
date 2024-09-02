import apiService from '@/Services/ApiService';
import { useEffect, useState } from 'react';
import SelectSuppliers from '../SelectSuppliers';
import getBaseUrl from "../../../config";

export default function FileUploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [registeredCode, setRegisteredCode] = useState([]);
  const [suppliers, setSuppliers] = useState();
  const [formValues, setFormValues] = useState({suppliers_id: ''})

  function fetchAllsuppliers(url: string){
    
    apiService.fetchAllsuppliers(url).then((response) => {
      setSuppliers(response.data)
    })

  }

  useEffect(() => {
    const url = getBaseUrl() + "/api/v1/suppliers?page=1";
    fetchAllsuppliers(url);

  }, [])

  const handleChangeSuppliers = async (supplier: any) => {
    console.log(supplier.value)
    setFormValues({...formValues,'suppliers_id': supplier.value})
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (!selectedFile) return;

    const fileType = selectedFile.type;

    if (fileType === 'application/json' || fileType === 'text/xml') {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setErrorMessage('Por favor, selecione um arquivo JSON ou XML válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('Por favor, selecione um arquivo para upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {

      apiService.uploadFile(formData, formValues.suppliers_id).then((response) => {

        setMessage(response.data.msg);
        console.log(response.data.registered_codes)
        setRegisteredCode(response.data.registered_codes);
      }).catch((e) => {


      })

    } catch (error) {
      setErrorMessage('Erro ao enviar o arquivo. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 max-w-lg bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Adicionar dados dos veículos para o estoque</h2>
      <form onSubmit={handleSubmit}>

        <div className='mb-4'>
          <SelectSuppliers options={suppliers}
                      onChange={handleChangeSuppliers} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Selecione o Arquivo</label>
          <input
            type="file"
            accept=".json,.xml"
            onChange={handleFileUpload}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Enviar Arquivo
        </button>
      </form>

      <div className='flex w-full mt-2'>{message}</div>

      <div className='flex flex-col border border-1 rounded-lg p-4'>

        {
          registeredCode.length > 0 && (
            <span>Veículos com códigos já cadastrados</span>
          )
        }
        {
          registeredCode?.map((code, index: number) => {
            return (
              <div key={index} className='flex'>
                <div className='text-sm'>{code}</div>
              </div>
            )
          })
        }
      </div>

    </div>
  );
}
