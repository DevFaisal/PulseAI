import { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

export const useAuth = () => {
  const { login, signUp, logout } = useFirebase();
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (email, password, userData) => {
    try {
      await signUp(email, password, userData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleLogin, handleSignUp, handleLogout, error };
};
