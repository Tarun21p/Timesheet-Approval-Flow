import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  // Sample user data
  const userData = {
    name: 'John Doe',
    id: 'EMP123',
    joiningDate: '2022-01-01',
    department: 'IT',
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12 bg-success text-light p-3 d-flex justify-content-between align-items-center">
          <div>
            <h2>Employee Dashboard</h2>
          </div>
          <div>
            <button className="btn btn-light mr-2" onClick={toggleDetails}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {userData.name}
            </button>
            <Link to="/" className="btn btn-danger">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Link>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employee Details</h5>
                <p>
                  <strong>ID:</strong> {userData.id}
                </p>
                <p>
                  <strong>Joining Date:</strong> {userData.joiningDate}
                </p>
                <p>
                  <strong>Department:</strong> {userData.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row mt-3">
        <div className="col-12">
          <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="ts" className="text-decoration-none text-dark">
                  TimeSheet
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="ts-table" className="text-decoration-none text-dark">
                  TimeSheet Entries Table
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="leave" className="text-decoration-none text-dark">
                  Leave Application
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="leave-table" className="text-decoration-none text-dark">
                  Leave Application Entries Table
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="holidays" className="text-decoration-none text-dark">
                  Holidays Calendar
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
