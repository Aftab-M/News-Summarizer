import React, { useEffect, useState } from 'react';
import translate from 'google-translate-api-x';
import { Translator, speak, singleTranslate, batchTranslate, languages, isSupported, getCode } from 'google-translate-api-x';

const ItemList = ({ items, setItems, language }) => {

  const [engItems, setEngItems] = useState(items)
  const [hinItems, setHinItems] = useState([])
  const [marItems, setMarItems] = useState([])
  const [loading, setLoading] = useState(false)

  const trnslt = async() =>{
    // console.log('in trnslt()')
    
    // items.map(async (item)=>{
      // console.log(item['newsTitle'])
      // const title = item['newsTitle']
      // const desc = item['newsSummary']
      if(language=='en'){
        setItems(engItems)
        // console.log(items)
        // console.log(engItems)
      }
      if(language=='hi'){
          setLoading(true)
            axios.post('http://localhost:3000/translatee', {items: items, lang: language})
          .then((res)=>{
            // console.log(res.data.t_items)
            setHinItems(res.data.t_items)
            setItems(res.data.t_items)
            setLoading(false)
          })
          .catch((err)=>{
            console.log(err)
            setLoading(false)
          })
      } // if
      if(language=='mr'){
            setLoading(true)
            axios.post('http://localhost:3000/translatee', {items: items, lang: language})
          .then((res)=>{
            // console.log(res.data.t_items)
            setMarItems(res.data.t_items)
            setItems(res.data.t_items)
            setLoading(false)
          })
          .catch((err)=>{
            console.log(err)
            setLoading(false)
          })
      }
      
    // })
  }  

    const [hoveredIndex, setHoveredIndex] = useState(null);
    useEffect(()=>{
      // if(language=='en'){null}
      // if(language=='hi'){
      //   trnslt()
      // }
      // console.log(language)
      // console.log(items)
      trnslt()
    },[language])

    return (
      <div>
        {loading && <div className='fixed inset-0 flex items-center justify-center z-30'>
            <img src="https://blog.roberthallam.org/wp-content/uploads/2022/09/loading-windows98-transparent2-1.gif" alt="" />
          </div>}
        {
          (items.length == 0) 
          ? 
            <center><img width={500} src="https://www.vascon.com/images/404/hanging_404.gif" /></center>
          :
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition duration-300">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`transition duration-700 ease-in-out relative p-4 h-auto bg-gray-800 text-gray-200 overflow-hidden fade-gradient shadow rounded-md transition duration-300 hover:bg-gray-700 hover:text-white hover:border transition duration-700 ease-in-out`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                        <h3 className="text-xl font-bold pb-4 leading-relaxed">{item['newsTitle']}</h3>
                    <p className="leading-relaxed">{item['newsSummary']}</p>
                    
                    {hoveredIndex === index && (
                     <div className='absolute top-0 right-0 mt-2 mr-2'><Example link={item['newsLink']}/></div>)}
                </div>
            ))}
        </div>
        }
        </div>
    );
};

export default ItemList;





import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from 'axios';

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





