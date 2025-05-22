import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [form, setForm] = useState({ softwareId: '', accessType: 'Read', reason: '' });

  useEffect(() => {
    axios.get('/api/software').then(res => setSoftwareList(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/requests', form);
    window.location.href = '/welcome';
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setForm({ ...form, softwareId: e.target.value })}>
        <option value=''>Select software</option>
        {softwareList.map((s: any) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <select onChange={(e) => setForm({ ...form, accessType: e.target.value })}>
        <option>Read</option><option>Write</option><option>Admin</option>
      </select>
      <textarea placeholder="Reason" onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      <button type="submit">Submit Request</button>
    </form>
  );
}
