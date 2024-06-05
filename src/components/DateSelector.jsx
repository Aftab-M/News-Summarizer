import React from 'react';

const DateSelector = ({ setDate }) => {
  return (
    <div className="mb-4">
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default DateSelector;
