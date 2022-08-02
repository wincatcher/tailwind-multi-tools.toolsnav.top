import React, { useState, useEffect } from 'react'
import { CopyToClipboard, StyledRange, StyledInput } from '..'
import { WidgetWrapper, WidgetConverter, WidgetResult } from '..'

type color = {
  class: string
  hex: string
}

interface Props {
  setTextColor: (value: string) => void
}

const colors: color[] = [
  { class: 'white', hex: '#ffffff' },
  { class: 'black', hex: '#000000' },

  { class: 'slate-50', hex: '#f8fafc' },
  { class: 'slate-100', hex: '#f1f5f9' },
  { class: 'slate-200', hex: '#e2e8f0' },
  { class: 'slate-300', hex: '#cbd5e1' },
  { class: 'slate-400', hex: '#94a3b8' },
  { class: 'slate-500', hex: '#64748b' },
  { class: 'slate-600', hex: '#475569' },
  { class: 'slate-700', hex: '#334155' },
  { class: 'slate-800', hex: '#1e293b' },
  { class: 'slate-900', hex: '#0f172a' },

  { class: 'gray-50', hex: '#f9fafb' },
  { class: 'gray-100', hex: '#f3f4f6' },
  { class: 'gray-200', hex: '#e5e7eb' },
  { class: 'gray-300', hex: '#d1d5db' },
  { class: 'gray-400', hex: '#9ca3af' },
  { class: 'gray-500', hex: '#6b7280' },
  { class: 'gray-600', hex: '#4b5563' },
  { class: 'gray-700', hex: '#374151' },
  { class: 'gray-800', hex: '#1f2937' },
  { class: 'gray-900', hex: '#111827' },

  { class: 'zinc-50', hex: '#fafafa' },
  { class: 'zinc-100', hex: '#f4f4f5' },
  { class: 'zinc-200', hex: '#e4e4e7' },
  { class: 'zinc-300', hex: '#d4d4d8' },
  { class: 'zinc-400', hex: '#a1a1aa' },
  { class: 'zinc-500', hex: '#71717a' },
  { class: 'zinc-600', hex: '#52525b' },
  { class: 'zinc-700', hex: '#3f3f46' },
  { class: 'zinc-800', hex: '#27272a' },
  { class: 'zinc-900', hex: '#18181b' },

  { class: 'neutral-50', hex: '#fafafa' },
  { class: 'neutral-100', hex: '#f5f5f5' },
  { class: 'neutral-200', hex: '#e5e5e5' },
  { class: 'neutral-300', hex: '#d4d4d4' },
  { class: 'neutral-400', hex: '#a3a3a3' },
  { class: 'neutral-500', hex: '#737373' },
  { class: 'neutral-600', hex: '#525252' },
  { class: 'neutral-700', hex: '#404040' },
  { class: 'neutral-800', hex: '#262626' },
  { class: 'neutral-900', hex: '#171717' },

  { class: 'stone-50', hex: '#fafaf9' },
  { class: 'stone-100', hex: '#f5f5f4' },
  { class: 'stone-200', hex: '#e7e5e4' },
  { class: 'stone-300', hex: '#d6d3d1' },
  { class: 'stone-400', hex: '#a8a29e' },
  { class: 'stone-500', hex: '#78716c' },
  { class: 'stone-600', hex: '#57534e' },
  { class: 'stone-700', hex: '#44403c' },
  { class: 'stone-800', hex: '#292524' },
  { class: 'stone-900', hex: '#1c1917' },

  { class: 'red-50', hex: '#fef2f2' },
  { class: 'red-100', hex: '#fee2e2' },
  { class: 'red-200', hex: '#fecaca' },
  { class: 'red-300', hex: '#fca5a5' },
  { class: 'red-400', hex: '#f87171' },
  { class: 'red-500', hex: '#ef4444' },
  { class: 'red-600', hex: '#dc2626' },
  { class: 'red-700', hex: '#b91c1c' },
  { class: 'red-800', hex: '#991b1b' },
  { class: 'red-900', hex: '#7f1d1d' },

  { class: 'orange-50', hex: '#fff7ed' },
  { class: 'orange-100', hex: '#ffedd5' },
  { class: 'orange-200', hex: '#fed7aa' },
  { class: 'orange-300', hex: '#fdba74' },
  { class: 'orange-400', hex: '#fb923c' },
  { class: 'orange-500', hex: '#f97316' },
  { class: 'orange-600', hex: '#ea580c' },
  { class: 'orange-700', hex: '#c2410c' },
  { class: 'orange-800', hex: '#9a3412' },
  { class: 'orange-900', hex: '#7c2d12' },

  { class: 'amber-50', hex: '#fffbeb' },
  { class: 'amber-100', hex: '#fef3c7' },
  { class: 'amber-200', hex: '#fde68a' },
  { class: 'amber-300', hex: '#fcd34d' },
  { class: 'amber-400', hex: '#fbbf24' },
  { class: 'amber-500', hex: '#f59e0b' },
  { class: 'amber-600', hex: '#d97706' },
  { class: 'amber-700', hex: '#b45309' },
  { class: 'amber-800', hex: '#92400e' },
  { class: 'amber-900', hex: '#78350f' },

  { class: 'yellow-50', hex: '#fefce8' },
  { class: 'yellow-100', hex: '#fef9c3' },
  { class: 'yellow-200', hex: '#fef08a' },
  { class: 'yellow-300', hex: '#fde047' },
  { class: 'yellow-400', hex: '#facc15' },
  { class: 'yellow-500', hex: '#eab308' },
  { class: 'yellow-600', hex: '#ca8a04' },
  { class: 'yellow-700', hex: '#a16207' },
  { class: 'yellow-800', hex: '#854d0e' },
  { class: 'yellow-900', hex: '#713f12' },

  { class: 'lime-50', hex: '#f7fee7' },
  { class: 'lime-100', hex: '#ecfccb' },
  { class: 'lime-200', hex: '#d9f99d' },
  { class: 'lime-300', hex: '#bef264' },
  { class: 'lime-400', hex: '#a3e635' },
  { class: 'lime-500', hex: '#84cc16' },
  { class: 'lime-600', hex: '#65a30d' },
  { class: 'lime-700', hex: '#4d7c0f' },
  { class: 'lime-800', hex: '#3f6212' },
  { class: 'lime-900', hex: '#365314' },

  { class: 'green-50', hex: '#f0fdf4' },
  { class: 'green-100', hex: '#dcfce7' },
  { class: 'green-200', hex: '#bbf7d0' },
  { class: 'green-300', hex: '#86efac' },
  { class: 'green-400', hex: '#4ade80' },
  { class: 'green-500', hex: '#22c55e' },
  { class: 'green-600', hex: '#16a34a' },
  { class: 'green-700', hex: '#15803d' },
  { class: 'green-800', hex: '#166534' },
  { class: 'green-900', hex: '#14532d' },

  { class: 'emerald-50', hex: '#ecfdf5' },
  { class: 'emerald-100', hex: '#d1fae5' },
  { class: 'emerald-200', hex: '#a7f3d0' },
  { class: 'emerald-300', hex: '#6ee7b7' },
  { class: 'emerald-400', hex: '#34d399' },
  { class: 'emerald-500', hex: '#10b981' },
  { class: 'emerald-600', hex: '#059669' },
  { class: 'emerald-700', hex: '#047857' },
  { class: 'emerald-800', hex: '#065f46' },
  { class: 'emerald-900', hex: '#064e3b' },

  { class: 'teal-50', hex: '#f0fdfa' },
  { class: 'teal-100', hex: '#ccfbf1' },
  { class: 'teal-200', hex: '#99f6e4' },
  { class: 'teal-300', hex: '#5eead4' },
  { class: 'teal-400', hex: '#2dd4bf' },
  { class: 'teal-500', hex: '#14b8a6' },
  { class: 'teal-600', hex: '#0d9488' },
  { class: 'teal-700', hex: '#0f766e' },
  { class: 'teal-800', hex: '#115e59' },
  { class: 'teal-900', hex: '#134e4a' },

  { class: 'cyan-50', hex: '#ecfeff' },
  { class: 'cyan-100', hex: '#cffafe' },
  { class: 'cyan-200', hex: '#a5f3fc' },
  { class: 'cyan-300', hex: '#67e8f9' },
  { class: 'cyan-400', hex: '#22d3ee' },
  { class: 'cyan-500', hex: '#06b6d4' },
  { class: 'cyan-600', hex: '#0891b2' },
  { class: 'cyan-700', hex: '#0e7490' },
  { class: 'cyan-800', hex: '#155e75' },
  { class: 'cyan-900', hex: '#164e63' },

  { class: 'sky-50', hex: '#f0f9ff' },
  { class: 'sky-100', hex: '#e0f2fe' },
  { class: 'sky-200', hex: '#bae6fd' },
  { class: 'sky-300', hex: '#7dd3fc' },
  { class: 'sky-400', hex: '#38bdf8' },
  { class: 'sky-500', hex: '#0ea5e9' },
  { class: 'sky-600', hex: '#0284c7' },
  { class: 'sky-700', hex: '#0369a1' },
  { class: 'sky-800', hex: '#075985' },
  { class: 'sky-900', hex: '#0c4a6e' },

  { class: 'blue-50', hex: '#eff6ff' },
  { class: 'blue-100', hex: '#dbeafe' },
  { class: 'blue-200', hex: '#bfdbfe' },
  { class: 'blue-300', hex: '#93c5fd' },
  { class: 'blue-400', hex: '#60a5fa' },
  { class: 'blue-500', hex: '#3b82f6' },
  { class: 'blue-600', hex: '#2563eb' },
  { class: 'blue-700', hex: '#1d4ed8' },
  { class: 'blue-800', hex: '#1e40af' },
  { class: 'blue-900', hex: '#1e3a8a' },

  { class: 'indigo-50', hex: '#eef2ff' },
  { class: 'indigo-100', hex: '#e0e7ff' },
  { class: 'indigo-200', hex: '#c7d2fe' },
  { class: 'indigo-300', hex: '#a5b4fc' },
  { class: 'indigo-400', hex: '#818cf8' },
  { class: 'indigo-500', hex: '#6366f1' },
  { class: 'indigo-600', hex: '#4f46e5' },
  { class: 'indigo-700', hex: '#4338ca' },
  { class: 'indigo-800', hex: '#3730a3' },
  { class: 'indigo-900', hex: '#312e81' },

  { class: 'violet-50', hex: '#f5f3ff' },
  { class: 'violet-100', hex: '#ede9fe' },
  { class: 'violet-200', hex: '#ddd6fe' },
  { class: 'violet-300', hex: '#c4b5fd' },
  { class: 'violet-400', hex: '#a78bfa' },
  { class: 'violet-500', hex: '#8b5cf6' },
  { class: 'violet-600', hex: '#7c3aed' },
  { class: 'violet-700', hex: '#6d28d9' },
  { class: 'violet-800', hex: '#5b21b6' },
  { class: 'violet-900', hex: '#4c1d95' },

  { class: 'purple-50', hex: '#faf5ff' },
  { class: 'purple-100', hex: '#f3e8ff' },
  { class: 'purple-200', hex: '#e9d5ff' },
  { class: 'purple-300', hex: '#d8b4fe' },
  { class: 'purple-400', hex: '#c084fc' },
  { class: 'purple-500', hex: '#a855f7' },
  { class: 'purple-600', hex: '#9333ea' },
  { class: 'purple-700', hex: '#7e22ce' },
  { class: 'purple-800', hex: '#6b21a8' },
  { class: 'purple-900', hex: '#581c87' },

  { class: 'fuchsia-50', hex: '#fdf4ff' },
  { class: 'fuchsia-100', hex: '#fae8ff' },
  { class: 'fuchsia-200', hex: '#f5d0fe' },
  { class: 'fuchsia-300', hex: '#f0abfc' },
  { class: 'fuchsia-400', hex: '#e879f9' },
  { class: 'fuchsia-500', hex: '#d946ef' },
  { class: 'fuchsia-600', hex: '#c026d3' },
  { class: 'fuchsia-700', hex: '#a21caf' },
  { class: 'fuchsia-800', hex: '#86198f' },
  { class: 'fuchsia-900', hex: '#701a75' },

  { class: 'pink-50', hex: '#fdf2f8' },
  { class: 'pink-100', hex: '#fce7f3' },
  { class: 'pink-200', hex: '#fbcfe8' },
  { class: 'pink-300', hex: '#f9a8d4' },
  { class: 'pink-400', hex: '#f472b6' },
  { class: 'pink-500', hex: '#ec4899' },
  { class: 'pink-600', hex: '#db2777' },
  { class: 'pink-700', hex: '#be185d' },
  { class: 'pink-800', hex: '#9d174d' },
  { class: 'pink-900', hex: '#831843' },

  { class: 'rose-50', hex: '#fff1f2' },
  { class: 'rose-100', hex: '#ffe4e6' },
  { class: 'rose-200', hex: '#fecdd3' },
  { class: 'rose-300', hex: '#fda4af' },
  { class: 'rose-400', hex: '#fb7185' },
  { class: 'rose-500', hex: '#f43f5e' },
  { class: 'rose-600', hex: '#e11d48' },
  { class: 'rose-700', hex: '#be123c' },
  { class: 'rose-800', hex: '#9f1239' },
  { class: 'rose-900', hex: '#881337' },
]

