import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const SetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError("Invalid or missing token.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await authService.setPassword({ token, newPassword: password });
            setSuccess("Password set successfully! Redirecting to login...");
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data || "Failed to set password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Set Your Password</h1>
                {error && <div className="p-3 text-red-800 bg-red-100 rounded-lg">{error}</div>}
                {success && <div className="p-3 text-green-800 bg-green-100 rounded-lg">{success}</div>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirm New Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md" disabled={loading}>
                        {loading ? 'Setting Password...' : 'Set Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPasswordPage;
