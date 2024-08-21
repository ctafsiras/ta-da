'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [bd, setBD] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Here you would typically make an API call to your authentication endpoint
        // For this example, we'll just simulate a successful sign-in
        if (bd && password) {
            // Simulate successful sign-in
            console.log('Sign-in successful')
            router.push('/dashboard') // Redirect to dashboard after successful sign-in
        } else {
            setError('Please enter both bd and password')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="bd" className="block text-sm font-medium text-gray-700">
                            BD No
                        </label>
                        <input
                            type="bd"
                            id="bd"
                            value={bd}
                            onChange={(e) => setBD(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}