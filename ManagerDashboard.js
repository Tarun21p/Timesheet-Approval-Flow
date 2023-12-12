import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
  // Sample manager data
  const managerData = {
    name: 'Manager Smith',
    id: 'MGR789',
    joiningDate: '2021-05-15',
    department: 'Management',
    team: 'Development Team',
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12 bg-primary text-light p-3 d-flex justify-content-between align-items-center">
          <div>
            <h2>Manager Dashboard</h2>
          </div>
          <div>
            <button className="btn btn-light mr-2" onClick={toggleDetails}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {managerData.name}
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
                <h5 className="card-title">Manager Details</h5>
                <p>
                  <strong>ID:</strong> {managerData.id}
                </p>
                <p>
                  <strong>Joining Date:</strong> {managerData.joiningDate}
                </p>
                <p>
                  <strong>Department:</strong> {managerData.department}
                </p>
                <p>
                  <strong>Team:</strong> {managerData.team}
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
                <Link to="timesheet-entries" className="text-decoration-none text-dark">
                  TimeSheet Entries
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="leave-entries" className="text-decoration-none text-dark">
                  Leave Applications Entries
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

export default ManagerDashboard;
