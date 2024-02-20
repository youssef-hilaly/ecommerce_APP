import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};

export const authContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
  )
}
