import videoData from '../ConeyVods.json'
import {VideoCard} from './VideoCard'
import { RandomBox } from './RandomBox';
import { SearchType } from './SearchType';
import React, { useState, useEffect } from 'react'



export default function App(){
  const vodAmount = videoData.length; 

  const [numVods, setNumVods] = useState(50); 
  const [searchResults, setSearchResults] = useState('');
  const [filteredVods, setFilteredVods] = useState(videoData.slice(0,numVods))
  const[searchType, setSearchtype] = useState('')


  const handleSearchType = (buttonResult: string) => {
    setSearchtype(buttonResult); 
  }

    const handleInputChange = (e: React.ChangeEvent<any>) => { 
    const searchTerm = e.target.value;
    setSearchResults(searchTerm)

    if(searchTerm.length === 0){
      setFilteredVods(videoData.slice(0,numVods))
    }
    else if(searchType === 'title' || searchType === ''){
      //filterByTitle
      const filteredResults = videoData.filter((vod) => 
      vod.vidTitle.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredVods(filteredResults);
    }
    else{
    //Filter by Tags
    const filteredByTags = videoData.filter((vod) => 
      vod.vidChapters.some(nestedItem => 
        nestedItem.title.toLowerCase().includes(searchTerm.toLowerCase())));
    setFilteredVods(filteredByTags);
      }
    
  }

  const handleQuickSearch = (searchTerm: string) => {
    
    setSearchResults(searchTerm)

    const filteredByTags = videoData.filter((vod) => 
      vod.vidChapters.some(nestedItem => 
        nestedItem.title.toLowerCase().includes(searchTerm.toLowerCase())));
    setFilteredVods(filteredByTags);

  }


  useEffect(() => {
    setFilteredVods(videoData.slice(0,numVods));
  }, [numVods]);


  return <>
  <title>CONEY Vod Archive</title>
  <div className='max-w-full'>
    <Header></Header>
    <div className='flex max-w-full md:justify-center md:m-4 mb-4'>
      <h1 className=' px-2 text-sm w-1/4 
                    md:grid md:px-4 md:text-xl md:w-1/4 md:justify-items-end place-self-center'>Search For Vods</h1>
      <input className="border-black px-2 py-1 text-sm border-1 bg-white w-2/5
                        md:border-black md:px-4 md:py-1 md:text-lg md:border-2 md:bg-white md:w-1/3" type="text" 
             value={searchResults}
             onChange={handleInputChange}
             placeholder='Look for Vods'
      />
      <SearchType changeSearch={handleSearchType}></SearchType>
    </div>
    <div>
      <RandomBox quickSearch={handleQuickSearch}></RandomBox>
    </div>
    <h2 className='
                   md:text-xl font-bold md:ml-17 md:mr-17'>Vods List: {filteredVods.length}</h2>
    <ul className="grid grid-cols-2 gap-4 justify-items-center
                  md:grid md:grid-cols-4 md:gap-y-4 md:justify-items-center">
      {filteredVods.map((video) => (
        <li>
          <VideoCard key={video.vidTitle} video={video}/>
        </li>
      ))}
    </ul>
    
  </div>
      {(searchResults.length < 1 && numVods < vodAmount) &&
          <div className='flex justify-center gap-4 mb-6 mt-2 font-bold
                          md:gap-10'>
          <button className='bg-white rounded-full border-4 border-black py-2 px-4 hover:border-red-900 hover:border-4
                             md:text-lg md:py-3 px-8' onClick={() => setNumVods(amount => amount + 24)}>Load More</button>  
          <button className=' hover:border-red-900 hover:border-4 bg-white md:text-lg rounded-full border-4 border-black py-2 px-4' onClick={() => setNumVods(vodAmount)}>Load All</button>  
          </div>
      }
  </>
  
}

function Header(){
  return (
  <header className="flex items-center justify-between"> 
  <div className="flex flex-col gap-y-1 ">
    <h1 className="text-3xl font-bold">CONEY Vods Archive</h1>
  </div>
  </header>
  )
}
