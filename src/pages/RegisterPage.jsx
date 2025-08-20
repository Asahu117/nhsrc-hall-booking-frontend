


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import ParticleBackground from '../components/ParticleBackground';

// SVG Icon Components for clarity
const UserIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const IdCardIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0019 7.616V16a2 2 0 01-2 2H3a2 2 0 01-2-2V7.616a2 2 0 001.003-1.732zM10 4.218L4.218 7 10 9.782 15.782 7 10 4.218zM4 16V9.218l6 2.909 6-2.909V16H4z" /></svg>;
const LockIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;
const EyeIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 7.523 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-7.03 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const EyeOffIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.477 4 12 4a4.995 4.995 0 00-2.523.634l-1.78-1.781zm4.418 4.418A4 4 0 0010 14a4 4 0 004-4c0-.773-.22-1.5-.6-2.121L12.121 9.4A2 2 0 0010 12a2 2 0 00-2-2c.105 0 .208.015.307.042l-1.18 1.178z" clipRule="evenodd" /><path d="M12.121 9.4A2 2 0 0010 12a2 2 0 00-2-2c.105 0 .208.015.307.042l-1.18 1.178A4 4 0 004 10a4 4 0 004 4c.773 0 1.5-.22 2.121-.6l1.414 1.414a6.01 6.01 0 01-4.135.397 10.02 10.02 0 01-8.204-5.022C.458 10 3.732 4.943 7.523 3a10.02 10.02 0 015.204 1.397l-1.616 1.616z" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const DepartmentIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 11-2 0V4zm4 2a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-3 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const ContactIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        department: '',
        contactInfo: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!formData.employeeId || !formData.fullName || !formData.password) {
            setError('Please fill in all required fields.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await authService.register(formData);
            setSuccess('Registration successful! You can now log in.');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const inputBaseStyle = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-75 backdrop-blur-sm transition-colors text-gray-900 placeholder-gray-500 caret-blue-600";

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <ParticleBackground />
            <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl shadow-2xl">
                <div className="text-center">
                    <Link to="/">
                        <img src="/public/assets/images/login/nhscr-logo_1.png" alt="NHSRC Logo" className="w-32 mx-auto mb-4" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
                </div>
                {error && <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg">{error}</div>}
                {success && <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg">{success}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><IdCardIcon /></div>
                        <input className={inputBaseStyle} name="employeeId" placeholder="Employee ID *" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><UserIcon /></div>
                        <input className={inputBaseStyle} name="fullName" placeholder="Full Name *" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
                        <input className={inputBaseStyle} name="password" type={showPassword ? 'text' : 'password'} placeholder="Password *" onChange={handleChange} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
                        <input className={inputBaseStyle} name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password *" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><DepartmentIcon /></div>
                        <input className={inputBaseStyle} name="department" placeholder="Department" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><ContactIcon /></div>
                        <input className={inputBaseStyle} name="contactInfo" placeholder="Contact Info" onChange={handleChange} />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-300" 
                        disabled={loading}
                    >
                        {loading ? <SpinnerIcon /> : 'Register'}
                    </button>
                </form>
                <p className="text-sm text-center text-grey-800">
                    Already have an account? <Link to="/login" className="font-medium text-blue-900 hover:underline hover:text-blue-700">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;