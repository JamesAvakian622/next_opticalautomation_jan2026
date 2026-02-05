'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'optical-automation-auth';
const USERS_STORAGE_KEY = 'optical-automation-users';

// Default demo users
const DEFAULT_USERS = [
    {
        id: '1',
        email: 'admin@opticalautomation.com',
        password: 'as34gh90',
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: '2',
        email: 'user@opticalautomation.com',
        password: 'user123',
        name: 'Demo User',
        role: 'user'
    }
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize users and check for existing session
    useEffect(() => {
        try {
            // Load users
            const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            } else {
                setUsers(DEFAULT_USERS);
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
            }

            // Check for existing session
            const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
            if (storedAuth) {
                const authData = JSON.parse(storedAuth);
                setUser(authData);
            }
        } catch (error) {
            console.error('Error loading auth state:', error);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                const userData = {
                    id: data.user._id || data.user.clientId,
                    email: data.user.email,
                    name: data.user.name,
                    clientId: data.user.clientId,
                    role: data.user.role || 'user',
                    subscriptionTier: data.user.subscriptionTier,
                    loginAt: new Date().toISOString()
                };
                setUser(userData);
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
                localStorage.setItem('token', data.token);
                // Also set cookie on client-side so middleware can read it
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                return { success: true, user: userData, token: data.token };
            }

            return { success: false, error: data.error || 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    const register = async (email, password, name) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                const userData = {
                    id: data.user._id || data.user.clientId,
                    email: data.user.email,
                    name: data.user.name,
                    clientId: data.user.clientId,
                    role: data.user.role || 'user',
                    subscriptionTier: data.user.subscriptionTier,
                    loginAt: new Date().toISOString()
                };
                setUser(userData);
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
                localStorage.setItem('token', data.token);
                // Also set cookie on client-side so middleware can read it
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                return { success: true, user: userData, token: data.token };
            }

            return { success: false, error: data.error || 'Registration failed' };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const updateProfile = (updates) => {
        if (!user) return { success: false, error: 'Not logged in' };

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

        // Also update in users list
        const updatedUsers = users.map((u) =>
            u.id === user.id ? { ...u, ...updates } : u
        );
        setUsers(updatedUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

        return { success: true, user: updatedUser };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
