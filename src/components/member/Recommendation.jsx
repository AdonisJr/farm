import React from 'react'

export default function Recommendation() {
  return (
    <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
      <div className='py-5'>
        <p className='text-xl font-bold'>Requirements:</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-semibold'>APPLICATION LETTER <span className='font-normal'>(Please be advised that the application letter must be physically submitted at the office to facilitate seamless integration.)</span></p>
        <p className='font-semibold'>GRADES <span className='font-normal'>(
          When applying for the scholarship, please note that official transcripts or grade reports must be submitted as part of the application process to assess academic eligibility.) </span>
        </p>
        <p className='font-semibold'>FAMILY TREE <span className='font-normal'>
          The compilation and verification of family tree details in the system will be conducted by our staff to ensure an accurate and thorough representation of our familial connections across generations.
        </span>
        </p>
      </div>
      <div className='flex justify-center p-5'>
        <button className='bg-emerald-500 p-2 w-3/6 text-white font-bold rounded-md hover:bg-emerald-600 duration-200'>Request</button>
      </div>
    </div>
  )
}
