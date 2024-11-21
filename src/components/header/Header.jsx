import React, { useState } from 'react';
import { MagnifyingGlassIcon, BellIcon, CogIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import test from '../../assets/test.jpg';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { ChevronDown, Cog, Lock, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { app } = useAdmin();
  const { user,setUser} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate  =  useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')

  };

  return (
    <div className="header flex justify-between shadow-sm items-center px-8 py-2">
      <div></div>
      <div className="flex items-center space-x-4 mr-5">
        <div className="photo flex items-center relative">
          <img src={test} alt="user-profile" className="w-10 h-10 rounded-full" />
          <ChevronDown className="mt-5 cursor-pointer" onClick={toggleDropdown} />
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 py-2 z-10">
              <button className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100">
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>

              <button className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100">
                <Cog className="w-5 h-5" />
                <span>Paramètres</span>
              </button>
              
              <button 
                className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
