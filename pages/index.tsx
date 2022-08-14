import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import {
  FontHelper,
  LayoutHelper,
  Favorites,
  Colors,
  CategoryButton,
} from '../components'

const Home: NextPage = () => {
  const [selectedCategory, SetSelectedCategory] = useState('font')
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true)

  const setCategory = (category: string): void => {
    SetSelectedCategory(category.toLowerCase())
  }

  const toggleDescription = (): void => {
    const description = document.querySelector('.description')

    description.classList.toggle('max-h-0')
    description.classList.toggle('max-h-44')
    description.classList.toggle('sm:max-h-18')

    setIsDescriptionOpen((prev) => !prev)
    localStorage.setItem(
      'isDescriptionOpen',
      JSON.stringify(!isDescriptionOpen)
    )
  }

  // restores description state
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('isDescriptionOpen'))) {
      const description = document.querySelector('.description')

      description.classList.add('max-h-0')
      description.classList.remove('max-h-44')
      description.classList.remove('sm:max-h-18')

      setIsDescriptionOpen(false)
    }
  }, [])

  return (
    <div>
      {/* TITLE AND DESCRIPTION */}
      <div className='text-lg text-center text-slate-600 dark:text-slate-400'>
        <h1 className='items-center justify-center hidden pr-1 text-4xl font-extrabold sm:flex sm:gap-4 sm:flex-row md:text-7xl sm:text-6xl '>
          <svg
            className='w-12 h-12 mr-2 text-pink-500 md:w-14 md:h-14'
            width='54'
            height='54'
            viewBox='0 0 54 54'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z'></path>
          </svg>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 dark:from-pink-500 dark:to-indigo-400 to-indigo-600'>
            Tailwindhelper
          </span>
        </h1>
        <div className='relative'>
          <button
            onClick={toggleDescription}
            className='absolute top-0 right-0'>
            <span className='sr-only'>Hide/Show Description</span>
            <span>{isDescriptionOpen ? '⊖' : '⊕'}</span>
          </button>
          <p className='mt-6 overflow-hidden transition-[max-height] indent-6 sm:mt-6 description max-h-44 sm:max-h-18 duration-300 mb-12'>
            You want to convert a unit to the corresponding tailwind class? You
            always forget property names? Or you are simply learning tailwind
            and would like a bit of help visualizing classes? Then this tool
            might come in handy
          </p>
        </div>
      </div>

      {/* CATEGORIES */}
      <nav className='relative flex w-full gap-2 mb-4 overflow-auto border-b justify-evenly sm:justify-between sm:gap-4 sm:mb-8 border-slate-300 dark:border-slate-700'>
        <div className='flex flex-grow gap-2 sm:flex-grow-0 sm:gap-4 justify-evenly'>
          <CategoryButton
            selectedCategory={selectedCategory}
            setCategory={setCategory}
            name={'Font'}
          />
          <CategoryButton
            selectedCategory={selectedCategory}
            setCategory={setCategory}
            name={'Layout'}
          />
          <CategoryButton
            selectedCategory={selectedCategory}
            setCategory={setCategory}
            name={'Colors'}
          />
        </div>
        <CategoryButton
          selectedCategory={selectedCategory}
          setCategory={setCategory}
          name={'Favorites'}
        />
      </nav>

      {/* HELPERS */}
      <div className={`${selectedCategory !== 'font' && 'hidden'}`}>
        <FontHelper />
      </div>
      <div className={`${selectedCategory !== 'layout' && 'hidden'}`}>
        <LayoutHelper />
      </div>
      <div className={`${selectedCategory !== 'colors' && 'hidden'}`}>
        <Colors />
      </div>
      <div className={`${selectedCategory !== 'favorites' && 'hidden'}`}>
        <Favorites />
      </div>
    </div>
  )
}

export default Home
