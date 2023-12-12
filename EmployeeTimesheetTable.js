import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeTimesheetTable = () => {
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee's timesheet entries from the server
    fetchTimesheetEntries();
  }, []);

  const fetchTimesheetEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8094/api/entry');
      setTimesheetEntries(response.data);
    } catch (error) {
      console.error('Error fetching timesheet entries:', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return { color: 'green' };
      case 'Rejected':
        return { color: 'red' };
      case 'Pending':
        return { color: 'orange' };
      default:
        return {};
    }
  };

  return (
    <div className="container mt-5">
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/ts")}
        >
          Add new entry
        </button>
      </nav>
      <hr />
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '1000px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Employee Timesheet Table</h2>

          {timesheetEntries.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Hours</th>
                  <th scope="col">Status</th>
                  <th scope="col">Rejection Reason</th>
                </tr>
              </thead>
              <tbody>
                {timesheetEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.id}</td>
                    <td>{entry.name}</td>
                    <td>{entry.start_date}</td>
                    <td>{entry.end_date}</td>
                    <td>{entry.activity}</td>
                    <td>{entry.hours}</td>
                    <td style={getStatusStyle(entry.status)}>{entry.status}</td>
                    <td>{entry.rejectionReason || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No timesheet entries available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTimesheetTable;
