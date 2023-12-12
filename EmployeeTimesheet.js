import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

const EmployeeTimesheet = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [start_date, setStart_Date] = useState('');
  const [end_date, setEnd_Date] = useState('');
  const [activity, setActivity] = useState('');
  const [hours, setHours] = useState('');
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [alert, setAlert] = useState({ variant: '', message: '' });

  const handleSubmit = async () => {
    try {
      // Send a POST request to your backend API to store timesheet data
      const response = await axios.post('http://localhost:8094/api/entry/submit', {
        id,
        name,
        start_date,
        end_date,
        activity,
        hours,
        status: 'Pending Approval',
      });

      // Handle the response if needed
      console.log('Response:', response.data);

      // Update the local state with the submitted entry
      setTimesheetEntries([...timesheetEntries, response.data]);

      // Clear the form fields after submission
      setId('');
      setStart_Date('');
      setEnd_Date('');
      setName('');
      setActivity('');
      setHours('');

      // Display success alert
      setAlert({ variant: 'success', message: 'Timesheet submitted successfully!' });
    } catch (error) {
      console.error('Error during timesheet submission:', error);

      // Display error alert
      setAlert({ variant: 'danger', message: 'Error submitting timesheet. Please try again.' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '800px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Employee Timesheet</h2>

          {/* Display alert if there is a message */}
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
              <label htmlFor="date" className="form-label text-dark">
                Start_Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={start_date}
                onChange={(e) => setStart_Date(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label text-dark">
                End_Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={end_date}
                onChange={(e) => setEnd_Date(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="activity" className="form-label text-dark">
                Activity:
              </label>
              <input
                type="text"
                className="form-control"
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hours" className="form-label text-dark">
                Hours:
              </label>
              <input
                type="text"
                className="form-control"
                id="hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
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

export default EmployeeTimesheet;
