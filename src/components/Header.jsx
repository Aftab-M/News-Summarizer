import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useRef, useEffect } from 'react';

const Header = ({ username, userphoto, user, setLanguage, }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };


  const {logout} = useAuth0()
  const _logout = () =>{
    logout({logoutParams:{returnTo: window.location.origin}})
    console.log('Logged out !')
  } // _logout



  useEffect(() => {
    // console.log(user.email)
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
        {username}
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
        {/* <select
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select> */}
        <button onClick={()=>{_logout()}} className='flex items-center justify-between bg-black mr-3 px-6 py-2 text-white rounded-full hover:bg-white hover:text-black transition'>
          <div>{username}</div>
          <div><img className='rounded-full ml-2' width={22} src={userphoto} alt="" /></div>
        </button>
      </div>
      <div className="flex sm:hidden items-center justify-center">
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
        className={`fixed bottom-0 left-0 w-full h-2/3 bg-blue-900 shadow-md p-4 sm:hidden z-50 transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        ref={menuRef}
      >
        <p className='p-1 text-white mt-2'>Search for a topic</p>
        <div className="flex items-center justify-center">
            
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
        <button className='w-full flex items-center justify-between bg-black mr-3 px-8 py-3 text-white rounded-full transition'>
          <div className='flex items-center justify-center'>
              <div><img className='rounded-full mr-5' width={30} src={userphoto} alt="" /></div>
              <div>{username}</div>
          </div>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{_logout()}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 active:bg-white rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          </div>
          
        </button>
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

























import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Example({link}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center rounded-md bg-gray-300 px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-800 hover:text-white focus:outline-none">
          {/* <img src="" alt="" /> */}
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>



        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <a
                  href="#"
                  className={classNames(
                    focus ? 'bg-gray-400 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className='flex items-center' onClick={()=>{
                    window.open(link, '_blank')
                  }}>
                  <div className='pr-3'>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>

                  </div>

                  <div>
                  Show source
                  </div>

                  </div>
                </a>
              )}
            </MenuItem>
            
            {/* <MenuItem>
              {({ focus }) => (
                <a
                  href="#"
                  className={classNames(
                    focus ? 'bg-gray-400 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className='flex'>
                  <div className='pr-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  </div>

                  <div>
                    Needs fix
                  </div>

                  </div>
                </a>
              )}
            </MenuItem> */}

            
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}





