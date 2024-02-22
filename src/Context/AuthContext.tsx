import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    userId: string | null;
    setUserId: (userId: string | null) => void;
};

export const authContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            setToken(localToken);
        }
        const localId = localStorage.getItem('id');
        if (localId) {
            setUserId(localId);
        }
    }, []);

    return (
        <authContext.Provider value={{ token, setToken, userId, setUserId }}>
            {children}
        </authContext.Provider>
  )
}
