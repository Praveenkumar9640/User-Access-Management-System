import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const message = role === 'Employee' ? 'Wait manager will respond'
                : role === 'Admin' ? 'Complete the software creation'
                : '';

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome Page</h2>
      <p>{message}</p>
      <button onClick={() => navigate('/request-access')}>Employee</button>
      <button onClick={() => navigate('/pending-requests')}>Manager</button>
      <button onClick={() => navigate('/create-software')}>Admin</button>
    </div>
  );
}
