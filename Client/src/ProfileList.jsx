// client/src/ProfileList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = async () => {
        const response = await fetch('http://localhost:3002/api/profiles');
        const data = await response.json();
        setProfiles(data);
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Profiles List</h2>
            <ul className="space-y-4">
                {profiles.map((profile, index) => (
                    <li key={index} className="p-4 border border-gray-300 rounded-md bg-gray-50">
                        <h3 className="text-lg font-semibold">{profile.Name}</h3>
                        <p><strong>Title:</strong> {profile.Title}</p>
                        <p><strong>Targeted Keywords:</strong> {profile.TargetedKeywords}</p>
                        <p><strong>Education:</strong> {profile.Education}</p>
                        <p><strong>Certification:</strong> {profile.Certification}</p>
                        <p><strong>Contact:</strong> {profile.Contact}</p>
                    </li>
                ))}
            </ul>
            <Link to="/submit" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
                Submit New Profile
            </Link>
        </div>
    );
};

export default ProfileList;
