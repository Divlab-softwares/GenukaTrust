import Image from "next/image";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import LogoGenukaTrust from "../assets/images/Genuka1.jpg"; 

interface TopbarProps {
  userName?: string;
  userInitials?: string;
  theme?: string;
  setTheme: (theme: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ userName = "Divin", userInitials = "JD", theme, setTheme }) => {
  // const [darkMode, setDarkMode] = useState(false);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.toggle("dark");
  // };

  const setThemes = () => {
    if (theme === "cupcake") {
      setTheme("dark");  
    } else {
      setTheme("cupcake");
    }
    
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src={LogoGenukaTrust.src} alt="Genuka Trust" className="h-12 w-auto rounded-xl" />
          <span className="text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            Genuka Trust
          </span>
        </a>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setThemes()}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
            aria-label="Changer de thème"
          >
            {theme == "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <div className="flex items-center space-x-2">
            {/* <div className="w-9 h-9 rounded-full bg-linear-to-r from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
              {userInitials}
            </div> */}
            <span className="text-gray-700 dark:text-gray-300 font-medium">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
