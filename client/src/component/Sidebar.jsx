import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
    toggleSidebar();
  };

  return (
    isOpen && (
      <div className="absolute top-0 right-0 bg-white shadow-lg w-2/3 h-full p-4 z-50">
        <button className="text-red-500 mb-4" onClick={toggleSidebar}>
          Close
        </button>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="text-blue-500" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/sales" className="text-blue-500" onClick={toggleSidebar}>
              Sales Form
            </Link>
          </li>
          <li>
            <Link to="/real" className="text-blue-500" onClick={toggleSidebar}>
              Realtime View
            </Link>
          </li>
          <li>
            <button
              onClick={handleBack}
              className="text-blue-500 hover:text-blue-600"
            >
              Back
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                logout({
                  returnTo: window.location.origin, // Redirect to home after logout
                })
              }
              className="text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
