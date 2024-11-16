import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth/authService.js";
import { tokenService } from "../services/auth/tokenService.js";

const AuthContext = createContext({
  currentUser: false,
  loading: false,
  signin: () => {},
  signout: () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signin = async (username, password) => {
    try {
      setLoading(true);
      return await authService
        .login({ username, password })
        .then(async () => {
          try {
            setCurrentUser(username);
            navigate("/");
          } catch (error) {
            setCurrentUser(false);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      tokenService.delete();
      setCurrentUser(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
