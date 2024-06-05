import React from 'react';

const ItemList = ({ items, language }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition duration-300">
      {items.map((item, index) => (
        <div key={index} className="p-4 h-auto bg-white overflow-hidden fade-gradient shadow rounded-md transition duration-300">
          <a href={item['newsLink']}><h3 className="text-xl font-bold pb-4 underline leading-relaxed transition duration-300">
            {/* {language === 'en' && item.title.en}
            {language === 'es' && item.title.es}
            {language === 'fr' && item.title.fr} */}
            {item['newsTitle']}
          </h3></a>
          <p className='leading-relaxed'>
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
