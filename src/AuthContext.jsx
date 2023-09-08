import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("logged")){
        setIsLogged(true)
    }
  },[])

  const login = () => {
    setIsLogged(true);
  }

  const logout = () => {
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
