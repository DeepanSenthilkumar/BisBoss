import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import Header from './Header';
import IMG1 from '../assets/IMG1.jpg';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shopName, setShopName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false); // Track if the user is new or not
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserDetails = async () => {
        const url = `http://localhost:5000/api/users/getUserDetailsByEmail/${user.email}`;
        console.log('Request URL:', url);

        try {
          const response = await fetch(url);
          console.log('Response Status:', response.status);

          if (!response.ok) {
            console.error('Failed to fetch user details:', response.statusText);
            return;
          }

          const data = await response.json();
          console.log('Response Data:', data);

          // Check if user exists in DB
          if (data.user && data.user.length > 0) {
            setShopName(data.user[0].shopName); // Set shopName from the first user in the array
          } else {
            setIsNewUser(true); // Mark as new user if no data found
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      };

      fetchUserDetails();
    }
  }, [isAuthenticated, user]);

  // Navigate to user form
  const handleGetStartedClick = () => {
    navigate('/user');
  };

  // Navigate to Sales Form
  const handleSalesClick = () => {
    navigate('/sales');
  };

  // Navigate to Realtime View
  const handleRealtimeViewClick = () => {
    navigate('/real');
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative font-poppins" style={{ backgroundImage: `url(${IMG1})` }}>
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Body */}
      <main className="p-4 md:p-6">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : isNewUser ? (
          // If the user is new, show this view with a centered container
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-orange-500">BisBoss</h1>
              <p className="text-lg text-gray-700">Maintain your sales information with one touch</p>
              <p className="text-md text-gray-500">Please fill the details to get started</p>
              <button
                onClick={handleGetStartedClick}
                className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg hover:bg-orange-600 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        ) : (
          // If the user exists, show the full dashboard
          <div className="space-y-6">
            <div className="text-center text-xl font-semibold text-orange-500 mb-6">
              {shopName ? shopName : 'Loading...'}
            </div>
            <div className="grid gap-4">
              <button
                onClick={handleRealtimeViewClick}
                className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between w-full hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="font-bold text-gray-800">Realtime View</h3>
                  <p className="text-sm text-gray-500">View real-time data</p>
                </div>
                <span className="bg-orange-500 text-white px-4 py-2 rounded-lg">Add</span>
              </button>
              <button
                onClick={handleSalesClick}
                className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between w-full hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="font-bold text-gray-800">Sales Form</h3>
                  <p className="text-sm text-gray-500">Fill out sales details</p>
                </div>
                <span className="bg-orange-500 text-white px-4 py-2 rounded-lg">Add</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
