import { useState } from "react";
import NavMenu from "../../components/NavMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full justify-between items-center bg-mzheader">
      <div className="flex w-full items-center h-16 justify-between">
        <div className="text-white text-lg font-bold ml-4">Motorez</div>
        <button 
          className="block md:hidden text-white mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
        <NavMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
      </div>
     
    </header>
  );
};

export default Header;
