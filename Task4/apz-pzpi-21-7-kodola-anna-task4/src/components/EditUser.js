import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        role: 'patient'
    });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (error) {
                setError('Failed to fetch user');
            }
        };

        fetchUser();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/update/${id}`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/user-list');
        } catch (error) {
            setError('Failed to update user');
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="edit-user-form">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select name="role" value={userData.role} onChange={handleChange} required>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Update User</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default EditUser;
