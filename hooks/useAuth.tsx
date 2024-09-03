"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState<null | {bd: string, role: string}>(null);
    useEffect(() => {
        let storedUser;
        if (typeof window !== 'undefined') {
            storedUser = localStorage.getItem('user');
        }
        setUser(storedUser ? JSON.parse(storedUser) : null)
    }, [user]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const login = async (user: any) => {
        setLoading(true);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
            }
            setUser(user);
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        router.push("/signin");
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
