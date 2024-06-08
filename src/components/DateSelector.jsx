import React, { useEffect, useState } from 'react';

const DateSelector = ({ setDate }) => {

    const [selectedDate, setSelectedDate] = useState('');
    // const todayDate = new Date().toISOString().split('T')[0];
    // const todayDate = "2024-05-06";
    const maxPrevDate = "2024-05-05";
    const todayDate = new Date().toISOString().split('T')[0];
    const todayTime = new Date().toISOString().split('T')[1];

    useEffect(() => {
      // Get today's date
      const today = new Date();
      // Format the date as "YYYY-MM-DD"
      const formattedDate = today.toISOString().split('T')[0];
      // console.log('Got the date : ',selectedDate)
      setSelectedDate(formattedDate);
    }, []);

    const handleDateChange = (e) => {
      // console.log('e.target.value : ')
      // console.log(e.target.value)
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
