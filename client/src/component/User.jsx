import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import Header from './Header';
import IMG1 from '../assets/IMG1.jpg';

export default function UserForm() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0(); 
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate after form submission

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to Auth0 login if user is not authenticated
      return;
    }

    // Get email from Auth0
    const auth0Email = user?.email;

    // If email is found, proceed to send form data
    if (auth0Email) {
      const userData = { userID, name, shopName, email: auth0Email };

      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Success message from backend
          // After successful form submission, navigate to the dashboard
          navigate('/dashboard'); 
        } else {
          console.error('Error:', response.statusText); // Error handling
        }
      } catch (error) {
        console.error('Error:', error); // Catch network errors
      }
    }

    // Reset the form fields
    setUserID('');
    setName('');
    setShopName('');
    setEmail('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-poppins"
      style={{ backgroundImage: `url(${IMG1})` }}
    >
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Body */}
      <main className="p-6">
        <div className="text-center text-xl font-semibold text-orange-500 mb-6">
          User Form
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">User ID</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              placeholder="User ID"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Shop Name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              disabled // Email is disabled as we get it from Auth0
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
