"use client";

import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import motorezLogo from "../../public/assets/image/motorez-logo.png"
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async (data: any) => {
    const email = data.email;
    const password = data.password;

    try {
      if (!email || !password) {
        throw new Error("Por favor, preencha todos os campos!");
      } else {
        setError(null);
      }
  
      await signIn({ email, password }).catch((err) => {
        if (err.response.data.message) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error(err.response.data.error);
        }
      });
    } catch (e: any) {
      setError(e.message)
    }

  };

  return (
    <main className="flex flex-col h-screen justify-center items-center">
      
      <div className="flex shadow-lg border p-4 w-full lg:w-1/2 m-4 justify-center shadow-blue-800">
        <div className="flex flex-col mb-4">
          <div className="flex w-full justify-center">
          <Image
            src={motorezLogo}
            alt="motorez logo"
            className="w-40 h-38"
          />

          </div>
          <h1 className="text-center font-bold text-sm mt-2">Login</h1>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="flex flex-col">
              <label htmlFor="name">E-mail</label>
              <input
                {...register("email")}
                type="text"
                name="email"
                className="p-2 border border-1 border-black text-gray-700 text-lg rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="name">Senha</label>
              <input
                {...register("password")}
                type="password"
                name="password"
                className="p-2 border border-1 border-black text-gray-700 text-lg rounded-lg"
              />
            </div>

            <div className="flex mt-4 justify-center">
              {error && <ErrorMessage message={error} />}
            </div>

            <button
              type="submit"
              className="mt-4 bg-mzbutton text-green-400 h-12 rounded-lg w-full font-bold text-lg"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col shadow-lg border p-4 w-full lg:w-1/2 m-4 justify-center shadow-blue-800">
        <h3>Links para mudar na url ;)</h3>
        <div className="flex">
          <Link href="http://localhost:3000/">Principal </Link>
        </div>
    
        <div className="flex">
          <Link href="http://viviane.localhost:3000/">Subdomínio - 1 </Link>
        </div>

        <div className="flex">
          <Link href="http://daniel.localhost:3000/">Subdomínio - 2 </Link>
        </div>

        <hr />

        <Link className="flex m-4 bg-gray-800 text-white justify-center rounded-lg" href="https://github.com/Danielwebgit/motorez-back">Repositório Git</Link>
      </div>
    </main>
  );
}
