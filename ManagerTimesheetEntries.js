import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ManagerTimesheetEntries = () => {
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Fetch manager's timesheet entries from the server
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

  const handleAction = (entryId, action) => {
    setSelectedEntry(entryId);
    setAction(action);
    if (action === 'Accepted') {
      // Directly update the entry status without prompting for a reason
      updateEntryStatus(entryId, action);
      handleModalClose();
    } else {
      // For rejection, show the modal to enter the reason
      setShowModal(true);
    }
  };

  const updateEntryStatus = async (entryId, status) => {
    try {
      // Update the status to 'Approved' when 'Accepted' action is received
      const updatedStatus = status === 'Accepted' ? 'Approved' : status;

      await axios.put(`http://localhost:8094/api/entry/update/${entryId}?status=${updatedStatus}`);
      fetchTimesheetEntries(); // Fetch updated entries
    } catch (error) {
      console.error('Error updating entry status:', error);
    }
  };

  const updateEntryStatusWithReason = async (entryId, status, reason) => {
    try {
      await axios.put(`http://localhost:8094/api/entry/update/${entryId}?status=${status}&rejectionReason=${encodeURIComponent(reason)}`);
      fetchTimesheetEntries(); // Fetch updated entries
    } catch (error) {
      console.error('Error updating entry status with reason:', error);
    }
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEntry(null);
    setAction('');
    setRejectionReason('');
  };

  const handleModalSubmit = () => {
    // Implement logic to update entry status and reason on the server
    if (action === 'Rejected') {
      updateEntryStatusWithReason(selectedEntry, action, rejectionReason);
    } else {
      updateEntryStatus(selectedEntry, action);
    }
    handleModalClose();
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '1000px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Manager Timesheet Entries</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Activity</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {timesheetEntries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.start_date}</td>
                  <td>{entry.end_date}</td>
                  <td>{entry.activity}</td>
                  <td>{entry.hours}</td>
                  <td style={getStatusStyle(entry.status)}>{entry.status}</td>
                  <td>
                    {(entry.status === 'Pending' || entry.status === 'Submitted') && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAction(entry.id, 'Accepted')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleAction(entry.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for rejection reason */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>{`Enter Reason for ${action}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={`Enter reason for ${action.toLowerCase()}...`}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleModalSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManagerTimesheetEntries;
