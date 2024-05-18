import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center item-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Learn More about React
            </h2>
            <p className='text-gray-500 my-2'>
                Check Out these resources with 100 React Projects
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded bl-none'>
              <a href="https://my-portfolio-vu-two-52.vercel.app/" target='_blank' rel='noopener noreferrer'>
                Learn
              </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
        <img src="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png" />
        </div>
    </div>
  )
}
