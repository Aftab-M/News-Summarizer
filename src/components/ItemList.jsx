import React from 'react';

const ItemList = ({ items, language }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-white shadow rounded-md">
          <h3 className="text-xl font-bold pb-4">
            {/* {language === 'en' && item.title.en}
            {language === 'es' && item.title.es}
            {language === 'fr' && item.title.fr} */}
            {item['newsTitle']}
          </h3>
          <p>
            {/* {language === 'en' && item.description.en}
            {language === 'es' && item.description.es}
            {language === 'fr' && item.description.fr} */}
            {item['newsSummary']}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
