import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
    const [email,setEmail]= useState('')
    const [message,setMessage]= useState('')
    const navigate= useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Reset code sent to your email');
                setTimeout(() => {
                    navigate('/resetPassword');
                }, 1500);
            } else {
                setMessage(data.message || 'Error sending reset link.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error sending reset link.');
        }
    };

  return <>
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border rounded mb-3"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Send Reset Link
                </button>
                {message && <p className="mt-3 text-green-600">{message}</p>}
            </form>
        </div>

  </>
}

