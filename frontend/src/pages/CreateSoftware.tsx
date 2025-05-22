import React, { useState } from 'react';
import axios from 'axios';

export default function CreateSoftware() {
  const [form, setForm] = useState({ name: '', description: '', accessLevels: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/software', {
      ...form,
      accessLevels: form.accessLevels.split(',')
    });
    window.location.href = '/welcome';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Software</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Access levels (comma separated)" onChange={(e) => setForm({ ...form, accessLevels: e.target.value })} />
      <button type="submit">Create</button>
    </form>
  );
}