
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const EmployeeLeaveApplication = () => {
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [leaveType, setLeaveType] = useState('Medical');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [alert, setAlert] = useState({ variant: '', message: '' });

  const handleSubmit = async () => {
    try {
      // Send a POST request to submit leave application data
      const response = await axios.post('http://localhost:8094/api/leave/submit', {
        id,
        date,
        name,
        leaveType,
        reason,
        startDate,
        endDate,
     
      });

       // Handle the response if needed
       console.log('Response:', response.data);
      // Update local state with the submitted entry
      setLeaveApplications([...leaveApplications, response.data]);

      // Clear the form fields after submission
      setId('');
      setDate('');
      setName('');
      setLeaveType('Medical');
      setReason('');
      setStartDate('');
      setEndDate('');

      // Display success alert
      setAlert({ variant: 'success', message: 'Leave application submitted successfully!' });
    } catch (error) {
      console.error('Error during leave application submission:', error);

      // Display error alert
      setAlert({ variant: 'danger', message: 'Error submitting leave application. Please try again.' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '800px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Leave Application</h2>

          {alert.message && (
            <Alert variant={alert.variant} onClose={() => setAlert({ variant: '', message: '' })} dismissible>
              {alert.message}
            </Alert>
          )}

          <form>
          <div className="mb-3">
              <label htmlFor="id" className="form-label text-dark">
                ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label text-dark">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-dark">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="leaveType" className="form-label text-dark">
                Leave Type:
              </label>
              <select
                className="form-select"
                id="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="Select" select>Select</option>
                <option value="Medical">Medical Leave</option>
                <option value="Personal">Personal Leave</option>
                <option value="Vacation">Vacation Leave</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label text-dark">
                Reason:
              </label>
              <textarea
                className="form-control"
                id="reason"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label text-dark">
                Start Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label text-dark">
                End Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
           

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveApplication;
