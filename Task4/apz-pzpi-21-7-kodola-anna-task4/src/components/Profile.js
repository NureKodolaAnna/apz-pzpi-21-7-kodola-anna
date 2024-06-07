import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to fetch user profile');
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
};

export default Profile;
