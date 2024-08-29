import Image from "next/image";

export default function LoginPage() {

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="flex shadow-lg border border-lime-100 p-4 w-full lg:w-1/2 m-4 justify-center">
        
        <div className="flex flex-col">
        
          <h1 className="text-center text-2xl font-bold">Login Motorez</h1>

          <div className="flex flex-col">
            <label htmlFor="name">E-mail</label>
            <input type="text" name="name" className="p-2 border border-1 border-black text-gray-700 text-lg rounded-lg"/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Senha</label>
            <input type="text" name="name" className="p-2 border border-1 border-black text-gray-700 text-lg rounded-lg"/>
          </div>

          <button type="submit" className="mt-4 bg-slate-900 text-white h-12 rounded-lg">
          ACESSAR
        </button>
        </div>
      </div>
    </main>
  );
}
