import { Info } from 'lucide-react';
import React from 'react'

function FormField({ field, value, onChange }) {
  const handleChange = (e) => {
    const newValue = e.target.type === 'number'
      ? parseFloat(e.target.value)
      : parseInt(e.target.value, 10);
    onChange(field.id, newValue);
  };
  return (
    <div className='mb-6'>
      <div className='flex items-center mb-2'>
        <label htmlFor={field.id} className='block text-sm font-medium text-gray-700'>
          {field.label}{field.required && <span className='text-red-500'>*</span>}
        </label>
        <div className='relative ml-2 group'>
          <Info className='h-4 w-4 text-gray-400 cursor-help' />
          <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10'>
            {field.description}
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800'/>
          </div>
        </div>
      </div>
      {field.type === 'number' ? (
        <div className='relative'>
          <input
            type='number'
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            min={field.min}
            max={field.max}
            step={field.step || 1}
            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border'
            required={field.required}
          />
          {field.min !== undefined && field !== undefined && (
            <div className='mt-1 text-xs text-gray-500 flex justify-between'>
              <span>Min: {field.min}</span>
              <span>Max: {field.max}</span>
            </div>
          )}
        </div>
      ) : (
          <select
            id={field.id}
            value={value}
            onChange={handleChange}
            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border'
            required={field.required}
          >
            <option value="" disabled>Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      )}
    </div>
  )
}

export default FormField
