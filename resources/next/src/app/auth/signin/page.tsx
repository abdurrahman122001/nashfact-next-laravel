'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Home from '../../../app/page';

const SignIn: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous errors
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: formData.email,
                password: formData.password,
            });
    
            // Store token in localStorage (or cookie)
            const { token } = response.data;
            localStorage.setItem('authToken', token);
    
            console.log('Login Successful:', response.data);
    
            // Redirect to the dashboard or homepage
            router.push('/'); // Correct usage of router.push with a string path
        } catch (error: any) {
            console.error('Login Failed:', error.response?.data || error.message);
            setErrorMessage(error.response?.data?.error || 'An error occurred');
        }
    };
    

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f8f9fa',
            }}
        >
            <div className="container w-[60%]">
                <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                    <div className="flex flex-wrap items-center">
                        {/* Left Side - Form */}
                        <div className="w-full xl:w-1/2">
                            <div className="w-full p-4 sm:p-12.5 xl:p-15">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="email"
                                            className="mb-2.5 block font-medium text-dark dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label
                                            htmlFor="password"
                                            className="mb-2.5 block font-medium text-dark dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                autoComplete="current-password"
                                                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {errorMessage && (
                                        <div className="mb-4 text-red-500 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="mb-6 flex items-center justify-between gap-2 py-2">
                                        <label
                                            htmlFor="remember"
                                            className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
                                        >
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                id="remember"
                                                checked={formData.remember}
                                                onChange={handleInputChange}
                                                className="peer sr-only"
                                            />
                                            <span
                                                className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5"
                                            ></span>
                                            Remember me
                                        </label>
                                        <Link
                                            href="/auth/forgot-password"
                                            className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="mb-4.5">
                                        <button
                                            type="submit"
                                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                                {/* <div className="mt-6 text-center">
                                    <p>
                                        Don’t have an account?{' '}
                                        <Link href="/auth/signup" className="text-primary">
                                            Sign Up
                                        </Link>
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
                            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                                <Link className="mb-10 inline-block" href="/">
                                    <Image
                                        className="hidden dark:block"
                                        src={"/images/logo/w_logo.png"}
                                        alt="Logo"
                                        width={176}
                                        height={32}
                                    />
                                    <Image
                                        className="dark:hidden"
                                        src={"/images/logo/logo.png"}
                                        alt="Logo"
                                        width={176}
                                        height={32}
                                    />
                                </Link>
                                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                                    Sign in to your account
                                </p>

                                <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                                    Welcome Back!
                                </h1>

                                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                                    Please sign in to your account by completing
                                    the necessary fields below
                                </p>

                                <div className="mt-31">
                                    <Image
                                        src={"/images/grids/grid-02.svg"}
                                        alt="Logo"
                                        width={405}
                                        height={325}
                                        className="mx-auto dark:opacity-30"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
