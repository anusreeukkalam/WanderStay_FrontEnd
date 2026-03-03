import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!user && !ready) {
            axios.get('/profile', { withCredentials: true })
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch((err) => {
                    console.error('error fetching profile:', err);
                    setReady(true);
                });
        }
    }, [user, ready]);

    return (
        <UserContext.Provider value={{ user, setUser, ready, searchQuery, setSearchQuery }}>
            {children}
        </UserContext.Provider>

    );
}
