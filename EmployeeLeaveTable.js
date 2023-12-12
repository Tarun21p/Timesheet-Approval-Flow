import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLeaveApplicationTable = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee's leave applications from the server
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8094/api/leave');
      setLeaveApplications(response.data);
    } catch (error) {
      console.error('Error fetching leave applications:', error);
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
          onClick={() => navigate("/leave")}
        >
          Apply for Leave
        </button>
      </nav>
      <hr />
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '1000px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Employee Leave Applications</h2>

          {leaveApplications.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Leave Type</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Rejection Reason</th>
                </tr>
              </thead>
              <tbody>
                {leaveApplications.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.id}</td>
                    <td>{leave.name}</td>
                    <td>{leave.date}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td style={getStatusStyle(leave.status)}>{leave.status}</td>
                    <td>{leave.rejectionReason || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No leave applications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveApplicationTable;
