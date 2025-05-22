import React from 'react';  

const Navbar: React.FC = () => {
  return (
    <nav>
      <a href="/signup" style={{ marginRight: '10px' }}>Signup</a>
      <a href="/login">Login</a>
    </nav>
  );
};

export default Navbar;  
