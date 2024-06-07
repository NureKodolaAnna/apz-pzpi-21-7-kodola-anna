import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './CreateAppointment.css';

const CreateAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        services: []
    });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/doctors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };

        fetchDoctors();
    }, [token]);

    const handleDoctorChange = async (e) => {
        const { name, value } = e.target;
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        });

        try {
            const response = await axios.get('http://localhost:3000/api/schedules/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const doctorSchedules = response.data.filter((schedule) => schedule.doctor_id._id === value);
            setSchedules(doctorSchedules);
            const uniqueDates = [...new Set(doctorSchedules.map(schedule => schedule.date))];
            setAvailableDates(uniqueDates);
            setAvailableTimes([]);
        } catch (error) {
            console.error('Failed to fetch schedules:', error);
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        });

        const selectedDateSchedule = schedules.filter(schedule => schedule.date === value);
        const times = [];
        selectedDateSchedule.forEach(schedule => {
            let currentTime = schedule.start_time;
            while (currentTime < schedule.end_time) {
                times.push(currentTime);
                const [hours, minutes] = currentTime.split(':');
                const newMinutes = parseInt(minutes) + 30;
                if (newMinutes >= 60) {
                    currentTime = `${parseInt(hours) + 1}:00`;
                } else {
                    currentTime = `${hours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;
                }
            }
        });
        setAvailableTimes(times);
    };

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAppointmentData({
                ...appointmentData,
                services: [...appointmentData.services, value]
            });
        } else {
            setAppointmentData({
                ...appointmentData,
                services: appointmentData.services.filter(service => service !== value)
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { doctor_id, appointment_date, appointment_time, services } = appointmentData;
        const patient_id = jwtDecode(token).userId;

        try {
            await axios.post(
                'http://localhost:3000/api/appointments/create',
                { patient_id, doctor_id, appointment_date, appointment_time, services },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate('/view-appointments');
        } catch (error) {
            setError('Failed to create appointment');
        }
    };

    return (
        <div className="create-appointment-form">
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Doctor</label>
                    <select name="doctor_id" value={appointmentData.doctor_id} onChange={handleDoctorChange} required>
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.first_name} {doctor.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                {availableDates.length > 0 && (
                    <div className="form-group">
                        <label>Date</label>
                        <select name="appointment_date" value={appointmentData.appointment_date} onChange={handleDateChange} required>
                            <option value="">Select a date</option>
                            {availableDates.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {availableTimes.length > 0 && (
                    <div className="form-group">
                        <label>Time</label>
                        <select name="appointment_time" value={appointmentData.appointment_time} onChange={handleChange} required>
                            <option value="">Select a time</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="form-group">
                    <label>Services</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                value="Ultrasound"
                                onChange={handleServiceChange}
                            />
                            Ultrasound (+300 UAH)
                        </label>
                    </div>
                </div>
                <button type="submit">Create Appointment</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default CreateAppointment;
