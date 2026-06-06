import videoData from '../ConeyVods.json'
import chapterData from '../newMap.json'
import {VideoCard} from './VideoCard'
import React, { useState, useEffect } from 'react'
interface quickSearchProps {
  quickSearch: (searchTerm: string) => void; 
}
export function RandomBox({quickSearch}: quickSearchProps){

  const vodAmount = videoData.length; 
  const [randomVod, setRandomVod] = useState(videoData[Math.floor(Math.random() * vodAmount)])
  const [randomChapter, setRandomChapter] = useState(getRandomChapters())
  const commonTags: string[] = ["Confessional","Fact Or Opinion","Wheel","Genie","Mojo","Who Asked",
                             "React Wars","Websurf Wednesday", "Banjo Tooie","Coney Game Fest","Mario 64", "React"]

    const tailwindColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500'
];
const randomColor = (): string => { return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];}

  console.log(randomVod)
  console.log(randomChapter)


  const handleChange = (searchTerm: string) => {
    
    quickSearch(searchTerm)
  };


  return (

    <div className='grid md:flex grid-cols-2 gap-x-1  md:gap-x-30 justify-items-center md:justify-center w-full md:w-full max-h-1/3'>

      <div className=' grid justify-items-center max-h-3/4  md:max-h-full'>
          {/* <button className='bg-white md:text-lg hover:border-red-900 h-1/2
                            hover:border-4 rounded-full border-2 border-black py-2 px-4 md:h-full w-1/2' 
          onClick={() => setRandomVod(videoData[Math.floor(Math.random() * vodAmount)])}>Shuffle</button> */}
      <div className='  w-full h-1/3 md:h-full grid justify-items-center items-start'>
          <button className='bg-white md:text-lg hover:border-red-900  
                            hover:border-4 rounded-full border-2 border-black py-2 px-4 md:h-full w-1/2' 
          onClick={() => setRandomVod(videoData[Math.floor(Math.random() * vodAmount)])}>Shuffle</button>
      </div>
        <div className=' w-full h-full mt-0 md:mt-0'>
          <h3 className='md:text-xl md:font-bold'>Random Vod</h3>
            <VideoCard key={randomVod.vidTitle} video={randomVod}></VideoCard>
        </div>
          
      </div>

      <div className=' grid md:w-1/3 w-full md:w-1/5 gap-y-2 h-full justify-items-center'>
          <div className=' w-full h-full grid justify-items-center'>
                      <button className='bg-white md:text-lg hover:border-red-900 h-8/9
                            hover:border-4 rounded-full border-2 border-black py-1 px-1 md:h-full w-1/2' 
          onClick={() => setRandomChapter(getRandomChapters())}>Shuffle</button>
          </div>
          <div className='border-black border-2 bg-white w-full h-full'>
              <h3 className='md:text-xl md:font-bold'>Random Tags</h3>
              <div className=' md:w-full text-center grid grid-cols-2'>
                {randomChapter.map((tags) => {
                  return <span className={`inline-flex text-xs px-2 py-1 w-auto ${randomColor()} max-w-full text-center max-h-7/8 justify-center items-center 
                        md:max-h-full md:inline-flex rounded-full md:px-3 md:py-1 md:text-sm md:font-semibold border-3 hover:border-black text-white md:mr-2 md:mb-2`}
                         onClick={() => handleChange(tags.name)}>{tags.name}</span>
                })

                }
              </div>
          </div>
          <div className='border-black border-2 bg-white w-full h-full'>
              <h3 className='md:text-xl md:font-bold'>Common Tags</h3>
              <div className=' md:w-full text-center grid grid-cols-2' >
              {commonTags.map((tags) =>{
                return <span className={`inline-flex text-xs px-2 py-1 w-auto ${randomColor()} max-w-full text-center max-h-7/8 justify-center items-center 
                        md:max-h-full md:inline-block rounded-full md:px-3 md:py-1 md:text-sm font-semibold border-2 border-black md:border-3 md:border-white hover:border-black text-white md:mr-2 md:mb-2`}
                        onClick={() => handleChange(tags)}>{tags}</span>
              })
              }
                
              </div>
          </div>
      </div>
    </div>
  );}


  function getRandomChapters(){

    //const result = [...chapterData]; 

    const indices = new Set<number>();

    while (indices.size < 5) {
    const randomIndex = Math.floor(Math.random() * chapterData.length);
    indices.add(randomIndex);
  }
  const result = Array.from(indices).map(index => chapterData[index]);

  console.log(result)
  return result
  }