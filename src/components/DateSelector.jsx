import React, { useEffect, useState } from 'react';

const DateSelector = ({ setDate }) => {

    const [selectedDate, setSelectedDate] = useState('');
    // const todayDate = new Date().toISOString().split('T')[0];
    const todayDate = "2024-05-06";
    const maxPrevDate = "2024-05-05";

    useEffect(() => {
      // Get today's date
      const today = new Date();
      // Format the date as "YYYY-MM-DD"
      const formattedDate = today.toISOString().split('T')[0];
      console.log(today.getMonth())
      console.log(formattedDate)
      // Set today's date as the initial value
      setSelectedDate(formattedDate);
    }, []);

    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };


  return (
    <div className="">
      <input 
        type="date" 
        value={selectedDate}
        onChange={handleDateChange} 
        max={todayDate}
        min={maxPrevDate}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default DateSelector;
