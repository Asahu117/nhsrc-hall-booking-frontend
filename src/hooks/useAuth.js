
import { createContext, useContext } from 'react';

// 1. Create the context here
export const AuthContext = createContext(null);

// 2. Create and export the hook that uses the context
export const useAuth = () => {
  return useContext(AuthContext);
};