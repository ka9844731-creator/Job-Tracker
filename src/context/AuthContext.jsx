import {
  createContext,
  useContext,
  useState,
} from "react";

import API from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("jobtrack-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const signup = async (name, email, password) => {
    const response = await API.post(
      "/auth/signup",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "jobtrack-token",
      response.data.token
    );

    localStorage.setItem(
      "jobtrack-user",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);
  };

  const login = async (email, password) => {
    const response = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "jobtrack-token",
      response.data.token
    );

    localStorage.setItem(
      "jobtrack-user",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem(
      "jobtrack-token"
    );

    localStorage.removeItem(
      "jobtrack-user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}