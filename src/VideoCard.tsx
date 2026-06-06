import { useState, useEffect } from 'react'
interface Chapter{
  timestamp: string, 
  title: string
}
interface Thumbnail{
  url: string, 
  width: number,
  height: number
}
interface VideoData {
  vidId: string, 
  vidDescription: string, 
  vidTitle: string,
  vidChapters: Chapter[], 
  vidThumbnail: Thumbnail, 
  vidLink: string, 
}


interface CardProps {
  video: VideoData; 
}

export function VideoCard({video}: CardProps ){
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleTags, setVisibleTags] = useState(video.vidChapters.slice(0, 3))
  //const visibleTags = isExpanded ? video.vidChapters : video.vidChapters.slice(0, 3);

  
  useEffect(() => {
    setVisibleTags(isExpanded ? video.vidChapters : video.vidChapters.slice(0, 3));
  }, [isExpanded]);

  const tailwindColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500'
];
//const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
const randomColor = (): string => { return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];}
  return (
  <div key={video.vidTitle} className="w-full 
                                        md:max-w-md rounded md:overflow-hidden shadow-lg bg-white border-4 hover:border-white hover:shadow-2xl hover:shadow-white/50 border-black">
  <a href={chapterLink("0:0:0", video.vidId)} target="_blank">
  <img width={video.vidThumbnail.width} height={video.vidThumbnail.height} src={video.vidThumbnail.url} alt={video.vidTitle}/>
  </a>
  <div className="px-2 py-1
                  md:px-6 md:py-3">
    <div className="font-bold text-sm 
                    md:text-xl ">{video.vidTitle}</div>
    {/* <p className="text-gray-700 text-base">
      {video.vidDescription}
    </p> */}
  </div>
  
  <div className="px-2 pt-2 pb-1 
                  md:px-6 md:pt-4 md:pb-2 md:overflow-auto">
    {visibleTags.length <= video.vidChapters.length ? 
    (
      visibleTags.map((chapters) => {
    //chaptersDict(chapters.title);
     return <a href={chapterLink(chapters.timestamp, video.vidId)} target="_blank">
      <span className={`inline-block text-xs px-2 py-1 w-auto
                        md:inline-block ${randomColor()} rounded-full md:px-3 md:py-1 md:text-sm font-semibold border-3 hover:border-black text-white md:mr-2 md:mb-2`}>{chapters.title}</span>
      </a>
    })
    
    ) :
    (video.vidChapters.map((chapters) => {
    //chaptersDict(chapters.title);
     return <a href={chapterLink(chapters.timestamp, video.vidId)} target="_blank">
      <span className={`inline-block text-xs px-2 py-1 w-auto
                        md:inline-block ${randomColor()} rounded-full md:px-3 md:py-1 md:text-sm font-semibold border-3 hover:border-black text-white md:mr-2 md:mb-2`}>{chapters.title}</span>
      </a>
    })
    )
    }
    
    {(video.vidChapters.length > 3 )&&
              <button className='bg-white md:text-lg hover:border-red-900 hover:border-4 rounded-full border-2 border-black py-2 px-4' onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Collapse' : "Show More"}</button>  
    }
  </div>
</div>
  );
}

function chapterLink(timestamp: string, vidId: string){
  let baseURL: string  = "https://youtu.be/"

  if((timestamp.split(":").length - 1) == 2 ){
    const [hoursStr, minutesStr, secondsStr] = timestamp.split(":");
    var hours: number = parseInt(hoursStr, 10); 
    var minutes: number = parseInt(minutesStr, 10); 
    var seconds: number = parseInt(secondsStr, 10); 
  }
  else{
    const [minutesStr, secondsStr] = timestamp.split(":");
    var hours: number = 0; 
    var minutes: number = parseInt(minutesStr, 10); 
    var seconds: number = parseInt(secondsStr, 10); 
  }

  return baseURL + `${vidId}?t=${hours * 3600 + minutes * 60 + seconds}`

}