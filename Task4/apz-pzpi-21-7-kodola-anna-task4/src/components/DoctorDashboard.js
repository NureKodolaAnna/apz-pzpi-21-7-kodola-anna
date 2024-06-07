import React from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <p>Welcome, doctor! Here you can view your appointments and manage patient records.</p>
            <Link to="/create-medical-record">Create Medical Record</Link>
        </div>
    );
};

export default DoctorDashboard;
