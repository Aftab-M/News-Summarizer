import React, { useState, useEffect } from 'react';
import Header from './Header';
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector';
import ItemList from './ItemList';

const itemsData = [
  {
    title: { en: "Item 1", es: "Artículo 1", fr: "Article 1" },
    description: { en: "Description 1", es: "Descripción 1", fr: "Description 1" },
  },
  // Add more items here
];

const MainPage = () => {
  const [language, setLanguage] = useState('en');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch and filter items based on date and category
    setItems(itemsData);
  }, [date, category]);

  return (
    <div className="min-h-screen bg-black">
      <Header setLanguage={setLanguage} />
      <div className="container mx-auto p-4">
        <div className='flex items-center justify-between mb-6'>
            <div className='text-xl text-white'>All News</div>
        <div className="flex space-x-6 items-center justify-end">
          <DateSelector setDate={setDate} />
          <CategorySelector setCategory={setCategory} />
        </div>
        </div>
        <ItemList items={items} language={language} />
      </div>
    </div>
  );
};

export default MainPage;
