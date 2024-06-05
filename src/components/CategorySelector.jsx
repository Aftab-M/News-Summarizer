import React from 'react';

const CategorySelector = ({ setCategory }) => {
  return (
    <div className="mb-4">
      <select 
        onChange={(e) => setCategory(e.target.value)} 
        className="p-2 border rounded-md"
      >
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>
    </div>
  );
};

export default CategorySelector;
