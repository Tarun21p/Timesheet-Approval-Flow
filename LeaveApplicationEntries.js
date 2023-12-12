import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const LeaveApplicationEntries = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Fetch leave applications from the server
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

  const handleAction = (application, action) => {
    setSelectedApplication(application);
    if (action === 'Rejected') {
      setRejectionReason('');
      setShowRejectionModal(true);
    } else {
      // Update the status on the server
      updateApplicationStatus(application.id, action);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.put(`http://localhost:8094/api/leave/update/${applicationId}?status=${ status }`);
      fetchLeaveApplications(); // Fetch updated applications
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const updateApplicationStatusWithReason = async (applicationId, status, reason) => {
    try {
      await axios.put(
        `http://localhost:8094/api/leave/update/${applicationId}?status=${status}&rejectionReason=${encodeURIComponent(reason)}`,
        { status, rejectionReason: reason }
      );
      fetchLeaveApplications(); // Fetch updated applications
    } catch (error) {
      console.error('Error updating application status with reason:', error);
    }
  };

  const handleRejectionSubmit = () => {
    // Implement logic to update rejection reason on the server
    // For now, let's just update the reason locally (simulated)
    const updatedApplication = { ...selectedApplication, status: 'Rejected', rejectionReason };
    updateApplicationStatusWithReason(selectedApplication.id, 'Rejected', rejectionReason);
    setLeaveApplications((prevApplications) =>
      prevApplications.map((app) => (app.id === selectedApplication.id ? updatedApplication : app))
    );
    setShowRejectionModal(false);
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
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '1000px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Leave Applications</h2>
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                <th scope="col">Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((application, index) => (
                <tr key={index}>
                  <td>{application.id}</td>
                  <td>{application.date}</td>
                  <td>{application.name}</td>
                  <td>{application.leaveType}</td>
                  <td>{application.startDate}</td>
                  <td>{application.endDate}</td>
                  <td style={getStatusStyle(application.status)}>{application.status}</td>
                  <td>
                    {application.status === 'Pending' && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAction(application, 'Accepted')}
                        >
                          Accept
                        </button>
                        <span className="ml-2 mr-2"></span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAction(application, 'Rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                  <td>{application.rejectionReason || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for rejection reason */}
          <Modal show={showRejectionModal} onHide={() => setShowRejectionModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Reason for Rejection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={`Enter reason for rejection...`}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowRejectionModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleRejectionSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationEntries;
