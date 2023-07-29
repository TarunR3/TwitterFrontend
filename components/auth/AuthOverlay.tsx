//@ts-nocheck
"use client";
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { signIn } from 'next-auth/react';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OverlayProps {
    showOverlay: boolean;
    setOverlay: (newValue: boolean) => void
}

function AuthOverlay({ showOverlay, setOverlay }: OverlayProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [displayname, setUsername] = useState('');
    const [handle, setHandle] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const overlayRef = useRef(null);

    const handleClickOutside = (event: { target: any; }) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setOverlay(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });
        if (result?.error) {
            console.log(result)
            setError(result?.error);
        } else {
            setOverlay(false);
            router.push('/');
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        if (password !== confirmPassword) {
            e.preventDefault();
            setError("Passwords do not match")
            return;
        }
        if (email === '') {
            setError("Email field is empty")
            return;
        }
        if (displayname === '') {
            setError("Username field is empty")
            return;
        }
        if (handle === '') {
            setError("Handle field is empty")
            return;
        }
        if (password === '') {
            setError("Password field is empty")
            return;
        }
        if (confirmPassword === '') {
            setError("Confirm your password")
            return;
        }
        setError('');
        const requestBody = { email, displayname, handle, password };
        console.log(JSON.stringify(requestBody));
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                if (data.token) {
                    // Save the JWT token in local storage
                    localStorage.setItem('token', data.token);
                    setOverlay(false);
                    // Redirect the user to the main page
                } else {
                    console.error('JWT token not found in response');
                }
            })
            .catch(error => console.error(error));
    };

    const [showLogin, setShowLogin] = useState(true)

    const handleSwitchView = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setHandle('');
        setShowLogin(!showLogin);
    }

    return (
        <main ref = {overlayRef} className="h-screen flex-col justify-center w-[25%]">
            {showLogin ? (
                <Login handleSwitchView={handleSwitchView}
                    email={email} password={password}
                    setEmail={setEmail} setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            ) : (
                <Register handleSwitchView={handleSwitchView}
                    email={email} displayname={displayname} handle={handle} password={password} confirmPassword={confirmPassword}
                    setEmail={setEmail} setUsername={setUsername} setHandle={setHandle} setPassword={setPassword} setConfirmPassword={setConfirmPassword}
                    handleSubmit={handleSubmit} />
            )}
            <h1 className="text-red-500 mt-2">{error}</h1>
        </main>
    );
}

export default AuthOverlay;