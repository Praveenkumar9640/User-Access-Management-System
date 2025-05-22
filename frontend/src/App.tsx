
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import WelcomePage from './pages/Welcome';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import CreateSoftware from './pages/CreateSoftware';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/create-software" element={<CreateSoftware />} />
      </Routes>
    </Router>
  );
}

export default App;
