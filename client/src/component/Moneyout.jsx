import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import IMG1 from '../assets/IMG1.jpg';
import Header from './Header';

export default function Moneyout() {
  const { user, isAuthenticated } = useAuth0();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shopName, setShopName] = useState('Loading...');
  const [userID, setUserID] = useState(null);

  const [receiverName, setReceiverName] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Fetch user details and userID
  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserDetails = async () => {
        const url = `http://localhost:5000/api/users/getUserDetailsByEmail/${user.email}`;
        console.log('Fetching user details from:', url);

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (response.ok && data.user.length > 0) {
            setShopName(data.user[0].shopName || 'Unnamed Shop');
            setUserID(data.user[0].userID); // Set userID from the fetched data
          } else {
            setShopName('No Shop Name Found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setShopName('Error Fetching Shop Name');
        }
      };

      fetchUserDetails();
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (paymentType) => {
    if (!receiverName || !paidAmount || !purpose || userID === null) {
      alert('Please fill in all fields and ensure the user is loaded.');
      return;
    }

    const moneyoutData = {
      userID,
      payee: receiverName,
      paidAmount: parseFloat(paidAmount),
      reason: purpose,
      paymentType,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    console.log('Submitting moneyout data:', moneyoutData); // Debugging log

    try {
      const response = await fetch('http://localhost:5000/api/moneyout/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moneyoutData),
      });

      const result = await response.json();
      if (response.ok) {
        // Show a popup notification for success
        const popup = document.createElement('div');
        popup.innerText = 'Money out record added successfully!';
        popup.style.position = 'fixed';
        popup.style.bottom = '20px';
        popup.style.right = '20px';
        popup.style.backgroundColor = '#4CAF50';
        popup.style.color = '#fff';
        popup.style.padding = '10px';
        popup.style.borderRadius = '5px';
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 3000); // Remove popup after 3 seconds

        // Reset fields
        setReceiverName('');
        setPaidAmount('');
        setPurpose('');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting moneyout record:', error);
      alert('Failed to record moneyout. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-poppins"
      style={{ backgroundImage: `url(${IMG1})` }}
    >
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Body */}
      <main className="p-6">
        {/* User Shop Details */}
        <div className="text-center text-2xl font-semibold text-orange-500 mb-6">
          {shopName}
        </div>

        {/* Moneyout Form */}
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="block text-lg font-medium text-orange-500">
                Receiver Name
              </label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                // placeholder="Receiver Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-orange-700">
                Paid Amount
              </label>
              <input
                type="text"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                // placeholder="Paid Amount"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-orange-500">
                Purpose
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                // placeholder="Purpose"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Payment Method Buttons */}
          <div className="fixed bottom-20 left-0 right-0 bg-white bg-opacity-10 shadow-md p-4">
            <div className='text-center text-xl font-semibold text-orange-500 mb-6'>
                <p>Paid By</p>
            </div>

            <div className='mt-6 flex justify-between space-x-4'>
            <button
              onClick={() => handleSubmit('Cash')}
              className="w-full md:w-1/2 bg-white text-black py-2 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-all"
            >
              Cash
            </button>
            <button
              onClick={() => handleSubmit('Online')}
              className="w-full md:w-1/2 bg-white text-black py-2 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-all"
            >
              Online
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
