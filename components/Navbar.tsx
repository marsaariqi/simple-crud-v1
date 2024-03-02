"use client"
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { useState, useEffect, useContext } from 'react';

const Navbar = () => {
  const { changeTheme }: any = useContext(ThemeContext);
  const [sunnySize, setSunnySize] = useState(28);
  const [moonSize, setMoonSize] = useState(28);

  useEffect(() => {
    // Retrieve theme preference from local storage on component mount
    const storedTheme = localStorage.getItem('theme');
    const isSunset = storedTheme === 'sunset';
    // Update theme based on the retrieved preference
    changeTheme(storedTheme);
    // Adjust icon sizes based on the theme
    if (isSunset) {
      setSunnySize(28);
      setMoonSize(34);
    } else {
      setSunnySize(34);
      setMoonSize(28);
    }
  }, []);

  // Function to handle theme change
  const handleChangeTheme = () => {
    const newTheme = localStorage.getItem('theme') === 'sunset' ? 'nord' : 'sunset';
    // Update theme preference in local storage
    localStorage.setItem('theme', newTheme);
    // Update theme
    changeTheme(newTheme);
    // Adjust icon sizes based on the new theme
    if (newTheme === 'sunset') {
      setSunnySize(28);
      setMoonSize(34);
    } else {
      setSunnySize(34);
      setMoonSize(28);
    }
  };

  return (
    <div className="navbar bg-neutral px-4">
      <div className="flex-1">
        <Link href="/" className="text-3xl text-neutral-content font-bold">.todo</Link>
      </div>
      <div className="flex-none">
        <IoIosSunny size={sunnySize} color='#FFA500' className='ease-in-out duration-300' />
        <input type="checkbox" className="toggle mx-1 rounded-xl" checked={localStorage.getItem('theme') === 'sunset'} onChange={handleChangeTheme} />
        <IoIosMoon size={moonSize} className='ease-in-out duration-300' />
      </div>
    </div>
  );
};

export default Navbar;
