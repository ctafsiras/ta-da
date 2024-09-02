"use client"

import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const login = async (user: any) => {
        setLoading(true);
        setError('');
        try {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return {
        user,
        loading,
        error,
        login,
        logout,
    };
};

export default useAuth;
