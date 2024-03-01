import React from "react"
import { useSelector } from "react-redux"
import { lang } from "../utils/languageConstant"

const GptSearchBar = () => {
  const selectedLanguage = useSelector((store) => store.config.language)

  return (
    <div className='lg:py-[15%] md:py-[15%] py-[25%] flex justify-center'>
      <form className='lg:w-1/2 md:w-1/2 w-full bg-black grid grid-cols-12 rounded-md'>
        <input
          className='p-2 m-4 col-span-9 rounded-md'
          type='text'
          placeholder={lang[selectedLanguage].gptSearchPlaceholder}
        />
        <button className='py-2 px-4 m-4 col-span-3 bg-red-600 text-white rounded-md'>
          {lang[selectedLanguage].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
