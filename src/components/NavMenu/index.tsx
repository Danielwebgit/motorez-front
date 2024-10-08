import apiService from '@/Services/ApiService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type NavMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const NavMenu = ({ isOpen, toggleMenu }: NavMenuProps) => {

  const router = useRouter();

  const handleLogout = () => {

    apiService.authLogout().then(() => {

      router.push('/logout')
      
    }).catch((e) => {
      router.push('/logout')
    })

  }

  return (
    <nav
      className={`
        ${isOpen ? "block h-screen" : "hidden"} 
        md:block 
        absolute top-0 left-0 w-full 
        bg-mzheader
        md:relative md:h-auto 
        transition-transform duration-300 ease-in-out
      `}
    >
      <button 
        onClick={toggleMenu} 
        className="absolute top-4 right-4 text-white md:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul className="flex flex-col justify-end md:flex-row md:space-x-4 text-white pt-16 md:pt-0 w-full items-center gap-2">
        <li className='flex'><Link href="/dashboard" className="block py-4 px-8 ">Início</Link></li>
        <li className='flex'><Link href="/veiculos/importar" className="block py-4 px-8 ">Importar</Link></li>
        <li className='flex'><Link href="/veiculos" className="block py-4 px-8 ">Meus veículos</Link></li>
        <li className='flex'><Link href="/fornecedores" className="block py-4 px-8 ">Meus fornecedores</Link></li>
        <li onClick={() => handleLogout()} className='block py-4 px-8 cursor-pointer'>Sair</li>
      </ul>
    </nav>
  );
};

export default NavMenu;
