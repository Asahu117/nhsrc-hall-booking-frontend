

// File: src/components/CreateUserModal.jsx
// UPDATED: Added the missing handleDepartmentChange function.

import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import masterDataService from '../services/masterDataService';

// (SVG Icons would be here)
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0019 7.616V16a2 2 0 01-2 2H3a2 2 0 01-2-2V7.616a2 2 0 001.003-1.732zM10 4.218L4.218 7 10 9.782 15.782 7 10 4.218zM4 16V9.218l6 2.909 6-2.909V16H4z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-2 2V4a1 1 0 011-1h2a1 1 0 011 1v1H8z" clipRule="evenodd" /></svg>;
const DepartmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 11-2 0V4zm4 2a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1zm-3 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm3 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>;

const CreateUserModal = ({ isOpen, onClose, onUserCreated, userRole }) => {
    const [formData, setFormData] = useState({ email: '', fullName: '', designation: '', department: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [allDepartments, setAllDepartments] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    const [emailSuggestions, setEmailSuggestions] = useState([]);

    const designations = userRole === 'ADMIN' 
        ? ["Advisor", "Admin"] 
        : ["Consultant", "Senior Consultant", "Lead Consultant"];

    useEffect(() => {
        if (isOpen) {
            masterDataService.getDepartments()
                .then(res => setAllDepartments(res.data.map(d => d.name)))
                .catch(() => setError("Could not load departments."));
        }
    }, [isOpen]);

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, email: value }));

        if (value.includes('@') && !value.split('@')[1]) {
            const emailUser = value.split('@')[0];
            setEmailSuggestions([`${emailUser}@nhsrcindia.org`, `${emailUser}@nhsrcindiaextn.org`]);
        } else {
            setEmailSuggestions([]);
        }
    };

    const handleDepartmentChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, department: value }));

        if (value) {
            setDepartmentSuggestions(allDepartments.filter(dep => dep.toLowerCase().includes(value.toLowerCase())));
        } else {
            setDepartmentSuggestions([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectSuggestion = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'email') setEmailSuggestions([]);
        if (field === 'department') setDepartmentSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.fullName || !formData.designation) {
            return setError("Please fill in all required fields.");
        }
        if (window.confirm(`Create account for ${formData.email} with designation ${formData.designation}? They will receive an email to set their password.`)) {
            setLoading(true);
            try {
                const response = await adminService.createUser(formData);
                onUserCreated(response.data);
                onClose();
            } catch (err) {
                setError(err.response?.data || "Failed to create user.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (!isOpen) return null;

    const inputStyle = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Create New User</h2>
                {error && <p className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><EmailIcon /></div>
                        <input type="email" name="email" className={inputStyle} placeholder="Email Address *" value={formData.email} onChange={handleEmailChange} />
                        {emailSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">{emailSuggestions.map(s => <li key={s} onClick={() => selectSuggestion('email', s)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{s}</li>)}</ul>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><UserIcon /></div>
                        <input type="text" name="fullName" className={inputStyle} placeholder="Full Name *" value={formData.fullName} onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><BriefcaseIcon /></div>
                        <select name="designation" className={`${inputStyle} appearance-none`} value={formData.designation} onChange={handleChange}>
                            <option value="">Select Designation *</option>
                            {designations.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><DepartmentIcon /></div>
                        <input type="text" name="department" className={inputStyle} placeholder="Department" value={formData.department} onChange={handleDepartmentChange} />
                        {departmentSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">{departmentSuggestions.map(s => <li key={s} onClick={() => selectSuggestion('department', s)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{s}</li>)}</ul>
                        )}
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700" disabled={loading}>{loading ? 'Creating...' : 'Create User'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;