import { Heart, Info, Shield } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <Heart className='h-6 w-6 text-red-400' />
              <h3 className='text-xl font-bold'>AORTA ORACLE</h3>
            </div>
            <p className='text-gray-300'> An advanced heart disease prediction tool designed to help identify potential risk factors and encourage preventative healthcare.</p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4 flex items-center'>
              <Info className='h-5 w-5 mr-2' />
              Disclaimer
            </h4>
            <p className='text-gray-300 text-sm'>
              This tool is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4 flex items-center'>
              <Shield className='h-5 w-5 mr-2' />
              Privacy
            </h4>
            <p className='text-gray-300 text-sm'>
              We take your privacy seriously. All data entered into this application remains confidential and is not stored on our servers beyond the current session.
            </p>
          </div>
        </div>
        <div className='border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm'>
          <p>&copy;{new Date().getFullYear() } AORTA ORACLE. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
