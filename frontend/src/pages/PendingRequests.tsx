import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('/api/requests/pending').then(res => setRequests(res.data));
  }, []);

  const handleDecision = async (id: number, decision: 'Approved' | 'Rejected') => {
    await axios.patch(`/api/requests/${id}`, { status: decision });
    window.location.href = '/welcome';
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map((req: any) => (
        <div key={req.id}>
          <p>{req.user.username} requests {req.accessType} on {req.software.name}</p>
          <button onClick={() => handleDecision(req.id, 'Approved')}>Approve</button>
          <button onClick={() => handleDecision(req.id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}
