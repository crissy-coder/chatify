import { Loader } from 'lucide-react'
import React from 'react'

function pageLoader() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <Loader className="animate-spin" size={48} />
    </div>
  )
}

export default pageLoader
