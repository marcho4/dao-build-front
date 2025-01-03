"use client"

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    user: null,
    isLoading: true,
    login: async () => {},
    logout: async () => {},
    setUser: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        console.log('User has updated:', user);
    }, [user]);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/session',
                {
                    method: 'GET',
                    credentials: 'include',
                });
            const data = await response.json();
            console.log(data.data);
            if (data.data) {
                setUser(data.data);
                console.log(user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.user) {
                setUser(data.user);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, error: 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};