import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // 1. Initial State: Check localStorage first, otherwise default to false (light)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; 
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // 2. The "Effect" Loop: Whenever darkMode changes, update the UI and Storage
  useEffect(() => {
    // This updates the local storage so the browser remembers
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    // This physically updates the CSS by adding/removing the class
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);