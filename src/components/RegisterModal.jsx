

// File: src/components/RegisterModal.jsx
// This is the complete, correct version of the RegisterModal with all features.

import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import masterDataService from '../services/masterDataService';
import LoginImageSlideshow from './LoginImageSlideshow';

// SVG Icons for the form fields
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0019 7.616V16a2 2 0 01-2 2H3a2 2 0 01-2-2V7.616a2 2 0 001.003-1.732zM10 4.218L4.218 7 10 9.782 15.782 7 10 4.218zM4 16V9.218l6 2.909 6-2.909V16H4z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const DepartmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 11-2 0V4zm4 2a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-3 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-2 2V4a1 1 0 011-1h2a1 1 0 011 1v1H8z" clipRule="evenodd" /></svg>;

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        department: '',
        designation: ''
    });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [allDepartments, setAllDepartments] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    const [emailSuggestions, setEmailSuggestions] = useState([]);

    const designations = ["Consultant", "Senior Consultant", "Lead Consultant", "Advisor", "Admin"];

    useEffect(() => {
        if (isOpen) {
            masterDataService.getDepartments()
                .then(response => {
                    setAllDepartments(response.data.map(dep => dep.name));
                })
                .catch(err => console.error("Failed to fetch departments", err));
        }
    }, [isOpen]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        if (value.includes('@') && !value.split('@')[1]) {
            const emailUser = value.split('@')[0];
            setEmailSuggestions([`${emailUser}@nhsrcindia.org`, `${emailUser}@nhsrcindiaextn.org`]);
        } else {
            setEmailSuggestions([]);
        }
    };

    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, department: value });
        if (value) {
            setDepartmentSuggestions(allDepartments.filter(dep => dep.toLowerCase().includes(value.toLowerCase())));
        } else {
            setDepartmentSuggestions([]);
        }
    };

    const selectSuggestion = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (field === 'email') setEmailSuggestions([]);
        if (field === 'department') setDepartmentSuggestions([]);
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match.');
        }
        setLoading(true);
        try {
            await authService.requestOtp(formData);
            setSuccess('Verification OTP sent to your email!');
            setOtpSent(true);
        } catch (err) {
            setError(err.response?.data || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.verifyOtpAndRegister({ email: formData.email, otp });
            setSuccess('Registration successful! You can now sign in.');
            setTimeout(() => {
                onClose();
                onSwitchToLogin();
            }, 2000);
        } catch (err) {
            setError(err.response?.data || 'OTP verification failed.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    const inputBaseStyle = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="relative grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl z-20 md:text-white">&times;</button>
                <div className="flex flex-col justify-center p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">{otpSent ? 'Verify Your Email' : 'Create an Account'}</h1>
                    </div>
                    {error && <div className="p-3 mt-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}
                    {success && <div className="p-3 mt-4 text-sm text-green-800 bg-green-100 rounded-lg">{success}</div>}
                    
                    {!otpSent ? (
                        <form className="mt-8 space-y-4" onSubmit={handleRequestOtp}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><EmailIcon /></div>
                                <input className={inputBaseStyle} name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleEmailChange} />
                                {emailSuggestions.length > 0 && (
                                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {emailSuggestions.map(s => <li key={s} onClick={() => selectSuggestion('email', s)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{s}</li>)}
                                    </ul>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><UserIcon /></div>
                                <input className={inputBaseStyle} name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} />
                            </div>
                         

                    
<div className="relative">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <BriefcaseIcon />
  </div>
  <select
    className={`${inputBaseStyle} appearance-none text-black`}
    name="designation"
    value={formData.designation}
    onChange={handleChange}
  >
    <option value="" disabled hidden className="text-green-400">
      Select Designation *
    </option>
    {designations.map((d) => (
      <option key={d} value={d} className="text-black">
        {d}
      </option>
    ))}
  </select>
</div>


                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><DepartmentIcon /></div>
                                <input className={inputBaseStyle} name="department" placeholder="Department" value={formData.department} onChange={handleDepartmentChange} />
                                {departmentSuggestions.length > 0 && (
                                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                        {departmentSuggestions.map(s => <li key={s} onClick={() => selectSuggestion('department', s)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{s}</li>)}
                                    </ul>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
                                <input className={inputBaseStyle} name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
                                <input className={inputBaseStyle} name="confirmPassword" type="password" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                                {loading ? <SpinnerIcon /> : 'Get Verification Code'}
                            </button>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-4" onSubmit={handleVerifyOtp}>
                            <p className="text-center text-gray-600">An OTP has been sent to <strong>{formData.email}</strong>. Please enter it below.</p>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
                                <input className={inputBaseStyle} name="otp" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50" disabled={loading}>
                                {loading ? <SpinnerIcon /> : 'Verify & Register'}
                            </button>
                        </form>
                    )}
                    <p className="mt-6 text-sm text-center text-gray-700">
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="font-medium text-blue-700 hover:underline">Sign in</button>
                    </p>
                </div>
                <div className="hidden md:block">
                    <LoginImageSlideshow />
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
