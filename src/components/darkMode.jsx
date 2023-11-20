import React from 'react';
import { BsSun, BsFillMoonFill } from "react-icons/bs";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Click me!');

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // setButtonText('Clicked!');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={handleToggleDarkMode}
      className="bg-green hover:bg-pressed-green text-white font-bold py-2 px-4 rounded-full"
    >
      {isDarkMode ? <BsSun color='white'/> : <BsFillMoonFill color='black'/>}
    </button>
  );
};

export default DarkModeButton;