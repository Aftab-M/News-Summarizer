import React, { useState } from 'react';

const Header = ({ setLanguage }) => {
  return (
    <header className="bg-blue-600 p-4 flex items-center justify-between">
      <div className="text-white text-2xl">Logo</div>
      <div className="flex-1 mx-4 flex justify-center">
        <input 
          type="text" 
          placeholder="Search a topic..." 
          className="w-1/2 p-2 text-center shadow-blue-900 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
        />
      </div>
      <div>
        <select 
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