const ColorHelper = ({ setTextColor }: Props): JSX.Element => {
  const [value, setValue] = useState('#f472b6')
  const [closestColor, setClosestColor] = useState<color>({
    class: 'pink-400',
    hex: '#f472b6',
  })

  const reset = () => {
    const input = document.getElementById('hex-value') as HTMLInputElement
    setValue('#f472b6')
    input.value = '#f472b6'
    setClosestColor(colors[3])
  }

  // Converts hex to array of rgb
  const hexToRgb = (hex: string): number[] => {
    return hex
      .slice(1)
      .replace(/^(.)(.)(.)$/gi, '$1$1$2$2$3$3')
      .match(/.{2}/g)
      ?.map((value) => parseInt(value, 16))
  }

  // Distance between 2 colors (in RGB)
  // https://stackoverflow.com/questions/23990802/find-nearest-color-from-a-colors-list
  const distance = (a: number[], b: number[]): number => {
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2)
    )
  }

  const nearestColor = (colorHex: string): any | color => {
    return colors.reduce(
      (a, b) =>
        (a =
          distance(hexToRgb(colorHex), hexToRgb(b.hex)) < a[0]
            ? [distance(hexToRgb(colorHex), hexToRgb(b.hex)), b]
            : a),
      [Number.POSITIVE_INFINITY, colors[0]]
    )[1]
  }

  useEffect(() => {
    setTextColor(closestColor.class)
  }, [closestColor, setTextColor])

  return (
    <WidgetWrapper>
      <button
        className='absolute text-sm transition-all top-2 right-3 text-slate-400 dark:hover:text-pink-400 hover:text-pink-700'
        onClick={reset}>
        Reset
      </button>
      <WidgetConverter helperName='Color Helper'>
        <div className='flex flex-col gap-2'>
          <div className='relative overflow-hidden h-14 w-44 rounded-xl'>
            <input
              type='color'
              name='color'
              className='absolute w-48 h-20 -m-4 bg-pink-400 cursor-pointer top-2 left-2'
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const input = document.getElementById(
                  'hex-value'
                ) as HTMLInputElement
                input.value = e.target.value
                if (e.target.value.length === 7 && e.target.value[0] === '#') {
                  setValue(e.target.value)
                  setClosestColor(nearestColor(value))
                }
              }}
            />
          </div>
          <input
            type='text'
            defaultValue={value}
            id='hex-value'
            placeholder='#000000'
            maxLength={7}
            className='p-1 text-center w-44 bg-slate-100 dark:bg-slate-700 rounded-xl'
            onChange={(e) => {
              if (e.target.value.length === 7 && e.target.value[0] === '#') {
                setValue(e.target.value)
                setClosestColor(nearestColor(e.target.value))
              }
            }}
          />
        </div>
      </WidgetConverter>
      <WidgetResult>
        <CopyToClipboard valueToCopy={closestColor.class}>
          <span className='font-semibold'>{`" ${closestColor.class} "`}</span>
        </CopyToClipboard>
        <CopyToClipboard valueToCopy={closestColor.hex}>
          <span>{`${closestColor.hex}`}</span>
        </CopyToClipboard>
      </WidgetResult>
    </WidgetWrapper>
  )
}

export default ColorHelper
