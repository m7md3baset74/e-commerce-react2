import React, { useState } from 'react';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false); 

    
    const handleVerifyCode = async () => {
        try {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resetCode: code }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Invalid reset code.");
            }

            setMessage("Code verified! You can now reset your password.");
            setIsCodeVerified(true);
        } catch (error) {
            setMessage(error.message);
            setIsCodeVerified(false);
        }
    };

    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!isCodeVerified) {
            setMessage("Please verify the reset code first.");
            return;
        }

        try {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, resetCode: code, newPassword }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Error resetting password.");
            }

            setMessage("Password reset successfully! Redirecting...");
            setTimeout(() => { window.location.href = '/login'; }, 2000);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleResetPassword} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border rounded mb-3"
                />

                <input
                    type="text"
                    placeholder="Enter the reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="w-full p-2 border rounded mb-3"
                />

                <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-3"
                >
                    Verify Code
                </button>

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded mb-3"
                    disabled={!isCodeVerified}
                />

                <button type="submit" className={`w-full p-2 rounded ${isCodeVerified ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                disabled={! isCodeVerified}>
                    Reset Password
                </button>

                {message && <p className="mt-3 text-green-600">{message}</p>}
            </form>
        </div>
    );
}