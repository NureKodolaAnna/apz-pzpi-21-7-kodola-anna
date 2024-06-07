import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientRecords = () => {
    const { patient_id } = useParams();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/patient/${patient_id}`);
                setRecords(response.data);
            } catch (err) {
                setError('Failed to fetch medical records');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [patient_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Medical Records for Patient ID: {patient_id}</h1>
            {records.length === 0 ? (
                <div>No medical records found</div>
            ) : (
                <ul>
                    {records.map(record => (
                        <li key={record._id}>
                            <p><strong>Date:</strong> {record.date}</p>
                            <p><strong>Time:</strong> {record.time}</p>
                            <p><strong>Description:</strong> {record.description}</p>
                            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                            <p><strong>Treatment:</strong> {record.treatment}</p>
                            <p><strong>Doctor:</strong> {record.doctor_id.first_name} {record.doctor_id.last_name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientRecords;
