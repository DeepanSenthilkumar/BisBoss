import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import IMG1 from '../assets/IMG1.jpg';
import Header from './Header';

export default function SalesForm() {
  const { user, isAuthenticated } = useAuth0();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shopName, setShopName] = useState('Loading...');
  const [billNumber, setBillNumber] = useState('');
  const [bill, setBill] = useState('');
  const [paid, setPaid] = useState('');
  const [balance, setBalance] = useState('00');
  const [userID, setUserID] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Generate a unique bill number
  const generateBillNumber = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    let billCount = parseInt(localStorage.getItem('billCount')) || 0;
    const billPrefix = billCount >= 1000 ? 'B' : 'A';
    const billNumber = `${currentYear}${currentMonth}${currentDay}-${billPrefix}${String(billCount).padStart(3, '0')}`;
    localStorage.setItem('billCount', billCount + 1);
    return billNumber;
  };

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

  useEffect(() => {
    setBillNumber(generateBillNumber());
  }, []);

  // Update balance dynamically
  useEffect(() => {
    const calculatedBalance = (parseFloat(bill) || 0) - (parseFloat(paid) || 0);
    setBalance(calculatedBalance.toFixed(2));
  }, [bill, paid]);

  const handleSubmit = async (paymentMethod) => {
    if (!bill || !paid || userID === null) {
      alert('Please fill in all fields and ensure the user is loaded.');
      return;
    }

    const saleData = {
      userID, // Use the userID fetched from the backend
      billNumber,
      totalBill: parseFloat(bill),
      paidAmount: parseFloat(paid),
      balance: parseFloat(balance),
      paymentType: paymentMethod,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    console.log('Submitting sale data:', saleData); // Debugging log

    try {
      const response = await fetch('http://localhost:5000/api/sales/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData),
      });

      const result = await response.json();
      if (response.ok) {
        // Show a popup notification for success
        const popup = document.createElement('div');
        popup.innerText = 'Sale recorded successfully!';
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
        setBill('');
        setPaid('');
        setBalance('00');
        setBillNumber(generateBillNumber());
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting sale:', error);
      alert('Failed to record sale. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-poppins"
      style={{ backgroundImage: `url(${IMG1})` }}
    >
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4 bg-white bg-opacity-100 shadow-md">
        <div>
          <h1 className="text-xl font-bold">Bisboss</h1>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
        </div>
        <button onClick={toggleSidebar} className="text-gray-800">
          <i className="fas fa-user w-8 h-8 rounded-full border border-gray-300 text-xl"></i>
        </button>
      </header> */}
        <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Body */}
      <main className="p-6">
        {/* User Shop Details */}
        <div className="text-center text-2xl font-semibold text-orange-500 mb-6">
          {shopName}
        </div>

        {/* Sales Form */}
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <input
                type="text"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="Bill"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <input
                type="text"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                placeholder="Paid"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <input
                type="text"
                value={balance}
                readOnly
                placeholder="Balance"
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Payment Method Buttons */}
          <div className="mt-6 flex justify-between space-x-4 fixed bottom-20 left-0 right-0 bg-white bg-opacity-10 shadow-md p-4">
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
      </main>
    </div>
  );
}
