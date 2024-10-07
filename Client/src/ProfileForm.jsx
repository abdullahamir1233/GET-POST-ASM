// client/src/ProfileForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        Name: '',
        Title: '',
        TargetedKeywords: '',
        Education: '',
        Certification: '',
        Contact: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const validateInput = () => {
        // Check if contact contains only digits
        const contactPattern = /^\d+$/;
        if (!contactPattern.test(profile.Contact)) {
            setError('Contact must contain only numbers.');
            return false;
        }

        // Reset error message if all validations pass
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs before submitting
        if (!validateInput()) {
            return; // Stop form submission if validation fails
        }

        try {
            const response = await fetch('http://localhost:3002/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });

            if (!response.ok) {
                throw new Error('Failed to submit profile');
            }

            alert('Profile submitted successfully!');
            setProfile({
                Name: '',
                Title: '',
                TargetedKeywords: '',
                Education: '',
                Certification: '',
                Contact: ''
            });
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                    type="text"
                    name="Name"
                    value={profile.Name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    name="Title"
                    value={profile.Title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Targeted Keywords:</label>
                <input
                    type="text"
                    name="TargetedKeywords"
                    value={profile.TargetedKeywords}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Education:</label>
                <input
                    type="text"
                    name="Education"
                    value={profile.Education}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Certification:</label>
                <input
                    type="text"
                    name="Certification"
                    value={profile.Certification}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Contact:</label>
                <input
                    type="text"
                    name="Contact"
                    value={profile.Contact}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {error && <p className="mt-2 text-red-600">{error}</p>}
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Submit</button>
        </form>
    );
};

export default ProfileForm;
