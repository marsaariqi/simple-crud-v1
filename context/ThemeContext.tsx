"use client"
import { createContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  changeTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('sunset');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "sunset";
    setTheme(storedTheme)
  }, [])

  if (!isMounted) {
    return <><span className="loading loading-infinity loading-lg m-auto"></span></>
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};