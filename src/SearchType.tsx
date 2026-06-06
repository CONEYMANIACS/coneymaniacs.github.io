import { useState, useEffect } from "react";
interface SearchChangeProps {
  changeSearch: (buttonResult: string) => void; 
}
export function SearchType({ changeSearch }: SearchChangeProps){

  const[titleOrTags, setTitleOrTags] = useState('title')

  const handleChange = (e: React.ChangeEvent<any>) => {
    setTitleOrTags(e.target.value);
    changeSearch(e.target.value)
  };


  return(
    <div className='grid ml-2 text-sm w-1/3 justify-items-start 
                    md:grid md:ml-4 md:text-xl md:justify-items-start md:w-1/4 md:gap-y-2'>
      <label className="md:w-1/2 md:flex">
        
        <input type="radio" 
               name="titleButton"
               value="title"
               checked={titleOrTags === 'title'}
               onChange={handleChange}
               className="mr-2 md:w-8 md:h-8"/>
        Search By Title
      </label>
      <label className="md:w-1/2 md:flex">
        
        <input type="radio" 
               name="tagsButton"
               value="tags"
               checked={titleOrTags === 'tags'}
               onChange={handleChange}
               className="mr-2 md:w-8 md:h-8"/>
        Search By Tags
      </label>
    </div>
  )
}