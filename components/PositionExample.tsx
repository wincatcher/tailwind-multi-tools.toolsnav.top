import CopyToClipboard from './CopyToClipboard'
import { useState, useEffect, useContext } from 'react'
import { Tooltip, FavoriteButton } from '.'
import { FavoritesCtx } from '../contexts/FavoritesProvider'
import { placements } from '../utils/tailwindClasses'

interface Props {
  positioning: string
  placement: string
}

const PositionExample = ({ positioning, placement }: Props): JSX.Element => {
  const [toPrint, setToPrint] = useState('')
  const [customName, setCustomName] = useState('')
  const [showInput, setShowInput] = useState(false)

  const favoritesContext = useContext(FavoritesCtx)

  useEffect(() => {
    setToPrint(`${positioning} ${placement}`)
  }, [positioning, placement])

  useEffect(() => {
    if (favoritesContext.isAlreadyFavorite(toPrint) && customName !== '') {
      favoritesContext.updateFavorite({
        class: toPrint,
        name: customName,
        category: 'layouts',
      })
    }
  }, [customName, favoritesContext, toPrint])

  return (
    <div className='relative p-2 bg-white shadow-sm dark:bg-slate-800 rounded-xl dark:shadow-inset-sm dark:shadow-white/5 shadow-stone-200 ring-1 ring-inset dark:ring-slate-700/50 ring-slate-300/30'>
      {/* FAVORITE  */}
      {!showInput && (
        <button
          className='absolute z-20 text-xl right-2 top-1'
          onClick={() => setShowInput(true)}>
          {favoritesContext?.isAlreadyFavorite(toPrint) ? '★' : '☆'}
        </button>
      )}
      {showInput && (
        <div className='absolute top-0 right-0 z-10 w-10'>
          <input
            type='Position'
            placeholder='Custom name'
            defaultValue={
              favoritesContext?.isAlreadyFavorite(toPrint)
                ? favoritesContext?.favorites?.find((e) => e.class === toPrint)
                    ?.name
                : ''
            }
            className='absolute z-10 px-2 pr-6 rounded-md shadow-md shadow-slate-900/20 top-1 right-1 h-7 bg-stone-100 dark:bg-slate-700 ring-1 ring-stone-200/20'
            onChange={(e) => setCustomName(e.target.value)}
          />
          <FavoriteButton
            favoriteClass={toPrint}
            category='positions'
            favoriteName={
              customName.length > 0
                ? customName
                : `Position ${
                    favoritesContext.countDefaultNames(
                      'positions',
                      'position'
                    ) + 1
                  }`
            }
          />
          <div
            className='fixed top-0 right-0 w-full h-full'
            onClick={() => {
              setShowInput(false)
              setCustomName('')
            }}></div>
        </div>
      )}
      {/* EXAMPLE */}
      <div>
        <div className='relative w-full rounded-md rounded-t-xl'>
          <div className='bg-indigo-300 rounded-md shadow-md dark:bg-indigo-800 h-28' />
          <div
            className={`${positioning} ${placement} rounded-md shadow-md shadow-black/20 inline-block w-12 h-12 ring-1 dark:ring-pink-400 ring-pink-300 ring-inset bg-pink-400 dark:bg-pink-500 z-50 pointer-events-none`}
          />
        </div>
        {/* VALUE TO PRINT */}
        <div className='flex items-end justify-between w-full pt-2'>
          <CopyToClipboard valueToCopy={toPrint}>
            <span className='flex flex-wrap gap-2 font-semibold'>
              <span className='whitespace-nowrap'>{positioning}</span>
              {placement !== 'inset-0' && (
                <span className='whitespace-nowrap'>{placement}</span>
              )}
              <svg
                width='24'
                height='24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'>
                <path d='M8 16c0 1.886 0 2.828.586 3.414C9.172 20 10.114 20 12 20h4c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-4c0-1.886 0-2.828-.586-3.414C18.828 8 17.886 8 16 8m-8 8h4c1.886 0 2.828 0 3.414-.586C16 14.828 16 13.886 16 12V8m-8 8c-1.886 0-2.828 0-3.414-.586C4 14.828 4 13.886 4 12V8c0-1.886 0-2.828.586-3.414C5.172 4 6.114 4 8 4h4c1.886 0 2.828 0 3.414.586C16 5.172 16 6.114 16 8'></path>
              </svg>
            </span>
          </CopyToClipboard>
          <Tooltip
            message='Example of your settings'
            color='bg-slate-900 dark:bg-slate-200 dark:text-slate-900'
            side='left'>
            <span className='cursor-help opacity-70'>ⓘ</span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default PositionExample