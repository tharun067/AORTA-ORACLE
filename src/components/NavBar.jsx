import React from 'react'
import { motion } from 'framer-motion';
import { Heart, Moon, Sun } from 'lucide-react';

function NavBar({ onNavigate, currentPage, isDarkMode, onToggleDarkMode }) {
  
  return (
    <motion.header
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className='container mx-auto px-4 py-4 flex justify-between items-center '>
        <div className='flex items-center space-x-2 cursor-pointer' onClick={() => onNavigate('home')}>
          <Heart className='h-8 w-8 text-red-500' />
          <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>
            AORTA ORACLE
          </h1>
        </div>
        <nav className='flex items-center'>
          <ul className='flex space-x-6 mr-6'>
            <li>
              <button
                onClick={() => onNavigate('home')}
                className={`px-2 py-1 font-medium transition-colors duration-200 ${currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600':isDarkMode?'text-gray-300 hover:text-blue-400':'text-gray-600 hover:text-blue-500'}`}>Home</button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('form')}
                className={`px-2 py-1 font-medium transition-colors duration-200 ${currentPage === 'form' ? 'text-blue-600 border-b-2 border-blue-600':isDarkMode?'text-gray-300 hover:text-blue-400':'text-gray-600 hover:text-blue-500'}`}>Prediction</button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('help')}
                className={`px-2 py-1 font-medium transition-colors duration-200 ${currentPage === 'help' ? 'text-blue-600 border-b-2 border-blue-600':isDarkMode?'text-gray-300 hover:text-blue-400':'text-gray-600 hover:text-blue-500'}`}>Help</button>
            </li>
            {currentPage === 'results' && (
              <li>
                <button
                className='px-2 py-1 font-medium text-blue-600 border-b-2 border-blue-600'>Results</button>
              </li>
            )}
          </ul>
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors duration-200`}
          >
            {isDarkMode ? (
              <Sun className='h-5 w-5 text-yellow-500'/>
            ) : (
                <Moon className='h-5 w-5 text-gray-600'/>
            )}
          </button>
        </nav>
      </div>
    </motion.header>
  )
}

export default NavBar
