"use client";

import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async (data: any) => {
    const email = data.email;
    const password = data.password;

    if (!email || !password) {
      throw new Error("Por favor, preencha todos os campos!");
    } else {
      setError(null);
    }

    await signIn({ email, password }).catch((err) => {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.response.data.error);
      }
    });
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="flex shadow-lg border border-lime-100 p-4 w-full lg:w-1/2 m-4 justify-center">
        <div className="flex flex-col">
          <h1 className="text-center text-2xl font-bold">Login Motorez</h1>
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
              className="mt-4 bg-slate-900 text-white h-12 rounded-lg w-full"
            >
              ACESSAR
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
