import React from 'react'

const Feature = ({name, desc, img, alignment}) => {
  return (
    <div className={`flex flex-col items-center justify-center md:gap-20 gap-5 ${alignment=='left'?"md:flex-row":"md:flex-row-reverse"}`}>
        <img src={img} alt="" className='w-64 h-64 rounded-lg'/>
        <div className='flex flex-col gap-5'>
            <h3 className='h3-header-text text-center md:text-start'>{name}</h3>
            <p className="text-orange-50 text-sm font-thin max-w-sm text-center md:text-start">{desc}</p>
        </div>
    </div>
  )
}

export default Feature