import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8094/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Assuming the backend returns a user type (employee or manager)
        if (userData.userType === 'employee') {
          // Redirect to the employee dashboard
          navigate('/employee-dashboard');
        } else if (userData.userType === 'manager') {
          // Redirect to the manager dashboard
          navigate('/manager-dashboard');
        } else {
          // Handle other user types if needed
        }
      } else {
        // Handle authentication failure, show an error message, etc.
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '400px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
