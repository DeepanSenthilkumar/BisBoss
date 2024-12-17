import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import IMG1 from '../assets/IMG1.jpg';
import Header from './Header';

export default function RealtimeView() {
  const { user, isAuthenticated } = useAuth0();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shopName, setShopName] = useState('Loading...');
  const [userID, setUserID] = useState(null); // Store userID here
  const [filterType, setFilterType] = useState('Today');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Fetch user details and set userID from backend response
  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/getUserDetailsByEmail/${user.email}`
          );
          const data = await response.json();
          if (response.ok && data.user.length > 0) {
            setShopName(data.user[0].shopName || 'Unnamed Shop');
            setUserID(data.user[0].userID); // Set userID from response
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

  // Function to fetch sales data based on filters
  const fetchSalesData = async () => {
    if (!userID) return; // Ensure userID is available before making request

    let url = `http://localhost:5000/api/sales/sales/full-data?userID=${userID}`;

    // Handle filters based on the selected type
    if (filterType === 'Weekly') {
      // Calculate the date range for the last 7 days
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const startDate = lastWeek.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const endDate = today.toISOString().split('T')[0];
      url += `&startDate=${startDate}&endDate=${endDate}`;
    } else if (filterType === 'Daily' && fromDate && toDate) {
      url += `&startDate=${fromDate}&endDate=${toDate}`;
    } else if (filterType === 'Today') {
      const today = new Date().toISOString().split('T')[0]; // Today's date
      url += `&date=${today}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setSalesData(data.records || []);
      } else {
        console.error('Error fetching sales data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [filterType, fromDate, toDate, userID]); // Trigger on userID change

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = salesData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(salesData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        {/* Shop Name */}
        <div className="text-center text-xl font-semibold text-orange-500 mb-6">
          {shopName}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-2 text-orange-500">
            <input
              type="radio"
              id="today"
              name="filterType"
              value="Today"
              checked={filterType === 'Today'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <label htmlFor="today ">Today</label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500">
            <input
              type="radio"
              id="weekly"
              name="filterType"
              value="Weekly"
              checked={filterType === 'Weekly'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <label htmlFor="weekly">Weekly</label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500">
            <input
              type="radio"
              id="daily"
              name="filterType"
              value="Daily"
              checked={filterType === 'Daily'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <label htmlFor="daily">From - To</label>
          </div>
          {filterType === 'Daily' && (
            <>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </>
          )}
          <button onClick={fetchSalesData} className="p-2 bg-orange-500 text-white rounded-lg shadow-md">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Summary Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Total No. of Bills:</p>
            <p>{salesData.length}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Total Bill:</p>
            <p>
              {salesData.reduce((sum, sale) => sum + parseFloat(sale.totalBill || 0), 0)}
            </p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Total Paid:</p>
            <p>
              {salesData.reduce((sum, sale) => sum + parseFloat(sale.paidAmount || 0), 0)}
            </p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Debit:</p>
            <p>
              {salesData.reduce((sum, sale) => sum + parseFloat(sale.balance || 0), 0)}
            </p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Bill No</th>
                <th className="p-2 border">Bill</th>
                <th className="p-2 border">Paid</th>
                <th className="p-2 border">Balance</th>
                <th className="p-2 border">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((sale, index) => (
                <tr key={index}>
                  <td className="p-2 border">{sale.billNumber}</td>
                  <td className="p-2 border">{sale.totalBill}</td>
                  <td className="p-2 border">{sale.paidAmount}</td>
                  <td className="p-2 border">{sale.balance}</td>
                  <td className="p-2 border">{sale.paymentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}