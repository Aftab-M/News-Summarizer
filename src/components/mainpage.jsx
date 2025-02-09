import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cookies from 'js-cookie'
import DateSelector from './DateSelector';
import CategorySelector from './CategorySelector';
import ItemList from './ItemList';
import axios from 'axios';


const MainPage = ({user}) => {

  
  // console.log(formattedDate);


  const urlPrefix = 'https://news-summarizer-endpoint.vercel.app';
  const [language, setLanguage] = useState('en');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{newsTitle:'Loading items...', newsSummary: ''}]);

  const [generalNews, setGeneralNews] = useState([])
  const [sportNews, setSportNews] = useState([])
  const [politicNews, setPoliticNews] = useState([])

  const [selectedChip, setSelectedChip] = useState('General'); // Initial selected chip
  const [category, setCategory] = useState('General'); // Initial category
  const [loading, setLoading] = useState(false)

  // const [usr, setUser] = useState()



  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    setCategory(chip); // Set category based on the selected chip
    // setItems(generalNews)
  };






async function saveUserInfo(){
  Cookies.set('user', 'Eminemmmmmm')
  axios.post(urlPrefix+'/saveuser', {user:user}).then((res)=>{
    // console.log(res.data.msg)
    if(res.data.msg == 'Verified'){}
    else{
      console.log('Error identifying...')
    }
  })
}


  useEffect(() => {

    const formattedDate = new Date().toISOString().split('T')[0];
    console.log(formattedDate)
    
    saveUserInfo()
    // console.log(date)
    setLoading(true)
    axios.post(urlPrefix+'/getnews', {cat: category, dt:formattedDate}).then((res)=>{
        if(res.data.stat[0] == 'YERRER'){alert('Error fetching the data !')}
        else{
            console.log(res.data.general)
            // setGeneralNews(res.data.general)
            setItems(res.data.general)
            setLoading(false)
        }
    })

    if(language=='en'){
      axios.post(urlPrefix+'/getnews', {cat: category, dt:formattedDate}).then((res)=>{
        if(res.data.stat[0] == 'YERRER'){alert('Error fetching the data !')}
        else{
            // console.log(res.data.general)
            // setGeneralNews(res.data.general)
            setItems(res.data.general)
            setLoading(false) 
        }
    })
    }




  }, [date, category, language]);







  return (
    <div className="min-h-screen bg-black">
    {loading && <div className='fixed inset-0 flex items-center justify-center z-30'>
            <img src="https://blog.roberthallam.org/wp-content/uploads/2022/09/loading-windows98-transparent2-1.gif" alt="" />
          </div>}
      <Header username={user.name} userphoto={user.picture} user={user} setLanguage={setLanguage} language={language} />
      <div className="container mx-auto p-4 px-8">
        <div className='flex flex-wrap items-center justify-between mb-6'>
            {/* <div className='text-xl text-white'>All News</div> */}
          {/* {props.user} */}
          {(screen.width<400)?
                        <div className=''>
                            <select
                              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                              onChange={(e) => handleChipClick(e.target.value)}
                            >
                              <option value="General">General</option>
                              {/* <option value="Politics">Politics</option>
                              <option value="Sports">Sports</option> */}
                            </select>
                        </div>
            :<div className={`flex gap-3 flex-wrap ${screen.width<400?'justify-center':'justify-between'}  w-80  mb-4`}>
          <Chip label="General" selected={selectedChip === 'General'} onClick={() => handleChipClick('General')} />
          {/* <Chip label="Politics" selected={selectedChip === 'Politics'} onClick={() => handleChipClick('Politics')} />
          <Chip label="Sports" selected={selectedChip === 'Sports'} onClick={() => handleChipClick('Sports')} /> */}
        </div>}  
        
        <div className="flex flex-wrap space-x-6 items-center justify-end">
          <DateSelector setDate={setDate} />
          {/* <CategorySelector setCategory={setCategory} /> */}
        </div>
        </div>
        <ItemList items={items} setItems={setItems} language={language} />
      </div>
    </div>
  );
};























const Chip = ({ label, selected, onClick }) => {
    return (
    <div>
      <button
        className={`w-24 px-4 py-2 rounded-full ${selected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={onClick}
      >
        {label}
      </button>
      </div>
    );
  };

















// Items component
const Items = ({ category }) => {
    // Load items based on the selected category
    const loadItems = (category) => {
      // Simulated data for demonstration
      switch (category) {
        case 'A':
          return ['Item 1', 'Item 2', 'Item 3'];
        case 'B':
          return ['Item 4', 'Item 5', 'Item 6'];
        case 'C':
          return ['Item 7', 'Item 8', 'Item 9'];
        default:
          return [];
      }
    };
  
    const items = loadItems(category);
  
    return (
      <div>
        <h2>Items for Category {category}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

















export default MainPage;
