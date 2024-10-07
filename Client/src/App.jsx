// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Professional Profile Management</h1>
                <Routes>
                    <Route path="/" element={<ProfileList />} />
                    <Route path="/submit" element={<ProfileForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
