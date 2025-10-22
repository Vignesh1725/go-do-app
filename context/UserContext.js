import React, { createContext, useState, useEffect, useContext } from 'react';
import SecureStorage from '../secureStorage';
import { navigate } from '../Navigation/RootNavigation'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loadUser = async () => {
            const savedUser = await SecureStorage.get("user");

            if (savedUser) {
                setUser(savedUser);
            }
        };
        loadUser();
    }, []);

    const saveUser = async (userData) => {
        await SecureStorage.save("user", userData);
        setUser(userData);
    };

    const logout = async () => {
        navigate("Welcome");
        await SecureStorage.remove("user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);