"use client"
import React from 'react';
import LoadingButton from './loading-button';
import useAuth from '@/hooks/useAuth';

const LogoutButton = () => {
    const { loading, logout, user } = useAuth();
    if (user) {
        return (
            <LoadingButton loading={loading} onClick={logout}>
                Logout
            </LoadingButton>
        );
    }
};

export default LogoutButton;