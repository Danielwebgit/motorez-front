'use client'; // Marque este componente como um Client Component

import { ReactNode } from 'react';
import { AuthProvider } from '../../context/authContext'
interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
  
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

export default Providers;
