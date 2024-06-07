import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AppointmentHistory.css';

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/appointments/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
                setError('Failed to fetch appointments');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="appointment-history">
            <h2>Appointment History</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <strong>Doctor:</strong> {appointment.doctor_id.first_name} {appointment.doctor_id.last_name}
                            <strong>Date:</strong> {appointment.appointment_date}
                            <strong>Time:</strong> {appointment.appointment_time}
                            <strong>Services:</strong> {appointment.services.join(', ')}
                            <strong>Total Price:</strong> {appointment.total_price} грн
                            <strong>Status:</strong> {appointment.status}
                            {appointment.status === 'unpaid' && (
                                <button onClick={() => navigate(`/pay/${appointment._id}`)}>Pay</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentHistory;
