import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useRef, useEffect } from 'react';

const Header = ({ username, userphoto, user, setLanguage, }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const menuRef = useRef(null);
  
  const [results, setResults] = useState([])

  const [isDialogOpen, setIsDialogOpen] = useState(true)

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


  async function searchNews(){
    console.log(searchKeyword)
    if(searchKeyword!==''){
    axios.post('http://localhost:3000/searchnews', {keyword: searchKeyword})
    .then((res)=>{
      console.log(res.data.news)
      setIsResultsOpen(true)
      setResults(res.data.news)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  else{
    alert('Enter something to search !')
  }
  } // searchNews()



  useEffect(() => {
    // console.log(user)
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
      <div className="text-white flex-grow rounded-md text-center sm:text-left sm:flex-grow-0">
        <img width={140} className='rounded-md' src="https://firebasestorage.googleapis.com/v0/b/egdb-f23fd.appspot.com/o/Screenshot%202024-06-09%20172403.png?alt=media&token=73a36bd5-1546-4620-bdcb-eeb2babfe217" alt="" />
      </div>
      <div className="hidden sm:flex flex-1 mx-4 justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e)=>{setSearchKeyword(e.target.value)}}
          className="w-1/2 p-2 rounded-full text-sm text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button
            className="px-4 py-2 ml-2 bg-slate-300 text-white rounded-full hover:bg-black active:px-3 transition duration-600"
            onClick={() => {searchNews()}}
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
       
      </div>
      <div>
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
        <div className='hidden sm:block'>
        {isDialogOpen && <Example link={''} username={user.name} userphoto={user.picture} setLanguage={setLanguage}/>}
        </div>
      </div>
      <Results isResultsOpen={isResultsOpen} setIsResultsOpen={setIsResultsOpen} results={results} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} searchNews={searchNews}/>
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
            onChange={(e)=>{searchNews(e.target.value); console.log(e.target.value)}}
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
          onChange={(e)=>{setLanguage(e.target.value)}}
        >
          <option value="en" onClick={()=>{setLanguage('en')}}>English</option>
          <option value="hi" onClick={()=>{setLanguage('hi')}}>Hindi</option>
          <option value="mr" onClick={()=>{setLanguage('mr')}}>Marathi</option>
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
import axios from 'axios';
import Results from './Results';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Example({link, username, userphoto, setLanguage}) {

  const {logout} = useAuth0()
  const _logout = () =>{
    logout({logoutParams:{returnTo: window.location.origin}})
    console.log('Logged out !')
  } // _logout


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="">
        <button onClick={()=>{}} className='flex items-center justify-between bg-black mr-3 px-6 py-2 text-white rounded-full hover:bg-white hover:text-black transition'>
          <div>{username}</div>
          <div><img className='rounded-full ml-2' width={22} src={userphoto} alt="" /></div>
        </button>
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
                 <div
                 className="flex items-center justify-around w-full p-2 rounded-md border border-gray-300"
                 onChange={(e) => { console.log(e.target.value); setLanguage(e.target.value)}}
               >
                 <option value="en" onClick={(e)=>{setLanguage('en')}} className='bg-gray-400 rounded-md px-3 py-1 hover:bg-black hover:text-white hover:cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-medium'>EN</option>
                 <option value="hi" onClick={(e)=>{setLanguage('hi')}} className='bg-gray-400 rounded-md px-3 py-1 hover:bg-black hover:text-white hover:cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-medium'>HI</option>
                 <option value="mr" onClick={(e)=>{setLanguage('mr')}} className='bg-gray-400 rounded-md px-3 py-1 hover:bg-black hover:text-white hover:cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow font-medium'>MR</option>
               </div>
              )}
            </MenuItem>



            <MenuItem>
              <div className='flex items-center bg-red-500 p-3 px-4 cursor-pointer'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{_logout()}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 active:bg-white rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </div>
                <div className='font-medium ml-4'>
                  Log Out ?
                </div>
              </div>
            </MenuItem>

            
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}





