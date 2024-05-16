import React from 'react'

export default function DisplayImage({ selectedImage, setShowImage }) {
    return (
        <>
            <div className='absolute w-full h-full flex justify-center items-center top-0 left-0 z-50'>
                <p className='text-3xl absolute top-5 right-10 cursor-pointer text-white hover:text-slate-200 duration-200' onClick={(e) => setShowImage(false)}>x</p>
                <div className='h-5/6 max-w-5xl bg-white'>
                    <img src={`data:image/jpeg;base64,${selectedImage}`} className='w-full h-full' />
                </div>
            </div>
            <div className='absolute w-full h-full top-0 left-0 bg-teal-600 opacity-1 z-40'>

            </div>
        </>
    )
}
