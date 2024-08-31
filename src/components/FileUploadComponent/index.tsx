import apiService from '@/Services/ApiService';
import { useState } from 'react';

export default function FileUploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

      apiService.uploadFile(formData).then((response) => {


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
    </div>
  );
}
