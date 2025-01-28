import React, { useEffect, useState } from 'react';

const DateSelector = ({ setDate }) => {

    const [selectedDate, setSelectedDate] = useState('');
    const maxPrevDate = "2024-05-05";
    const todayDate = new Date().toISOString().split('T')[0];
    const todayTime = new Date().toISOString().split('T')[1];

    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    }, []);

    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
      console.log(todayTime)
      setDate(e.target.value)
    };


  return (
    <div className="">
      <input 
        type="date" 
        value={selectedDate}
        onChange={(e)=>{handleDateChange(e)}} 
        max={todayDate}
        min={maxPrevDate}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default DateSelector;
