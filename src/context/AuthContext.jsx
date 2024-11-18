// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  
    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem("user")) || null
      );
const navigate  =  useNavigate()
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate('/')

    }

    return (
        <AuthContext.Provider value={{ user, setUser,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
