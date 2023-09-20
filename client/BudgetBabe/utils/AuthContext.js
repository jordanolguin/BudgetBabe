import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "./storage";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const userProfile = await AuthService.getProfile();
    setProfile(userProfile);
  };

  const logout = async () => {
    await AuthService.logout();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        fetchProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
