import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white bg-opacity-100 shadow-md">
      <div>
        <h1 className="text-xl font-bold">Bisboss</h1>
        <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
      </div>
      <button onClick={toggleSidebar} className="text-gray-800">
        <i className="fas fa-user w-8 h-8 rounded-full border border-gray-300 text-xl"></i>
      </button>
    </header>
  );
};

export default Header;
