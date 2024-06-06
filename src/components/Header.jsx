import React, { useState, useRef, useEffect } from 'react';

const Header = ({ setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-blue-900 p-4 flex items-center justify-between">
      <div className="text-white text-2xl flex-grow text-center sm:text-left sm:flex-grow-0">
        Logo
      </div>
      <div className="hidden sm:flex flex-1 mx-4 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-2 rounded-full text-sm text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button
            className="px-4 py-2 ml-2 bg-slate-300 text-white rounded-full hover:bg-black active:px-3 transition duration-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <img width={13} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/709px-Vector_search_icon.svg.png" alt="" />
          </button>
      </div>
      <div className="hidden sm:flex relative">
        <select
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div className="flex sm:hidden items-center">
        <button
          className="inline-flex justify-center w-full rounded-full  px-2 py-2 bg-white text-xs  text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-2xl">
            <img width={20} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Settings-icon-symbol-vector.png/480px-Settings-icon-symbol-vector.png" alt="" />
          </span>
        </button>
      </div>
      <div
        className={`fixed bottom-0 left-0 w-full h-1/2 bg-blue-900 shadow-md p-4 sm:hidden z-50 transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        ref={menuRef}
      >
        <p className='p-1 text-white mt-2'>Search for a topic</p>
        <div className="flex items-center">
            
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mr-2"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </button>
        </div>

        <p className='p-1 text-white mt-7'>Language</p>
        <select
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-4"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <button
          className="w-full p-2 mt-5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Close
        </button>
      </div>
    </header>
  );
};

export default Header;





// import React, { useState } from 'react';

// const Header = ({ setLanguage }) => {
//   return (
//     <header className="bg-blue-600 p-4 flex items-center justify-between">
//       <div className="text-white text-2xl">Logo</div>
//       <div className="flex-1 mx-4 flex justify-center">
//         <input 
//           type="text" 
//           placeholder="Search a topic..." 
//           className="w-1/2 p-2 text-center shadow-blue-900 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
//         />
//       </div>
//       <div>
//         <select 
//           className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="en">English</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//         </select>
//       </div>
//     </header>
//   );
// };

// export default Header;
