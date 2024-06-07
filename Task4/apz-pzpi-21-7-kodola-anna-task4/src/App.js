import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import Profile from './components/Profile';
import ProtectedRoute from './ProtectedRoute';
import CreateMedicalRecord from './components/CreateMedicalRecord';
import MedicalRecordList from './components/MedicalRecordList';
import EditMedicalRecord from './components/EditMedicalRecord';
import CreateSchedule from './components/CreateSchedule';
import ScheduleList from './components/ScheduleList';
import EditSchedule from './components/EditSchedule';
import CreateAppointment from './components/CreateAppointment';
import AppointmentHistory from './components/AppointmentHistory';
import DoctorAppointments from './components/DoctorAppointments';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import PaymentPage from './components/PaymentPage';
import QrReaderComponent from './components/QrReaderComponent';
import PatientRecords from './components/PatientRecords';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>}/>
                        <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard/></ProtectedRoute>}/>
                        <Route path="/patient" element={<ProtectedRoute role="patient"><PatientDashboard/></ProtectedRoute>}/>
                        <Route path="/create-schedule" element={<ProtectedRoute role="admin"><CreateSchedule/></ProtectedRoute>}/>
                        <Route path="/view-schedules" element={<ProtectedRoute roles={['admin', 'doctor']}><ScheduleList /></ProtectedRoute>} />
                        <Route path="/edit-schedule/:id" element={<ProtectedRoute role="admin"><EditSchedule /></ProtectedRoute>} />
                        <Route path="/create-medical-record" element={<ProtectedRoute role="doctor"><CreateMedicalRecord /></ProtectedRoute>} />
                        <Route path="/edit-medical-record/:id" element={<ProtectedRoute role="doctor"><EditMedicalRecord /></ProtectedRoute>} />
                        <Route path="/medical-records" element={<ProtectedRoute><MedicalRecordList /></ProtectedRoute>} />
                        <Route path="/create-appointment" element={<ProtectedRoute role="patient"><CreateAppointment/></ProtectedRoute>}/>
                        <Route path="/appointment-history" element={<ProtectedRoute role="patient"><AppointmentHistory/></ProtectedRoute>}/>
                        <Route path="/pay/:appointmentId" element={<ProtectedRoute role="patient"><PaymentPage /></ProtectedRoute>} />
                        <Route path="/doctor-appointments" element={<ProtectedRoute role="doctor"><DoctorAppointments /></ProtectedRoute>} />
                        <Route path="/user-list" element={<ProtectedRoute role="admin"><UserList /></ProtectedRoute>} />
                        <Route path="/edit-user/:id" element={<ProtectedRoute role="admin"><EditUser /></ProtectedRoute>} />
                        <Route path="/scan-qr" element={<QrReaderComponent />} />
                        <Route path="/patient-record/:patient_id" element={<PatientRecords />} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
);
}

export default App;
